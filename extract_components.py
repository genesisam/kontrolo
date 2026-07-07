import os
from bs4 import BeautifulSoup

# Create components directory
os.makedirs('src/components', exist_ok=True)
os.makedirs('src/pages', exist_ok=True)

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

header_el = soup.find('div', class_='header')
footer_el = soup.find('section', class_='footer')

if header_el:
    with open('src/components/Header.astro', 'w', encoding='utf-8') as f:
        f.write(str(header_el))

if footer_el:
    with open('src/components/Footer.astro', 'w', encoding='utf-8') as f:
        f.write(str(footer_el))

# Now replace in soup
if header_el:
    header_el.replace_with(BeautifulSoup('<Header />', 'html.parser'))
if footer_el:
    footer_el.replace_with(BeautifulSoup('<Footer />', 'html.parser'))

# Prepend Astro imports
astro_frontmatter = """---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
"""

final_html = astro_frontmatter + str(soup)

# Webflow adds custom scripts and css links to head, we don't want to break them.
# The soup.prettify() might alter formatting, so we just use str(soup)

with open('src/pages/index.astro', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Extracted Header and Footer. Created src/pages/index.astro")
