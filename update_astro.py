import json

with open("calendario_2026.json", "r", encoding="utf-8") as f:
    cal = json.load(f)
    
js_obj = json.dumps(cal, ensure_ascii=False, indent=6)

with open("src/pages/calendario-tributario.astro", "r", encoding="utf-8") as f:
    content = f.read()

target = """      const calendarioDIAN = {
        "00": { renta: "8 de Mayo, 2025", iva: "7 de Marzo, 2025", rete: "9 de Febrero, 2025" },
        "01": { renta: "9 de Mayo, 2025", iva: "8 de Marzo, 2025", rete: "10 de Febrero, 2025" },
        "02": { renta: "10 de Mayo, 2025", iva: "9 de Marzo, 2025", rete: "11 de Febrero, 2025" },
        "03": { renta: "11 de Mayo, 2025", iva: "10 de Marzo, 2025", rete: "12 de Febrero, 2025" }
        // Para que la página funcione al 100% ahora mismo, autocompletamos los demás del 04 al 99:
      };

      for (let i = 4; i <= 99; i++) {
        let nitKey = i.toString().padStart(2, '0');
        // Cálculo temporal usando patrón de distribución
        calendarioDIAN[nitKey] = {
          renta: `${8 + (i % 15)} de Mayo, 2025`,
          iva: `${7 + (i % 12)} de Marzo, 2025`,
          rete: `${9 + (i % 10)} de Febrero, 2025`
        };
      }"""

replacement = f"      const calendarioDIAN = {js_obj};"

content = content.replace(target, replacement)
content = content.replace("Calendario Tributario 2025", "Calendario Tributario 2026")
content = content.replace("2025", "2026") # some other hardcoded 2025 labels in the HTML

with open("src/pages/calendario-tributario.astro", "w", encoding="utf-8") as f:
    f.write(content)

print("Astro file updated")
