"""
training.py:
This script demonstrates training a model to predict the positions of champions and structures on a League of Legends minimap.
The dataset is synthetic, with random placements of champions and structures on the minimap.
Our goal is to train a CNN to recognize the positions of champions and structures on the minimap. 
We want the model to return data in the form of (x, y) coordinates for each object recognized.

Instead of tirelessly recording data and manually labelling, we synthetically generate object positions on the minimap.
We assumed this novel approach to predict the positions of champions and structures on the minimap by taking up Henry Zhu's method
We give him credit here: https://github.com/Maknee/LeagueMinimapDetectionCNN
"""
import os
import random
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image, ImageDraw, ImageOps
from model import MinimapCoordModel  # import the model class from model.py
from tqdm import tqdm  # for progress bar logging

# Hyperparameters and config
NUM_CHAMPIONS_PER_TEAM = 5
NUM_STRUCTURES_PER_TEAM = 13    # 3 turrets, 3 inhibitors, 1 nexus
IMAGE_SIZE = 256                # Size of the minimap image (256x256)
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 1e-3
NUM_WORKERS = 4         # Number of parallel data loading workers (for DataLoader)
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Set random seeds for reproducibility 
random.seed(42)
torch.manual_seed(42)

class LolMinimapDataset(Dataset):
    def __init__(self, num_samples: int = 10000, image_size: int = 256, 
                 num_champions_per_team: int = 5, num_structures_per_team: int = 13,
                 transform=None):
        """
        Args:
            num_samples (int): Number of synthetic samples to generate.
            image_size (int): Width/height of the square minimap image.
            num_champions_per_team (int): Number of champions per team (typically 5).
            num_structures_per_team (int): Number of structure points per team.
            transform: Optional torchvision transforms to apply to the image (for augmentation).
        """
        self.num_samples = num_samples
        self.image_size = image_size
        self.num_champions_per_team = num_champions_per_team
        self.num_structures_per_team = num_structures_per_team
        self.transform = transform

        # Predefine some colors for different object types to draw on the map (for visualization/identification).
        # Champions will be drawn as small circles in team colors; structures as squares/rectangles in other colors.
        self.ally_champion_color = (0, 255, 0)    # green for allied champions
        self.enemy_champion_color = (255, 0, 0)   # red for enemy champions
        self.turret_color = (255, 255, 0)         # yellow for turrets
        self.inhibitor_color = (255, 165, 0)      # orange for inhibitors
        self.nexus_color = (0, 0, 255)           # blue for nexus (distinct from champion colors)

    def __len__(self):
        return self.num_samples

    def __getitem__(self, idx):
        # Create a blank minimap background (solid color or simple pattern)
        img = Image.new('RGB', (self.image_size, self.image_size), color=(10, 50, 10))  # dark green-ish background

        draw = ImageDraw.Draw(img)

        # Initialize label list for coordinates
        coords = []

        # ---- Place allied champions (5) ----
        for i in range(self.num_champions_per_team):
            # Random position on the map
            x = random.randint(0, self.image_size - 1)
            y = random.randint(0, self.image_size - 1)
            # Draw a small circle for champion (radius ~4 px)
            r = 4
            draw.ellipse([x - r, y - r, x + r, y + r], fill=self.ally_champion_color)
            # Append normalized coordinates (x/image_size, y/image_size)
            coords.append(x / self.image_size)
            coords.append(y / self.image_size)

        # ---- Place enemy champions (5) ----
        for i in range(self.num_champions_per_team):
            x = random.randint(0, self.image_size - 1)
            y = random.randint(0, self.image_size - 1)
            # Draw enemy champion as a different colored circle
            r = 4
            draw.ellipse([x - r, y - r, x + r, y + r], fill=self.enemy_champion_color)
            coords.append(x / self.image_size)
            coords.append(y / self.image_size)

        # ---- Place structures for allied team (turrets, inhibitors, nexus) ----
        # We simulate num_structures_per_team possible structures for the ally team.
        # For each structure, randomly decide if it's still up. If yes, draw it; if not, we will record (0,0) as its coordinate.
        for j in range(self.num_structures_per_team):
            structure_alive = random.choice([True, False])
            if structure_alive:
                # Random position for the structure (in a real scenario, these might be fixed or in specific regions)
                x = random.randint(0, self.image_size - 1)
                y = random.randint(0, self.image_size - 1)
                # Draw structure: use a square or rectangle. We can differentiate structure types by color:
                # Let's say first few indices correspond to turrets, then inhibitors, then nexus.
                if j < 9:
                    # Turrets (use yellow squares)
                    size = 6  # turret icon size
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.turret_color)
                elif j < 12:
                    # Inhibitors (use orange larger square)
                    size = 8
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.inhibitor_color)
                else:
                    # Nexus (use blue rectangle)
                    size = 10
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.nexus_color)
                coords.append(x / self.image_size)
                coords.append(y / self.image_size)
            else:
                # Structure is destroyed/not present, append (0,0) or a sentinel value
                coords.append(0.0)
                coords.append(0.0)

        # ---- Place structures for enemy team (same number) ----
        for j in range(self.num_structures_per_team):
            structure_alive = random.choice([True, False])
            if structure_alive:
                x = random.randint(0, self.image_size - 1)
                y = random.randint(0, self.image_size - 1)
                # Draw enemy structures (we can reuse same colors or choose different shades if needed)
                if j < 9:
                    size = 6
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.turret_color)
                elif j < 12:
                    size = 8
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.inhibitor_color)
                else:
                    size = 10
                    draw.rectangle([x - size//2, y - size//2, x + size//2, y + size//2], fill=self.nexus_color)
                coords.append(x / self.image_size)
                coords.append(y / self.image_size)
            else:
                coords.append(0.0)
                coords.append(0.0)

        # Convert the list of coordinates to a tensor
        coords_tensor = torch.tensor(coords, dtype=torch.float)

        # --- Data Augmentation Transforms ---
        # We perform some random flips and color jitter on the image.
        # Note: If we do flips, we must adjust the coordinates accordingly.
        # We'll handle flips manually to ensure labels stay consistent.
        # Apply random horizontal flip
        if random.random() < 0.5:
            img = ImageOps.mirror(img)  # horizontal flip
            # Adjust x coordinates: new_x = 1 - old_x (since normalized 0 is left, 1 is right)
            for k in range(0, len(coords), 2):
                old_x = coords_tensor[k]
                coords_tensor[k] = 1.0 - old_x
        # Apply random vertical flip
        if random.random() < 0.5:
            img = ImageOps.flip(img)    # vertical flip
            # Adjust y coordinates: new_y = 1 - old_y
            for k in range(1, len(coords), 2):
                old_y = coords_tensor[k]
                coords_tensor[k] = 1.0 - old_y

        # Apply color jitter (random brightness, contrast) for robustness
        if self.transform:
            # If a torchvision transform pipeline is provided (which may include conversion to tensor),
            # use it. Ensure we don't double-convert to tensor.
            img_tensor = self.transform(img)
        else:
            # Default: just convert PIL image to tensor [0,1]
            img_tensor = transforms.ToTensor()(img)
        # (We skip normalization here because we will normalize in the transform or let model handle normalization if needed.)

        return img_tensor, coords_tensor

# Define torchvision transforms for data augmentation (optional)
transform_aug = transforms.Compose([
    transforms.ToTensor(),  # convert PIL image to tensor
    transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.1, hue=0.05),  # random color adjustments
    # Note: We applied flips manually to adjust labels, so we don't include RandomHorizontalFlip/RandomVerticalFlip here.
    # We could add Gaussian noise by a custom transform if desired.
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # normalize as ResNet expects (ImageNet stats)
])

# Create training dataset and dataloader
dataset = LolMinimapDataset(num_samples=10000, image_size=IMAGE_SIZE,
                             num_champions_per_team=NUM_CHAMPIONS_PER_TEAM,
                             num_structures_per_team=NUM_STRUCTURES_PER_TEAM,
                             transform=transform_aug)
train_loader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True, 
                          num_workers=NUM_WORKERS, pin_memory=True)

