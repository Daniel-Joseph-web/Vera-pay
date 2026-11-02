import base64
import os
import shutil
from PIL import Image

src_png = r'C:/Users/USER/.gemini/antigravity/brain/4fd70ff2-1c17-47ab-aabc-5ecb6c2926e0/.user_uploaded/media_1793561378578_f618a9e7.png'
public_dir = r"c:\Users\USER\Downloads\vera-pay\frontend\public"
app_dir = r"c:\Users\USER\Downloads\vera-pay\frontend\src\app"

def main():
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)

    # Copy PNG assets
    shutil.copyfile(src_png, os.path.join(public_dir, 'logo.png'))
    shutil.copyfile(src_png, os.path.join(public_dir, 'logo-icon.png'))
    shutil.copyfile(src_png, os.path.join(public_dir, 'logo-original.png'))
    shutil.copyfile(src_png, os.path.join(public_dir, 'icon.png'))
    shutil.copyfile(src_png, os.path.join(public_dir, 'favicon.png'))
    shutil.copyfile(src_png, os.path.join(app_dir, 'icon.png'))
    shutil.copyfile(src_png, os.path.join(app_dir, 'apple-icon.png'))

    # Generate favicon.ico
    im = Image.open(src_png)
    im.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

    # Embed PNG in SVGs
    with open(src_png, 'rb') as f:
        b64_data = base64.b64encode(f.read()).decode('utf-8')
    data_uri = f'data:image/png;base64,{b64_data}'

    with open(os.path.join(public_dir, 'logo-icon.svg'), 'w', encoding='utf-8') as f:
        f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 95" width="99" height="95" fill="none">
  <image href="{data_uri}" width="99" height="95" />
</svg>''')

    with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 95" width="99" height="95" fill="none">
  <image href="{data_uri}" width="99" height="95" />
</svg>''')

    with open(os.path.join(public_dir, 'test_logo.svg'), 'w', encoding='utf-8') as f:
        f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 95" width="99" height="95" fill="none">
  <image href="{data_uri}" width="99" height="95" />
</svg>''')

    horizontal_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <image href="{data_uri}" x="0" y="8" width="64" height="64" />
  <text x="75" y="46" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#084E38" letter-spacing="-0.8">Verapay</text>
  <text x="76" y="64" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#4B5563" letter-spacing="-0.2">Verify, then release.</text>
</svg>'''

    with open(os.path.join(public_dir, 'logo-horizontal.svg'), 'w', encoding='utf-8') as f:
        f.write(horizontal_svg)

    with open(os.path.join(public_dir, 'logo.svg'), 'w', encoding='utf-8') as f:
        f.write(horizontal_svg)

    stacked_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <image href="{data_uri}" x="48" y="10" width="64" height="64" />
  <text x="80" y="118" text-anchor="middle" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#084E38" letter-spacing="-0.6">Verapay</text>
  <text x="80" y="136" text-anchor="middle" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#4B5563" letter-spacing="-0.2">Verify, then release.</text>
</svg>'''

    with open(os.path.join(public_dir, 'logo-stacked.svg'), 'w', encoding='utf-8') as f:
        f.write(stacked_svg)

    print('Logo assets updated successfully in frontend/public/')

if __name__ == '__main__':
    main()
