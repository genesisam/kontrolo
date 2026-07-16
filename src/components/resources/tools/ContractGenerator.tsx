import React, { useState } from 'react';

export default function ContractGenerator() {
  const [formData, setFormData] = useState({
    empresa: '',
    empleado: '',
    cedula: '',
    cargo: '',
    salario: '',
    ciudad: '',
    fechaInicio: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [contractText, setContractText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setContractText('');
    
    // Simulate AI loading effect
    setTimeout(() => {
      const template = `CONTRATO INDIVIDUAL DE TRABAJO A TÉRMINO INDEFINIDO

Entre los suscritos a saber: por una parte ${formData.empresa.toUpperCase() || '[NOMBRE DE LA EMPRESA]'}, quien en adelante se denominará EL EMPLEADOR, y por la otra ${formData.empleado.toUpperCase() || '[NOMBRE DEL EMPLEADO]'}, mayor de edad, identificado(a) con cédula de ciudadanía No. ${formData.cedula || '[CÉDULA]'}, quien en adelante se denominará EL TRABAJADOR, hemos convenido en celebrar un CONTRATO INDIVIDUAL DE TRABAJO A TÉRMINO INDEFINIDO, el cual se regirá por las siguientes cláusulas:

PRIMERA. OBJETO: EL EMPLEADOR contrata los servicios personales de EL TRABAJADOR para que desempeñe el cargo de ${formData.cargo.toUpperCase() || '[CARGO]'} y las demás labores inherentes a dicho cargo.

SEGUNDA. LUGAR DE TRABAJO: EL TRABAJADOR prestará sus servicios en la ciudad de ${formData.ciudad.toUpperCase() || '[CIUDAD]'}, no obstante, EL EMPLEADOR podrá trasladarlo a cualquier otra dependencia u otra ciudad según las necesidades del servicio.

TERCERA. SALARIO: EL EMPLEADOR pagará a EL TRABAJADOR por la prestación de sus servicios la suma mensual de $${Number(formData.salario || 0).toLocaleString('es-CO')} M/CTE., pagaderos de forma mensual. Dicho salario cubrirá no sólo el trabajo ordinario, sino también los días de descanso obligatorio y festivos, de acuerdo con la ley.

CUARTA. FECHA DE INICIO: El presente contrato rige a partir del ${formData.fechaInicio || '[FECHA DE INICIO]'} y su duración será indefinida mientras subsistan las causas que le dieron origen y la materia del trabajo.

Para constancia se firma en la ciudad de ${formData.ciudad || '[CIUDAD]'}, en dos (2) ejemplares del mismo tenor y valor.

___________________________
EL EMPLEADOR
${formData.empresa || '[NOMBRE DE LA EMPRESA]'}

___________________________
EL TRABAJADOR
C.C. ${formData.cedula || '[CÉDULA]'}


--
Nota Legal: Este modelo fue generado con la herramienta de Inteligencia Artificial de Kontrolo. Si deseas acceder a modelos complejos (Término Fijo, Obra y Labor) integrados automáticamente con la liquidación de tu nómina mensual, conoce el ERP Kontrolo en www.kontrolo.com.co`;
      
      setContractText(template);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contractText);
    alert('¡Contrato copiado al portapapeles!');
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      
      <div style={{ background: 'linear-gradient(135deg, #a21caf 0%, #d946ef 100%)', color: 'var(--color-white)', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-white)' }}>Generador de Contratos Laborales (IA)</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', color: 'var(--color-white)' }}>Crea un Contrato a Término Indefinido blindado legalmente en segundos.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-white)' }}>✨ AI Powered</div>
      </div>

      <div style={{ background: 'var(--color-white)', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div style={{ padding: '32px', borderRight: '1px solid var(--color-gray-100)', background: 'var(--color-gray-50)' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '24px' }}>Completa los datos clave</h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <input type="text" name="empresa" placeholder="Nombre de la Empresa Empleadora" onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
            <input type="text" name="empleado" placeholder="Nombre Completo del Empleado" onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
               <input type="text" name="cedula" placeholder="Cédula" onChange={handleChange} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
               <input type="text" name="ciudad" placeholder="Ciudad (Ej. Bogotá)" onChange={handleChange} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <input type="text" name="cargo" placeholder="Cargo (Ej. Auxiliar Contable)" onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
               <input type="number" name="salario" placeholder="Salario Mensual ($)" onChange={handleChange} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box' }} />
               <input type="date" name="fechaInicio" onChange={handleChange} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box', color: 'var(--color-gray-500)' }} />
            </div>
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            style={{ width: '100%', marginTop: '32px', padding: '16px', background: isGenerating ? 'var(--color-gray-200)' : 'var(--color-dark)', color: isGenerating ? 'var(--color-gray-500)' : 'var(--color-white)', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: isGenerating ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
          >
            {isGenerating ? 'Generando documento...' : 'Generar Contrato Legal ✨'}
          </button>
        </div>

        {/* LADO DERECHO: VISUALIZADOR */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
             <h3 style={{ fontSize: '16px', margin: 0 }}>Vista Previa del Documento</h3>
             {contractText && (
               <button onClick={handleCopy} style={{ padding: '6px 12px', background: '#eef2ff', color: 'var(--color-primary)', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Copiar Texto</button>
             )}
          </div>
          
          <div style={{ flex: 1, background: 'var(--color-white)', border: '1px solid var(--color-gray-100)', borderRadius: '8px', padding: '24px', fontSize: '13px', lineHeight: '1.6', color: 'var(--color-gray-800)', overflowY: 'auto', maxHeight: '400px', whiteSpace: 'pre-wrap' }}>
            {isGenerating ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#a21caf' }}>
                <div style={{ fontSize: '24px', marginBottom: '16px' }}>⚙️</div>
                Estructurando marco legal colombiano...
              </div>
            ) : contractText ? (
              contractText
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray-500)', textAlign: 'center' }}>
                Completa el formulario y presiona generar para previsualizar el contrato aquí.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
