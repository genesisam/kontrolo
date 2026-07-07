import re

with open("contacto.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Canonical
canonical_str = """
  <link rel="canonical" href="https://www.kontrolo.co/contacto.html" />
</head>"""
html = html.replace("</head>", canonical_str)

# 2. Update Logo Alt tag
logo_pattern = re.compile(r'<img src="images/Logo-7.svg" loading="lazy" width="160" alt="">')
html = logo_pattern.sub('<img src="images/Logo-7.svg" loading="lazy" width="160" alt="Logo de Kontrolo - Software PMS y ERP">', html)

# 3. Add Trust Signals to form
form_btn_pattern = re.compile(r'<div id="w-node-c85d2910-a721-5c08-7288-1444b4212576-465d1019" class="contact-btn">\s*<input type="submit" data-wait="Please wait\.\.\." class="primary-button w-button" value="Enviar mensaje">\s*</div>')

new_btn_html = """<div id="w-node-c85d2910-a721-5c08-7288-1444b4212576-465d1019" class="contact-btn" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
  <input type="submit" data-wait="Procesando..." class="primary-button w-button" value="Solicitar Demo Gratuita">
  <p style="font-size: 12px; color: #666; margin: 0; text-align: center; line-height: 1.4;">
    🔒 Tus datos están seguros.<br>No se requiere tarjeta de crédito.
  </p>
</div>"""

html = form_btn_pattern.sub(new_btn_html, html)

# Write changes
with open("contacto.html", "w", encoding="utf-8") as f:
    f.write(html)
