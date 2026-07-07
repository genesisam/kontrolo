import os
import glob
import re

astro_files = glob.glob("src/pages/**/*.astro", recursive=True) + glob.glob("src/components/**/*.astro", recursive=True)

for file in astro_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace href="index.html" with href="/"
    content = re.sub(r'href=(["\'])index\.html\1', r'href="/"', content)
    
    # Replace href="something.html" with href="/something"
    # We only match internal relative links that don't start with http or // 
    # and end with .html
    def replacer(match):
        quote = match.group(1)
        path = match.group(2)
        return f'href={quote}/{path}{quote}'
        
    content = re.sub(r'href=(["\'])(?!http|//|#|mailto:|tel:)(.*?)\.html\1', replacer, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Fixed internal links in {len(astro_files)} files.")
