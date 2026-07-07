import os
import glob
import re

count = 0
pattern = r'<div class="title-wrap">\s*<p class="title-paragraph"><em>¿Aún tienes preguntas\?</em>.*?</p>\s*<a .*?>Agendar Demo</a>\s*</div>'

for file in glob.glob("src/pages/*.astro"):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content, num_subs = re.subn(pattern, '', content, flags=re.DOTALL)
    
    if num_subs > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed FAQ CTA from {file}")
        count += 1

print(f"Total files updated: {count}")
