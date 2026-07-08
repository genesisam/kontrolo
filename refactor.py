import re
import json

with open("src/pages/calendario-tributario.astro", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Reemplazar la caja de búsqueda
html_target = """        <div class="nit-search-box">
          <input type="number" id="nitInput" class="nit-input" placeholder="Últimos 2 dígitos (Ej. 89)" max="99" min="0" />
          <button id="btnBuscar" class="primary-button w-button nit-btn">
            Consultar
          </button>
        </div>"""

html_replace = """        <div class="nit-search-box" style="grid-template-columns: auto 1fr auto !important; padding-left: 0;">
          <select id="tipoContribuyente" class="nit-input" style="padding-left: 20px; border-right: 1px solid #eee; cursor: pointer; max-width: 200px;">
            <option value="natural">Persona Natural</option>
            <option value="juridica">Persona Jurídica</option>
            <option value="grandes">Gran Contribuyente</option>
          </select>
          <input type="number" id="nitInput" class="nit-input" style="padding-left: 15px;" placeholder="Dígito(s) NIT" max="99" min="0" />
          <button id="btnBuscar" class="primary-button w-button nit-btn">
            Consultar
          </button>
        </div>"""

content = content.replace(html_target, html_replace)

# 2. Vaciar las tarjetas hardcodeadas
tarjetas_target = re.search(r'(<div id="tarjetasContainer".*?>).*?(</div>\s*</div>\s*</section>)', content, re.DOTALL)
if tarjetas_target:
    content = content[:tarjetas_target.start(0)] + tarjetas_target.group(1) + "\n" + tarjetas_target.group(2) + content[tarjetas_target.end(0):]

# 3. Nuevo Script JS
new_script = """  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('btnBuscar');
      const input = document.getElementById('nitInput');
      const tipoSelect = document.getElementById('tipoContribuyente');
      const errorMsg = document.getElementById('errorMsg');
      
      const defaultMsg = document.getElementById('defaultMsg');
      const resultadosHeader = document.getElementById('resultadosHeader');
      const tarjetasContainer = document.getElementById('tarjetasContainer');
      const nitDisplay = document.getElementById('nitDisplay');

      // Bases de Datos DIAN 2026
      
      // Personas Naturales (2 digitos)
      const rentaNaturales = {
        "01-02": "12 de Agosto, 2026", "03-04": "13 de Agosto, 2026", "05-06": "14 de Agosto, 2026",
        "07-08": "18 de Agosto, 2026", "09-10": "19 de Agosto, 2026", "11-12": "20 de Agosto, 2026",
        "13-14": "21 de Agosto, 2026", "15-16": "24 de Agosto, 2026", "17-18": "25 de Agosto, 2026",
        "19-20": "26 de Agosto, 2026", "21-22": "27 de Agosto, 2026", "23-24": "28 de Agosto, 2026",
        "25-26": "31 de Agosto, 2026", "27-28": "1 de Septiembre, 2026", "29-30": "2 de Septiembre, 2026",
        "31-32": "3 de Septiembre, 2026", "33-34": "4 de Septiembre, 2026", "35-36": "7 de Septiembre, 2026",
        "37-38": "8 de Septiembre, 2026", "39-40": "9 de Septiembre, 2026", "41-42": "10 de Septiembre, 2026",
        "43-44": "11 de Septiembre, 2026", "45-46": "14 de Septiembre, 2026", "47-48": "15 de Septiembre, 2026",
        "49-50": "16 de Septiembre, 2026", "51-52": "17 de Septiembre, 2026", "53-54": "18 de Septiembre, 2026",
        "55-56": "21 de Septiembre, 2026", "57-58": "22 de Septiembre, 2026", "59-60": "23 de Septiembre, 2026",
        "61-62": "24 de Septiembre, 2026", "63-64": "25 de Septiembre, 2026", "65-66": "28 de Septiembre, 2026",
        "67-68": "1 de Octubre, 2026", "69-70": "2 de Octubre, 2026", "71-72": "5 de Octubre, 2026",
        "73-74": "6 de Octubre, 2026", "75-76": "7 de Octubre, 2026", "77-78": "8 de Octubre, 2026",
        "79-80": "9 de Octubre, 2026", "81-82": "13 de Octubre, 2026", "83-84": "14 de Octubre, 2026",
        "85-86": "15 de Octubre, 2026", "87-88": "16 de Octubre, 2026", "89-90": "19 de Octubre, 2026",
        "91-92": "20 de Octubre, 2026", "93-94": "21 de Octubre, 2026", "95-96": "22 de Octubre, 2026",
        "97-98": "23 de Octubre, 2026", "99-00": "26 de Octubre, 2026"
      };

      // Grandes Contribuyentes (Renta 3 cuotas) (1 digito)
      const grandes1 = {"1":"10 Feb","2":"11 Feb","3":"12 Feb","4":"13 Feb","5":"16 Feb","6":"17 Feb","7":"18 Feb","8":"19 Feb","9":"20 Feb","0":"23 Feb"};
      const grandes2 = {"1":"13 Abr","2":"14 Abr","3":"15 Abr","4":"16 Abr","5":"20 Abr","6":"21 Abr","7":"22 Abr","8":"23 Abr","9":"24 Abr","0":"27 Abr"};
      const grandes3 = {"1":"10 Jun","2":"11 Jun","3":"12 Jun","4":"16 Jun","5":"17 Jun","6":"18 Jun","7":"19 Jun","8":"22 Jun","9":"23 Jun","0":"24 Jun"};

      // Personas Jurídicas (Renta 2 cuotas) (1 digito)
      const jur1 = {"1":"12 May","2":"13 May","3":"14 May","4":"15 May","5":"19 May","6":"20 May","7":"21 May","8":"22 May","9":"25 May","0":"26 May"};
      const jur2 = {"1":"9 Jul","2":"10 Jul","3":"14 Jul","4":"15 Jul","5":"16 Jul","6":"17 Jul","7":"21 Jul","8":"22 Jul","9":"23 Jul","0":"24 Jul"};

      // IVA y Rete (1 digito)
      const ivaMap = {"1":"10 Mar","2":"11 Mar","3":"12 Mar","4":"13 Mar","5":"16 Mar","6":"17 Mar","7":"18 Mar","8":"19 Mar","9":"20 Mar","0":"24 Mar"};
      const reteMap = {"1":"10 Feb","2":"11 Feb","3":"12 Feb","4":"13 Feb","5":"16 Feb","6":"17 Feb","7":"18 Feb","8":"19 Feb","9":"20 Feb","0":"23 Feb"};

      function crearTarjeta(color, titulo, fechas, descripcion) {
        let fechasHtml = fechas.map(f => `
          <div style="background: ${color}15; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
            <div style="font-size: 13px; color: ${color}; font-weight: 600;">${f.label}</div>
            <div style="font-size: 20px; font-weight: 800; color: #111;">${f.val}</div>
          </div>
        `).join('');

        return `
          <div class="tax-card" style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid ${color};">
            <div style="font-size: 14px; font-weight: 700; color: #666; text-transform: uppercase; margin-bottom: 10px;">Impuesto</div>
            <h4 style="font-size: 22px; color: #111; margin-bottom: 20px;">${titulo}</h4>
            ${fechasHtml}
            <p style="font-size: 14px; color: #666;">${descripcion}</p>
          </div>
        `;
      }

      function renderCartas(tipo, nitStr, lastDigit) {
        let html = '';
        
        if (tipo === 'natural') {
          let fechaRenta = 'Pendiente';
          for (let key in rentaNaturales) {
            if (key.includes(nitStr)) {
              fechaRenta = rentaNaturales[key];
              break;
            }
          }
          html += crearTarjeta('#131ddf', 'Declaración de Renta', [{label: 'Fecha Límite:', val: fechaRenta}], 'Personas Naturales. Corresponde al pago único y declaración.');
          
        } else if (tipo === 'juridica') {
          html += crearTarjeta('#131ddf', 'Declaración de Renta', [
            {label: 'Declaración y Pago 1a Cuota:', val: jur1[lastDigit] + ' 2026'},
            {label: 'Pago 2a Cuota:', val: jur2[lastDigit] + ' 2026'}
          ], 'Personas Jurídicas. Corresponde a las 2 cuotas reglamentarias.');
          html += crearTarjeta('#00c389', 'IVA (Bimestral)', [{label: 'Periodo Enero-Febrero:', val: ivaMap[lastDigit] + ' 2026'}], 'Aplica para empresas que superen los topes de ingresos.');
          html += crearTarjeta('#ff5a5f', 'Retención en la Fuente', [{label: 'Periodo Enero:', val: reteMap[lastDigit] + ' 2026'}], 'Declaración mensual.');

        } else if (tipo === 'grandes') {
          html += crearTarjeta('#131ddf', 'Declaración de Renta', [
            {label: 'Pago 1a Cuota:', val: grandes1[lastDigit] + ' 2026'},
            {label: 'Declaración y Pago 2a Cuota:', val: grandes2[lastDigit] + ' 2026'},
            {label: 'Pago 3a Cuota:', val: grandes3[lastDigit] + ' 2026'}
          ], 'Grandes Contribuyentes. Corresponde a las 3 cuotas reglamentarias.');
          html += crearTarjeta('#00c389', 'IVA (Bimestral)', [{label: 'Periodo Enero-Febrero:', val: ivaMap[lastDigit] + ' 2026'}], 'Aplica de forma obligatoria.');
          html += crearTarjeta('#ff5a5f', 'Retención en la Fuente', [{label: 'Periodo Enero:', val: reteMap[lastDigit] + ' 2026'}], 'Declaración mensual.');
        }

        tarjetasContainer.innerHTML = html;
      }

      tipoSelect.addEventListener('change', () => {
        if(tipoSelect.value === 'natural') {
          input.placeholder = "Últimos 2 dígitos (Ej. 89)";
        } else {
          input.placeholder = "Último dígito (Ej. 9)";
        }
        input.value = '';
      });

      btn.addEventListener('click', () => {
        const val = input.value.trim();
        const tipo = tipoSelect.value;
        
        let isValid = false;
        let nitFormatted = '';
        let lastDigit = '';

        if (tipo === 'natural') {
          if (val && !isNaN(val) && val.length <= 2) {
            isValid = true;
            nitFormatted = val.padStart(2, '0');
            lastDigit = nitFormatted.slice(-1);
          }
        } else {
          if (val && !isNaN(val) && val.length === 1) {
            isValid = true;
            nitFormatted = val;
            lastDigit = val;
          }
        }

        if(!isValid) {
          errorMsg.textContent = tipo === 'natural' ? 'Por favor ingresa 1 o 2 dígitos válidos.' : 'Por favor ingresa un (1) solo dígito válido.';
          errorMsg.style.display = 'block';
          return;
        }
        
        errorMsg.style.display = 'none';
        nitDisplay.textContent = nitFormatted;
        
        // Renderizar dinámicamente
        renderCartas(tipo, nitFormatted, lastDigit);

        defaultMsg.style.display = 'none';
        resultadosHeader.style.display = 'block';
        tarjetasContainer.style.display = 'grid';
      });

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btn.click();
      });
    });
  </script>"""

content = re.sub(r'<script>.*?</script>', new_script, content, flags=re.DOTALL)

with open("src/pages/calendario-tributario.astro", "w", encoding="utf-8") as f:
    f.write(content)

print("Astro file fully refactored!")
