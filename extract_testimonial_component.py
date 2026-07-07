import os
import re
from bs4 import BeautifulSoup

def process_file(file_path, is_index=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    caption_div = soup.find('div', class_='caption', string=lambda s: s and 'testimonios' in s.lower())
    
    if not caption_div:
        return None, None
        
    testimonial_section = caption_div.find_parent('section')
    if not testimonial_section:
        return None, None
        
    extracted_html = str(testimonial_section)
    
    # We do it on string level to avoid BS4 reformatting the whole file
    content = content.replace(extracted_html, '<Testimonial />')
    
    if 'import Testimonial' not in content:
        content = content.replace('---\n', "---\nimport Testimonial from '../components/Testimonial.astro';\n", 1)
        
    script_content = ""
    if is_index:
        script_match = re.search(r'<script is:inline>\s*setTimeout\(function\(\) \{\s*function getSwiperOffset.*?</script>', content, flags=re.DOTALL)
        if script_match:
            script_content = script_match.group(0)
            content = content.replace(script_content, '')
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return extracted_html, script_content

html, script = process_file('src/pages/index.astro', is_index=True)

if html:
    with open('src/components/Testimonial.astro', 'w', encoding='utf-8') as f:
        f.write(html + "\n\n" + (script if script else ""))
    print("Created src/components/Testimonial.astro")

pages = [
    'src/pages/software-erp.astro',
    'src/pages/software-pms-para-hoteles.astro',
    'src/pages/software-pos.astro'
]

for p in pages:
    process_file(p, is_index=False)
    print(f"Updated {p}")
