import os
import glob
import re
from bs4 import BeautifulSoup

html_files = glob.glob("*.html")
html_files.remove("index.html")

astro_frontmatter = """---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
"""

count = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Use BS4 to parse and extract/replace header and footer safely
    soup = BeautifulSoup(html_content, 'html.parser')
    
    header_el = soup.find('div', class_='header')
    footer_el = soup.find('section', class_='footer')
    
    if header_el:
        header_el.replace_with(BeautifulSoup('<Header />', 'html.parser'))
    if footer_el:
        footer_el.replace_with(BeautifulSoup('<Footer />', 'html.parser'))
        
    # Fix the tags (BS4 lowercase issue)
    final_html = str(soup)
    final_html = final_html.replace('<header></header>', '<Header />')
    final_html = final_html.replace('<footer></footer>', '<Footer />')
    
    # Add is:inline to all script tags (except those that already have it)
    final_html = re.sub(r'<script(?![^>]*is:inline)', r'<script is:inline', final_html)
    
    # Apply noindex to templates if applicable
    if file.startswith('detail_'):
        # Add noindex to <head>
        noindex_tag = '<meta name="robots" content="noindex">\n'
        final_html = final_html.replace('</head>', noindex_tag + '</head>')
    
    final_astro_content = astro_frontmatter + final_html
    
    astro_filename = file.replace('.html', '.astro')
    astro_path = os.path.join('src', 'pages', astro_filename)
    
    with open(astro_path, 'w', encoding='utf-8') as f:
        f.write(final_astro_content)
    
    count += 1

print(f"Successfully converted {count} HTML files to Astro pages.")
