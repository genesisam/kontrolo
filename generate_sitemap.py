import glob
from datetime import datetime
import os

base_url = "https://www.kontrolo.co"

html_files = glob.glob("*.html")

# Exclude utility/system pages
exclude = ['401.html', '404.html', 'access-denied.html', 'log-in.html', 'sign-up.html', 'reset-password.html', 'update-password.html', 'user-account.html', 'checkout.html', 'order-confirmation.html', 'paypal-checkout.html']

# Webflow template pages (detail_*.html) should be excluded unless they are populated. 
# Usually, dynamic pages need a CMS-aware sitemap, but for static exports, we just index the static ones.
templates = [f for f in html_files if f.startswith("detail_")]
exclude.extend(templates)

sitemap_urls = []

for file in html_files:
    if file in exclude:
        continue
    
    # URL construction
    url_path = "" if file == "index.html" else f"/{file}"
    loc = f"{base_url}{url_path}"
    
    # Last modified
    mtime = os.path.getmtime(file)
    lastmod = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
    
    # Priority & Changefreq
    if file == "index.html":
        priority = "1.0"
        changefreq = "weekly"
    elif "software-" in file:
        priority = "0.9"
        changefreq = "monthly"
    elif file in ["contacto.html", "blog.html"]:
        priority = "0.8"
        changefreq = "weekly"
    else:
        priority = "0.6"
        changefreq = "monthly"

    sitemap_urls.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_urls)}
</urlset>"""

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print(f"Generated sitemap.xml with {len(sitemap_urls)} URLs.")
