import os
import shutil
import glob

base_dir = r"C:\Users\Alex\Desktop\kontrolo.webflow (2)"
astro_tmp = os.path.join(base_dir, "tmp_astro")

# 1. Move Astro core files to base dir
core_files = ['package.json', 'astro.config.mjs', 'tsconfig.json']
for f in core_files:
    src = os.path.join(astro_tmp, f)
    dst = os.path.join(base_dir, f)
    if os.path.exists(src):
        if os.path.exists(dst): os.remove(dst)
        shutil.move(src, dst)

# 2. Move src, public, node_modules
dirs_to_move = ['src', 'public', 'node_modules']
for d in dirs_to_move:
    src = os.path.join(astro_tmp, d)
    dst = os.path.join(base_dir, d)
    if os.path.exists(src):
        if not os.path.exists(dst):
            shutil.move(src, dst)
        else:
            # Merge contents if dst exists
            for item in os.listdir(src):
                s = os.path.join(src, item)
                d_item = os.path.join(dst, item)
                if not os.path.exists(d_item):
                    shutil.move(s, d_item)

# 3. Move Webflow assets to public folder
webflow_assets = ['css', 'images', 'js']
public_dir = os.path.join(base_dir, 'public')
if not os.path.exists(public_dir):
    os.makedirs(public_dir)

for asset in webflow_assets:
    src = os.path.join(base_dir, asset)
    dst = os.path.join(public_dir, asset)
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.move(src, dst)

print("Astro scaffold moved and Webflow assets integrated into public/")
