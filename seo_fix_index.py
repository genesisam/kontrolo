import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Canonical and Schema
schema_str = """
  <link rel="canonical" href="https://www.kontrolo.co/" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kontrolo",
    "operatingSystem": "Cloud-based",
    "applicationCategory": "BusinessApplication",
    "description": "Suite en la nube de PMS, ERP y POS para hoteles y restaurantes en Colombia.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "COP"
    }
  }
  </script>
</head>"""
html = html.replace("</head>", schema_str)

# 2. Update Logo Alt tag
logo_pattern = re.compile(r'<img src="images/Logo-7.svg" loading="lazy" width="160" alt="">')
html = logo_pattern.sub('<img src="images/Logo-7.svg" loading="lazy" width="160" alt="Logo de Kontrolo - Software PMS y ERP">', html)

# 3. Update Hero Image fetchpriority and alt tag
hero_pattern = re.compile(r'<img src="images/BEETERS-1.jpg" loading="eager"([^>]*)alt=""')
html = hero_pattern.sub(r'<img src="images/BEETERS-1.jpg" loading="eager" fetchpriority="high"\1alt="Suite Kontrolo PMS ERP POS en la nube"', html)

# Write changes
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
