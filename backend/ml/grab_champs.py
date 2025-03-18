import os
import requests
from PIL import Image, ImageDraw

CHAMPIONS_DIR = './dataset/champions'
BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/'

def get_latest_version():
    response = requests.get('https://ddragon.leagueoflegends.com/api/versions.json')
    if response.status_code == 200:
        versions = response.json()
        return versions[0]
    else:
        print('Failed to retrieve versions')
        return None

def get_champion_list(version):
    response = requests.get(f'{BASE_URL}{version}/data/en_US/champion.json')
    if response.status_code == 200:
        data = response.json()
        return data['data'].keys()
    else:
        print('Failed to retrieve champion list')
        return []

def download_icon(champion_name, version):
    icon_url = f"{BASE_URL}{version}/img/champion/{champion_name}.png"
    response = requests.get(icon_url)
    if response.status_code == 200:
        icon_path = os.path.join(CHAMPIONS_DIR, f"{champion_name}.png")
        with open(icon_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded icon for {champion_name} from {icon_url}")

        # Make the icon circular immediately after downloading
        make_icon_circular(icon_path)
    else:
        print(f"Failed to download icon for {champion_name}")

def make_icon_circular(icon_path):
    with Image.open(icon_path).convert("RGBA") as im:
        size = im.size
        mask = Image.new('L', size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size[0], size[1]), fill=255)
        im.putalpha(mask)
        im.save(icon_path, format="PNG")
        print(f"Processed circular icon saved at {icon_path}")

def update_champion_icons():
    if not os.path.exists(CHAMPIONS_DIR):
        os.makedirs(CHAMPIONS_DIR)

    version = get_latest_version()
    if not version:
        print('Failed to get latest version.')
        return

    champions = get_champion_list(version)
    for champion in champions:
        icon_path = os.path.join(CHAMPIONS_DIR, f"{champion}.png")
        if not os.path.exists(icon_path):
            download_icon(champion, version)
        else:
            print(f"Icon for {champion} already exists. Skipping download.")

if __name__ == "__main__":
    update_champion_icons()
