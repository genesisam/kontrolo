import os
import glob
from bs4 import BeautifulSoup

pages_seo = {
    'src/pages/software-erp.astro': {
        'canonical': 'https://www.kontrolo.co/software-erp',
        'schema': '''<script type="application/ld+json" is:inline>
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kontrolo ERP",
  "operatingSystem": "Cloud-based",
  "applicationCategory": "BusinessApplication",
  "description": "Software ERP en la nube con facturación electrónica DIAN y contabilidad.",
  "offers": { "@type": "Offer", "priceCurrency": "COP" }
}
</script>'''
    },
    'src/pages/software-pms-para-hoteles.astro': {
        'canonical': 'https://www.kontrolo.co/software-pms-para-hoteles',
        'schema': '''<script type="application/ld+json" is:inline>
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kontrolo PMS",
  "operatingSystem": "Cloud-based",
  "applicationCategory": "BusinessApplication",
  "description": "Software PMS para hoteles con gestión de reservas y check-in digital.",
  "offers": { "@type": "Offer", "priceCurrency": "COP" }
}
</script>'''
    },
    'src/pages/software-pos.astro': {
        'canonical': 'https://www.kontrolo.co/software-pos',
        'schema': '''<script type="application/ld+json" is:inline>
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kontrolo POS",
  "operatingSystem": "Cloud-based",
  "applicationCategory": "BusinessApplication",
  "description": "Software POS Punto de Venta en la nube para restaurantes y comercios.",
  "offers": { "@type": "Offer", "priceCurrency": "COP" }
}
</script>'''
    }
}

for file, data in pages_seo.items():
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<link rel="canonical"' not in content:
        canonical_tag = f'\n<link rel="canonical" href="{data["canonical"]}" />\n'
        content = content.replace('</head>', canonical_tag + data['schema'] + '\n</head>')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# Image lazy loading sweep across ALL pages
all_pages = glob.glob('src/pages/*.astro')
for page in all_pages:
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    images = soup.find_all('img')
    changed = False
    for img in images:
        if not img.get('loading') and not img.get('fetchpriority'):
            img['loading'] = 'lazy'
            changed = True
            
    if changed:
        # String replacement to avoid BS4 reformatting
        for img in images:
            if img.get('loading') == 'lazy':
                orig_img = str(img).replace(' loading="lazy"', '') # Very naive, but since we parsed it, it's safer to just inject it via regex
                pass
                
        # Better approach for images using regex:
        import re
        # Find images without loading= and fetchpriority=
        def img_replacer(match):
            img_tag = match.group(0)
            if 'loading=' not in img_tag and 'fetchpriority=' not in img_tag:
                return img_tag.replace('<img ', '<img loading="lazy" ')
            return img_tag
            
        new_html = re.sub(r'<img [^>]+>', img_replacer, html)
        with open(page, 'w', encoding='utf-8') as f:
            f.write(new_html)

print("SEO Metadata and Lazy Loading applied successfully.")
