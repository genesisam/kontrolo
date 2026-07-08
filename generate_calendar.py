import json

# Renta Personas Naturales mapping
renta_ranges = [
    ("01-02", "12 de Agosto, 2026"), ("03-04", "13 de Agosto, 2026"), ("05-06", "14 de Agosto, 2026"),
    ("07-08", "18 de Agosto, 2026"), ("09-10", "19 de Agosto, 2026"), ("11-12", "20 de Agosto, 2026"),
    ("13-14", "21 de Agosto, 2026"), ("15-16", "24 de Agosto, 2026"), ("17-18", "25 de Agosto, 2026"),
    ("19-20", "26 de Agosto, 2026"), ("21-22", "27 de Agosto, 2026"), ("23-24", "28 de Agosto, 2026"),
    ("25-26", "31 de Agosto, 2026"), ("27-28", "1 de Septiembre, 2026"), ("29-30", "2 de Septiembre, 2026"),
    ("31-32", "3 de Septiembre, 2026"), ("33-34", "4 de Septiembre, 2026"), ("35-36", "7 de Septiembre, 2026"),
    ("37-38", "8 de Septiembre, 2026"), ("39-40", "9 de Septiembre, 2026"), ("41-42", "10 de Septiembre, 2026"),
    ("43-44", "11 de Septiembre, 2026"), ("45-46", "14 de Septiembre, 2026"), ("47-48", "15 de Septiembre, 2026"),
    ("49-50", "16 de Septiembre, 2026"), ("51-52", "17 de Septiembre, 2026"), ("53-54", "18 de Septiembre, 2026"),
    ("55-56", "21 de Septiembre, 2026"), ("57-58", "22 de Septiembre, 2026"), ("59-60", "23 de Septiembre, 2026"),
    ("61-62", "24 de Septiembre, 2026"), ("63-64", "25 de Septiembre, 2026"), ("65-66", "28 de Septiembre, 2026"),
    ("67-68", "1 de Octubre, 2026"), ("69-70", "2 de Octubre, 2026"), ("71-72", "5 de Octubre, 2026"),
    ("73-74", "6 de Octubre, 2026"), ("75-76", "7 de Octubre, 2026"), ("77-78", "8 de Octubre, 2026"),
    ("79-80", "9 de Octubre, 2026"), ("81-82", "13 de Octubre, 2026"), ("83-84", "14 de Octubre, 2026"),
    ("85-86", "15 de Octubre, 2026"), ("87-88", "16 de Octubre, 2026"), ("89-90", "19 de Octubre, 2026"),
    ("91-92", "20 de Octubre, 2026"), ("93-94", "21 de Octubre, 2026"), ("95-96", "22 de Octubre, 2026"),
    ("97-98", "23 de Octubre, 2026"), ("99-00", "26 de Octubre, 2026")
]

# IVA Bimestral (Enero-Febrero) -> Marzo 2026
iva_map = {
    "1": "10 de Marzo, 2026", "2": "11 de Marzo, 2026", "3": "12 de Marzo, 2026",
    "4": "13 de Marzo, 2026", "5": "16 de Marzo, 2026", "6": "17 de Marzo, 2026",
    "7": "18 de Marzo, 2026", "8": "19 de Marzo, 2026", "9": "20 de Marzo, 2026",
    "0": "24 de Marzo, 2026"
}

# Retención (Enero) -> Febrero 2026
rete_map = {
    "1": "10 de Febrero, 2026", "2": "11 de Febrero, 2026", "3": "12 de Febrero, 2026",
    "4": "13 de Febrero, 2026", "5": "16 de Febrero, 2026", "6": "17 de Febrero, 2026",
    "7": "18 de Febrero, 2026", "8": "19 de Febrero, 2026", "9": "20 de Febrero, 2026",
    "0": "23 de Febrero, 2026"
}

calendario = {}
for i in range(100):
    nit_str = f"{i:02d}"
    last_digit = nit_str[-1]
    
    renta_val = ""
    for r in renta_ranges:
        parts = r[0].split("-")
        if nit_str in parts:
            renta_val = r[1]
            break
            
    iva_val = iva_map[last_digit]
    rete_val = rete_map[last_digit]
    
    calendario[nit_str] = {
        "renta": renta_val,
        "iva": iva_val,
        "rete": rete_val
    }

with open("calendario_2026.json", "w", encoding="utf-8") as f:
    json.dump(calendario, f, ensure_ascii=False, indent=2)

print("Generated calendario_2026.json")
