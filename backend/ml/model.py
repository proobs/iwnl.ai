"""
image detection model, utilizing resnet50 which is a CNN model pretrained on 1m+ images
we utilize our synthetically created dataset to train this model as a x,y coordinate regression model
"""
import torch
import torch.nn as nn
from torchvision import models

class MinimapCoordModel(nn.Module):
    def __init__(self, num_champions: int, num_structures: int, pretrained_backbone: bool = True):
        """
        Initialize the model.
        Args:
            num_champions (int): Number of champion coordinates to predict (e.g. 10 for 5 per team).
            num_structures (int): Number of structure coordinates to predict (e.g. all turrets, inhibitors, nexus).
            pretrained_backbone (bool): Whether to use ImageNet-pretrained weights for ResNet-50.
        """
        super(MinimapCoordModel, self).__init__()
        self.num_champions = num_champions
        self.num_structures = num_structures
        total_outputs = 2 * (num_champions + num_structures)  # Each object has an (x, y) pair

        # Load ResNet-50 as backbone, aka the thing that extracts the images and turns into strucuted data
        self.backbone = models.resnet50(weights=pretrained_backbone)
        # Replace the final fully connected layer with a new Linear layer for our coordinates output
        # (ResNet-50's final layer outputs 2048 features)
        in_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Linear(in_features, total_outputs)
        # All other layers remain the same
        # we replace the final one in order to output coordinates

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass: input a minimap image tensor, output the predicted coordinates.
        Args:
            x (torch.Tensor): Batch of minimap images, shape (B, 3, H, W), normalized appropriately.
        Returns:
            torch.Tensor: Predicted coordinates, shape (B, 2*(num_champions+num_structures)).
        """
        return self.backbone(x)