# -------------------- Model, Loss, Optimizer --------------------
total_champs = NUM_CHAMPIONS_PER_TEAM * 2
total_structs = NUM_STRUCTURES_PER_TEAM * 2
model = MinimapCoordModel(num_champions=total_champs, num_structures=total_structs, pretrained_backbone=True)
model = model.to(DEVICE)

criterion = torch.nn.MSELoss()  # Mean Squared Error loss for coordinate regression&#8203;:contentReference[oaicite:9]{index=9}&#8203;:contentReference[oaicite:10]{index=10}
optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)

# -------------------- Training Loop --------------------
if __name__ == '__main__':
    print(f"Starting training on {DEVICE} for {EPOCHS} epochs...")
    model.train()  # set model to training mode
    for epoch in range(1, EPOCHS + 1):
        epoch_loss = 0.0
        for images, labels in tqdm(train_loader, desc=f"Epoch {epoch}/{EPOCHS}"):
            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            preds = model(images)
            loss = criterion(preds, labels)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            epoch_loss += loss.item()

        avg_loss = epoch_loss / len(train_loader)
        print(f"Epoch {epoch} - Average Loss: {avg_loss:.4f}")

    os.makedirs("models", exist_ok=True)
    model_path = os.path.join("models", "champion_positions.pt")
    torch.save(model.state_dict(), model_path)
    print(f"Model saved to {model_path}")
