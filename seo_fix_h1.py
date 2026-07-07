import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Clean H1
h1_pattern = re.compile(r'<h1 data-w-id="7b9ca2eb-19eb-e8fd-0921-b0d015453c51" style="opacity:0"><em>Centraliza tu negocio en la nube<sub> </sub>con nuestra suite</em> <span class="title-span"><em>PMS, ERP y POS</em></span></h1>')
clean_h1 = '<h1 data-w-id="7b9ca2eb-19eb-e8fd-0921-b0d015453c51" style="opacity:0; font-style: italic;">Centraliza tu negocio en la nube con nuestra suite <span class="title-span">PMS, ERP y POS</span></h1>'
html = h1_pattern.sub(clean_h1, html)

# 2. Clean Hero P
p_pattern = re.compile(r'<p data-w-id="487e5dbf-b87f-517c-bafd-b95ecc88f056" style="opacity:0" class="hero-paragraph"><em>Una plataforma que integra reservas, ventas, inventarios y contabilidad\. Diseñada para hoteles, restaurantes y comercios que buscan crecer en línea en Colombia</em></p>')
clean_p = '<p data-w-id="487e5dbf-b87f-517c-bafd-b95ecc88f056" style="opacity:0; font-style: italic;" class="hero-paragraph">Una plataforma que integra reservas, ventas, inventarios y contabilidad. Diseñada para hoteles, restaurantes y comercios que buscan crecer en línea en Colombia</p>'
html = p_pattern.sub(clean_p, html)

# Write changes
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
