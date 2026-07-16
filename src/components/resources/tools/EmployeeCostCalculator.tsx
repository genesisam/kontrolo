import React, { useState } from 'react';

// --- CONSTANTES 2026 ---
const SMMLV = 1750905;
const AUX_TRANSPORTE = 249095;

// --- RIESGOS ARL ---
const ARL_RATES = [
  { level: 'I', label: 'Riesgo I (Financiero, Oficina)', rate: 0.00522 },
  { level: 'II', label: 'Riesgo II (Manufactura, Agro)', rate: 0.01044 },
  { level: 'III', label: 'Riesgo III (Construcción leve)', rate: 0.02436 },
  { level: 'IV', label: 'Riesgo IV (Riesgo alto)', rate: 0.0435 },
  { level: 'V', label: 'Riesgo V (Minería, Explosivos)', rate: 0.0696 }
];

// --- FUNCIONES AUXILIARES ---
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function EmployeeCostCalculator() {
  const [baseSalary, setBaseSalary] = useState<number | ''>('');
  const [arlRate, setArlRate] = useState<number>(ARL_RATES[0].rate);
  const [apply114, setApply114] = useState<boolean>(true);

  // Parse Salary
  const parsedSalary = typeof baseSalary === 'number' ? baseSalary : 0;
  
  // Validations & Logic
  const hasTransportAux = parsedSalary > 0 && parsedSalary <= (SMMLV * 2);
  const valTransportAux = hasTransportAux ? AUX_TRANSPORTE : 0;
  
  // Si el salario es >= 10 SMMLV, automáticamente NO aplica la exoneración 114-1 ET.
  const isExempted = apply114 && parsedSalary < (SMMLV * 10);

  // Bases
  const baseSeguridadSocial = parsedSalary;
  const basePrestaciones = parsedSalary + valTransportAux;
  const baseVacaciones = parsedSalary;

  // Aportes Empleador
  const salud = isExempted ? 0 : Math.round(baseSeguridadSocial * 0.085);
  const pension = parsedSalary > 0 ? Math.round(baseSeguridadSocial * 0.12) : 0;
  const arl = parsedSalary > 0 ? Math.round(baseSeguridadSocial * arlRate) : 0;
  
  // Parafiscales
  const caja = parsedSalary > 0 ? Math.round(baseSeguridadSocial * 0.04) : 0;
  const sena = isExempted ? 0 : Math.round(baseSeguridadSocial * 0.02);
  const icbf = isExempted ? 0 : Math.round(baseSeguridadSocial * 0.03);

  // Prestaciones
  const cesantias = parsedSalary > 0 ? Math.round(basePrestaciones * (8.33 / 100)) : 0;
  const intCesantias = parsedSalary > 0 ? Math.round(cesantias * 0.12) : 0;
  const prima = parsedSalary > 0 ? Math.round(basePrestaciones * (8.33 / 100)) : 0;
  const vacaciones = parsedSalary > 0 ? Math.round(baseVacaciones * (4.17 / 100)) : 0;

  // Totales
  const totalPagadoEmpleado = parsedSalary + valTransportAux; // Lo que recibe en nómina (sin descontar su parte de salud/pensión)
  const totalAportes = salud + pension + arl;
  const totalParafiscales = caja + sena + icbf;
  const totalPrestaciones = cesantias + intCesantias + prima + vacaciones;

  const costoMensualTotal = totalPagadoEmpleado + totalAportes + totalParafiscales + totalPrestaciones;
  const sobreCostoPct = parsedSalary > 0 ? ((costoMensualTotal - parsedSalary) / parsedSalary) * 100 : 0;

  const costoAnualTotal = costoMensualTotal * 12;

  // Handle Input Change
  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setBaseSalary(val === '' ? '' : Number(val));
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: '#05192D', color: 'var(--color-white)', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-white)' }}>Calculadora de Costo Laboral</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', color: '#a0aec0' }}>Descubre el costo real de un empleado para tu empresa en 2026.</p>
        </div>
      </div>

      <div style={{ background: 'var(--color-white)', padding: '32px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* PARTE SUPERIOR: INPUTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* INPUT SALARIO */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark)' }}>Salario Mensual</label>
              <button 
                onClick={() => setBaseSalary(SMMLV)}
                style={{ background: '#eef2ff', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', cursor: 'pointer' }}
              >
                Mínimo 2026
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-500)' }}>$</span>
              <input type="text" value={parsedSalary > 0 ? parsedSalary.toLocaleString('es-CO') : ''} onChange={handleNumChange} placeholder="1.750.905" style={{ width: '100%', padding: '16px 16px 16px 40px', borderRadius: '12px', border: '2px solid var(--color-gray-200)', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-200)'} />
            </div>
            {hasTransportAux && (
              <div style={{ fontSize: '12px', color: '#006642', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Incluye Auxilio de Transporte (${AUX_TRANSPORTE.toLocaleString('es-CO')})
              </div>
            )}
          </div>

          {/* SELECTOR ARL & EXONERACION */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Clase de Riesgo ARL</label>
            <select 
              value={arlRate} 
              onChange={(e) => setArlRate(Number(e.target.value))} 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray-200)', fontSize: '15px', outline: 'none', background: 'var(--color-white)', cursor: 'pointer', marginBottom: '16px' }}
            >
              {ARL_RATES.map(arl => (
                <option key={arl.level} value={arl.rate}>{arl.label} ({(arl.rate * 100).toFixed(3)}%)</option>
              ))}
            </select>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-gray-50)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-gray-100)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-dark)' }}>Beneficio Art. 114-1 ET</div>
                <div style={{ fontSize: '11px', color: 'var(--color-gray-800)' }}>Exonera Salud, SENA e ICBF.</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={apply114} 
                  onChange={(e) => setApply114(e.target.checked)} 
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }} 
                />
              </label>
            </div>
            {parsedSalary >= (SMMLV * 10) && (
              <div style={{ fontSize: '11px', color: 'var(--color-danger)', marginTop: '6px' }}>
                * No aplicable para salarios {'>'} 10 SMMLV.
              </div>
            )}
          </div>

        </div>

        {/* PARTE INFERIOR: RESUMEN Y DESGLOSE */}
        {parsedSalary > 0 && (
          <div>
            <hr style={{ border: 'none', borderTop: '1px dashed var(--color-gray-200)', margin: '0 0 32px 0' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              
              {/* COLUMNA DESGLOSE */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '16px' }}>Desglose de Costos Asumidos</h3>
                
                {/* Seguridad Social */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Seguridad Social</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Pensión (12%)</span><span style={{fontWeight: 500}}>{formatCurrency(pension)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>ARL</span><span style={{fontWeight: 500}}>{formatCurrency(arl)}</span></div>
                  {!isExempted && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Salud (8.5%)</span><span style={{fontWeight: 500}}>{formatCurrency(salud)}</span></div>}
                </div>

                {/* Parafiscales */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Parafiscales</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Caja de Compensación (4%)</span><span style={{fontWeight: 500}}>{formatCurrency(caja)}</span></div>
                  {!isExempted && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>SENA (2%)</span><span style={{fontWeight: 500}}>{formatCurrency(sena)}</span></div>}
                  {!isExempted && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>ICBF (3%)</span><span style={{fontWeight: 500}}>{formatCurrency(icbf)}</span></div>}
                </div>

                {/* Prestaciones Sociales */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Prestaciones Sociales</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Cesantías (8.33%)</span><span style={{fontWeight: 500}}>{formatCurrency(cesantias)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Intereses de Cesantías (1%)</span><span style={{fontWeight: 500}}>{formatCurrency(intCesantias)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Prima (8.33%)</span><span style={{fontWeight: 500}}>{formatCurrency(prima)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}><span style={{color: 'var(--color-gray-500)'}}>Vacaciones (4.17%)</span><span style={{fontWeight: 500}}>{formatCurrency(vacaciones)}</span></div>
                </div>

              </div>

              {/* COLUMNA TOTALES DESTACADOS */}
              <div style={{ background: 'var(--color-gray-50)', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-gray-100)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* COSTO TOTAL MENSUAL */}
                <div style={{ background: 'var(--color-white)', padding: '20px', borderRadius: '12px', border: '2px solid var(--color-primary)', boxShadow: '0 8px 20px rgba(19, 29, 223, 0.1)' }}>
                  <div style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Costo Total Mensual</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', lineHeight: '1.2' }}>{formatCurrency(costoMensualTotal)}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-gray-800)', marginTop: '8px' }}>El empleado cuesta un <strong>{sobreCostoPct.toFixed(1)}% más</strong> que su salario base.</div>
                </div>

                {/* COSTO TOTAL ANUAL */}
                <div style={{ background: '#05192D', padding: '20px', borderRadius: '12px', color: 'var(--color-white)' }}>
                  <div style={{ fontSize: '14px', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Costo Total Anualizado</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-white)', lineHeight: '1.2' }}>{formatCurrency(costoAnualTotal)}</div>
                  <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '8px', opacity: 0.8 }}>Proyección asumiendo 12 meses.</div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
