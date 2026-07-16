import React, { useState, useEffect } from 'react';

// --- CATÁLOGO TRADICIONAL ---
const RETENTION_CONCEPTS = [
  { id: 'honorarios_nat', label: 'Honorarios - Persona Natural', rate: 0.10, minUvt: 0 },
  { id: 'honorarios_jur', label: 'Honorarios - Persona Jurídica', rate: 0.11, minUvt: 0 },
  { id: 'servicios', label: 'Servicios Generales', rate: 0.04, minUvt: 4 },
  { id: 'compras', label: 'Compras en General', rate: 0.025, minUvt: 27 },
  { id: 'arrendamiento_inmuebles', label: 'Arrendamientos de Inmuebles', rate: 0.035, minUvt: 27 },
  { id: 'servicios_aseo', label: 'Servicios de Aseo y Vigilancia', rate: 0.02, minUvt: 4 },
  { id: 'transporte_carga', label: 'Transporte de Carga', rate: 0.01, minUvt: 4 }
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

export default function UvtCalculator() {
  const [uvtValue, setUvtValue] = useState<number>(52374); 
  const [calcMode, setCalcMode] = useState<'traditional' | 'independent'>('traditional');
  
  // --- ESTADO MODO TRADICIONAL ---
  const [amountPesos, setAmountPesos] = useState<number | ''>('');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('servicios');

  // --- ESTADO MODO INDEPENDIENTES (ART 383) ---
  const [indIncome, setIndIncome] = useState<number | ''>('');
  const [autoSS, setAutoSS] = useState<boolean>(true);
  
  // INCRGO (Ingresos no constitutivos de renta)
  const [ssPension, setSsPension] = useState<number | ''>('');
  const [ssSalud, setSsSalud] = useState<number | ''>('');
  const [ssArl, setSsArl] = useState<number | ''>('');
  const [ssSolidaridad, setSsSolidaridad] = useState<number | ''>('');
  const [ssVoluntario, setSsVoluntario] = useState<number | ''>(''); // Aportes voluntarios a pension obligatoria
  
  // Deducciones
  const [dedVivienda, setDedVivienda] = useState<number | ''>('');
  const [dedDependientes, setDedDependientes] = useState<number | ''>('');
  const [dedPrepagada, setDedPrepagada] = useState<number | ''>('');
  
  // Rentas Exentas
  const [exPensionVolAFC, setExPensionVolAFC] = useState<number | ''>('');

  // --- LÓGICA MODO TRADICIONAL ---
  const parsedAmount = typeof amountPesos === 'number' ? amountPesos : 0;
  const amountUvt = uvtValue > 0 ? parseFloat((parsedAmount / uvtValue).toFixed(2)) : 0;
  const selectedConcept = RETENTION_CONCEPTS.find(c => c.id === selectedConceptId) || RETENTION_CONCEPTS[0];
  const requiredMinPesos = selectedConcept.minUvt * uvtValue;
  const meetsMinimum = selectedConcept.minUvt === 0 || amountUvt >= selectedConcept.minUvt;
  const retentionValue = meetsMinimum ? parsedAmount * selectedConcept.rate : 0;
  const netTotal = parsedAmount - retentionValue;

  // --- LÓGICA MODO INDEPENDIENTES ---
  const parsedIndIncome = typeof indIncome === 'number' ? indIncome : 0;
  
  // Autocalcular Seguridad Social si aplica
  useEffect(() => {
    if (autoSS && parsedIndIncome > 0) {
      const ibc = parsedIndIncome * 0.40;
      // Pensión: 16% del IBC
      setSsPension(Math.round(ibc * 0.16));
      // Salud: 12.5% del IBC
      setSsSalud(Math.round(ibc * 0.125));
      // ARL: Riesgo I por defecto (0.522%)
      setSsArl(Math.round(ibc * 0.00522));
      
      // Fondo solidaridad (aplica si IBC > 4 SMLV, aprox asumiendo SMLV 2026 ~1.5M, digamos > 6M)
      if (ibc >= 6000000) {
         setSsSolidaridad(Math.round(ibc * 0.01));
      } else {
         setSsSolidaridad(0);
      }
    }
  }, [parsedIndIncome, autoSS]);

  // Parsear campos independientes
  const pPension = typeof ssPension === 'number' ? ssPension : 0;
  const pSalud = typeof ssSalud === 'number' ? ssSalud : 0;
  const pArl = typeof ssArl === 'number' ? ssArl : 0;
  const pSolidaridad = typeof ssSolidaridad === 'number' ? ssSolidaridad : 0;
  const pVoluntario = typeof ssVoluntario === 'number' ? ssVoluntario : 0;
  
  const pVivienda = typeof dedVivienda === 'number' ? dedVivienda : 0;
  const pDependientes = typeof dedDependientes === 'number' ? dedDependientes : 0;
  const pPrepagada = typeof dedPrepagada === 'number' ? dedPrepagada : 0;
  const pAFC = typeof exPensionVolAFC === 'number' ? exPensionVolAFC : 0;

  // Cálculos de la Depuración (Mensual)
  const totalINCRGO = pPension + pSalud + pArl + pSolidaridad + pVoluntario;
  const subtotal1_IngresoNeto = parsedIndIncome - totalINCRGO;

  // Limites en deducciones (Mensuales)
  const limitVivienda = Math.min(pVivienda, 100 * uvtValue);
  const limitDependientes = Math.min(pDependientes, 32 * uvtValue);
  const limitPrepagada = Math.min(pPrepagada, 16 * uvtValue);
  const totalDeducciones = limitVivienda + limitDependientes + limitPrepagada;
  const subtotal2 = subtotal1_IngresoNeto - totalDeducciones;

  // Límite rentas exentas (AFC + Pensión Voluntaria: máx 30% del ingreso, máx 3800 UVT/año -> 316.6/mes)
  const limitAFC_pct = parsedIndIncome * 0.30;
  const limitAFC_uvt = (3800 / 12) * uvtValue;
  const limitAFC = Math.min(pAFC, limitAFC_pct, limitAFC_uvt);
  const subtotal3 = subtotal2 - limitAFC;

  // Renta exenta laboral (25% del subtotal 3)
  // Limite: 790 UVT al año -> 65.83 UVT al mes
  const rentaExenta25_raw = subtotal3 > 0 ? subtotal3 * 0.25 : 0;
  const limitRentaExenta25 = Math.min(rentaExenta25_raw, (790 / 12) * uvtValue);

  const totalDeduccionesYRentas = totalDeducciones + limitAFC + limitRentaExenta25;

  // Límite global del 40% del Ingreso Neto (Subtotal 1)
  // Máximo Anual 1340 UVT -> 111.66 UVT/mes
  const limit40_raw = subtotal1_IngresoNeto * 0.40;
  const limit40_uvt = (1340 / 12) * uvtValue;
  const maxBeneficioPermitido = Math.min(limit40_raw, limit40_uvt);

  const totalBeneficioAplicado = Math.min(totalDeduccionesYRentas, maxBeneficioPermitido);

  const ingresoBaseRetencion = subtotal1_IngresoNeto - totalBeneficioAplicado;
  const ingresoBaseUVT = ingresoBaseRetencion > 0 && uvtValue > 0 ? ingresoBaseRetencion / uvtValue : 0;

  // Tabla Marginal Art. 383
  let impuestoUVT = 0;
  let formulaStr = "0 UVT";

  if (ingresoBaseUVT > 2300) {
    impuestoUVT = (ingresoBaseUVT - 2300) * 0.39 + 770;
    formulaStr = `(Base UVT - 2300) * 39% + 770`;
  } else if (ingresoBaseUVT > 945) {
    impuestoUVT = (ingresoBaseUVT - 945) * 0.37 + 268;
    formulaStr = `(Base UVT - 945) * 37% + 268`;
  } else if (ingresoBaseUVT > 640) {
    impuestoUVT = (ingresoBaseUVT - 640) * 0.35 + 162;
    formulaStr = `(Base UVT - 640) * 35% + 162`;
  } else if (ingresoBaseUVT > 360) {
    impuestoUVT = (ingresoBaseUVT - 360) * 0.33 + 69;
    formulaStr = `(Base UVT - 360) * 33% + 69`;
  } else if (ingresoBaseUVT > 150) {
    impuestoUVT = (ingresoBaseUVT - 150) * 0.28 + 10;
    formulaStr = `(Base UVT - 150) * 28% + 10`;
  } else if (ingresoBaseUVT > 95) {
    impuestoUVT = (ingresoBaseUVT - 95) * 0.19;
    formulaStr = `(Base UVT - 95) * 19%`;
  }

  const retencionIndependientes = impuestoUVT * uvtValue;
  const netTotalIndependientes = parsedIndIncome - retencionIndependientes - totalINCRGO;

  // Handle Input Changes generically
  const handleNumChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val === '' ? '' : Number(val));
  };

  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      
      {/* HEADER UVT */}
      <div style={{ background: 'var(--color-primary)', color: 'var(--color-white)', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-white)' }}>Simulador Tributario</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', color: 'var(--color-white)' }}>Calculadora avanzada de Retención en la Fuente.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '13px', opacity: 0.8 }}>Valor UVT:</span>
          <span style={{ fontWeight: 600 }}>$</span>
          <input 
            type="number" 
            value={uvtValue} 
            onChange={(e) => setUvtValue(Number(e.target.value))}
            style={{ 
              background: 'transparent', border: 'none', color: 'var(--color-white)', fontSize: '16px', fontWeight: 700, 
              width: '80px', outline: 'none', textAlign: 'right'
            }}
          />
        </div>
      </div>

      {/* MODE SWITCHER */}
      <div style={{ display: 'flex', background: 'var(--color-gray-50)', padding: '8px', borderBottom: '1px solid var(--color-gray-100)' }}>
        <button 
          onClick={() => setCalcMode('traditional')}
          style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: calcMode === 'traditional' ? 'var(--color-white)' : 'transparent', color: calcMode === 'traditional' ? 'var(--color-primary)' : 'var(--color-gray-800)', boxShadow: calcMode === 'traditional' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}
        >
          Conceptos Básicos (4%, 10%, 11%)
        </button>
        <button 
          onClick={() => setCalcMode('independent')}
          style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: calcMode === 'independent' ? 'var(--color-white)' : 'transparent', color: calcMode === 'independent' ? 'var(--color-primary)' : 'var(--color-gray-800)', boxShadow: calcMode === 'independent' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}
        >
          Rentas de Trabajo (Independientes Art. 383)
        </button>
      </div>

      <div style={{ background: 'var(--color-white)', padding: '32px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {calcMode === 'traditional' ? (
          /* =========================================
             M O D O   T R A D I C I O N A L 
             ========================================= */
          <div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Valor del Contrato / Base (Pesos)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-500)' }}>$</span>
                  <input type="text" value={parsedAmount > 0 ? parsedAmount.toLocaleString('es-CO') : ''} onChange={handleNumChange(setAmountPesos)} placeholder="0" style={{ width: '100%', padding: '16px 16px 16px 40px', borderRadius: '12px', border: '2px solid var(--color-gray-200)', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-200)'} />
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'var(--color-dark)' }}>Cálculo de Retención en la Fuente</h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Concepto de Retención</label>
              <select value={selectedConceptId} onChange={(e) => setSelectedConceptId(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray-200)', fontSize: '16px', outline: 'none', appearance: 'none', background: 'var(--color-white)', cursor: 'pointer' }}>
                {RETENTION_CONCEPTS.map(concept => (
                  <option key={concept.id} value={concept.id}>
                    {concept.label} ({(concept.rate * 100).toFixed(1)}%) {concept.minUvt > 0 ? ` - Base: ${concept.minUvt} UVT` : ''}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '13px', color: 'var(--color-gray-800)', marginTop: '8px' }}>
                Base legal mínima requerida: <strong>{selectedConcept.minUvt === 0 ? 'Sin base (desde el primer peso)' : `${selectedConcept.minUvt} UVT (${formatCurrency(requiredMinPesos)})`}</strong>
              </div>
            </div>

            {parsedAmount > 0 && !meetsMinimum && (
              <div style={{ background: '#fff9e6', borderLeft: '4px solid #ffcc00', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ margin: 0, color: '#856600', fontSize: '14px' }}>
                  <strong>No aplica retención:</strong> El valor ingresado ({formatCurrency(parsedAmount)}) no supera la base mínima de <strong>{selectedConcept.minUvt} UVT ({formatCurrency(requiredMinPesos)})</strong>.
                </p>
              </div>
            )}
            {parsedAmount > 0 && meetsMinimum && selectedConcept.minUvt > 0 && (
              <div style={{ background: '#e6f7ef', borderLeft: '4px solid #00d084', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ margin: 0, color: '#006642', fontSize: '14px' }}>
                  <strong>Sí aplica retención:</strong> El valor supera la base mínima de <strong>{selectedConcept.minUvt} UVT ({formatCurrency(requiredMinPesos)})</strong>.
                </p>
              </div>
            )}

            <div style={{ background: 'var(--color-gray-50)', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-gray-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--color-gray-500)' }}>
                <span>Subtotal:</span><span style={{ fontWeight: 500 }}>{formatCurrency(parsedAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: meetsMinimum ? 'var(--color-danger)' : 'var(--color-gray-500)' }}>
                <span>Retención ({(selectedConcept.rate * 100).toFixed(1)}%):</span><span style={{ fontWeight: 500 }}>- {formatCurrency(retentionValue)}</span>
              </div>
              <div style={{ borderTop: '2px solid var(--color-gray-300)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark)' }}>Total Neto a Pagar:</span><span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>{formatCurrency(netTotal)}</span>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================
             M O D O   I N D E P E N D I E N T E S 
             ========================================= */
          <div>
            {/* 1. INGRESOS */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '8px', display: 'inline-block' }}>1. Ingresos Mensuales</h3>
              <div style={{ marginTop: '16px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-500)' }}>$</span>
                <input type="text" value={parsedIndIncome > 0 ? parsedIndIncome.toLocaleString('es-CO') : ''} onChange={handleNumChange(setIndIncome)} placeholder="Ingresa el valor del contrato..." style={{ width: '100%', padding: '16px 16px 16px 40px', borderRadius: '12px', border: '2px solid var(--color-gray-200)', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-200)'} />
              </div>
            </div>

            {/* 2. INCRGO */}
            <div style={{ marginBottom: '24px', background: 'var(--color-gray-50)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-gray-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', margin: 0 }}>2. Aportes a Seguridad Social (INCRGO)</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }}>
                  <input type="checkbox" checked={autoSS} onChange={(e) => setAutoSS(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
                  Calcular automático (IBC 40%)
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Salud</label>
                  <input type="text" value={pSalud > 0 ? pSalud.toLocaleString('es-CO') : ''} onChange={handleNumChange(setSsSalud)} disabled={autoSS} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none', background: autoSS ? 'var(--color-gray-100)' : 'var(--color-white)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Pensión</label>
                  <input type="text" value={pPension > 0 ? pPension.toLocaleString('es-CO') : ''} onChange={handleNumChange(setSsPension)} disabled={autoSS} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none', background: autoSS ? 'var(--color-gray-100)' : 'var(--color-white)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>ARL / Solidaridad</label>
                  <input type="text" value={(pArl + pSolidaridad) > 0 ? (pArl + pSolidaridad).toLocaleString('es-CO') : ''} readOnly disabled={autoSS} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none', background: 'var(--color-gray-100)' }} />
                </div>
              </div>
              <div style={{ marginTop: '12px', textAlign: 'right', fontSize: '13px', color: 'var(--color-gray-800)', fontWeight: 500 }}>
                Subtotal 1 (Ingreso Neto): <strong style={{ color: 'var(--color-dark)' }}>{formatCurrency(subtotal1_IngresoNeto)}</strong>
              </div>
            </div>

            {/* 3. DEDUCCIONES & EXENTAS */}
            <div style={{ marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'var(--color-white)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-gray-100)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '16px' }}>3. Deducciones</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Intereses Vivienda (Máx {formatCurrency(100*uvtValue)})</label>
                  <input type="text" value={pVivienda > 0 ? pVivienda.toLocaleString('es-CO') : ''} onChange={handleNumChange(setDedVivienda)} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Dependientes (Máx {formatCurrency(32*uvtValue)})</label>
                  <input type="text" value={pDependientes > 0 ? pDependientes.toLocaleString('es-CO') : ''} onChange={handleNumChange(setDedDependientes)} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Med. Prepagada (Máx {formatCurrency(16*uvtValue)})</label>
                  <input type="text" value={pPrepagada > 0 ? pPrepagada.toLocaleString('es-CO') : ''} onChange={handleNumChange(setDedPrepagada)} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ background: 'var(--color-white)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-gray-100)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '16px' }}>4. Rentas Exentas</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-gray-500)' }}>Aportes AFC y Pensión Voluntaria</label>
                  <input type="text" value={pAFC > 0 ? pAFC.toLocaleString('es-CO') : ''} onChange={handleNumChange(setExPensionVolAFC)} placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', outline: 'none' }} />
                </div>
                <div style={{ marginTop: '20px', padding: '12px', background: 'var(--color-gray-50)', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-primary)' }}>Renta Exenta Automática (25%)</label>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark)' }}>{formatCurrency(limitRentaExenta25)}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-gray-800)', marginTop: '2px' }}>Calculado tras restar deducibles.</div>
                </div>
              </div>
            </div>

            {/* RECIBO DE DEPURACIÓN */}
            <div style={{ background: 'var(--color-gray-50)', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-gray-100)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--color-dark)' }}>Resumen de Depuración</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--color-gray-500)' }}>
                <span>Ingreso Bruto:</span><span>{formatCurrency(parsedIndIncome)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--color-danger)' }}>
                <span>(-) Seg. Social (INCRGO):</span><span>- {formatCurrency(totalINCRGO)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--color-gray-500)', paddingBottom: '12px', borderBottom: '1px dashed var(--color-gray-300)' }}>
                <strong>Subtotal 1 (Ingreso Neto):</strong><strong>{formatCurrency(subtotal1_IngresoNeto)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--color-danger)' }}>
                <span>(-) Deducciones aplicables:</span><span>- {formatCurrency(totalDeducciones)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--color-danger)' }}>
                <span>(-) AFC + Pens. Voluntarias:</span><span>- {formatCurrency(limitAFC)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--color-danger)', paddingBottom: '12px', borderBottom: '1px dashed var(--color-gray-300)' }}>
                <span>(-) Renta Exenta Laboral 25%:</span><span>- {formatCurrency(limitRentaExenta25)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: totalBeneficioAplicado === maxBeneficioPermitido ? '#b38600' : '#006642', background: totalBeneficioAplicado === maxBeneficioPermitido ? '#fff9e6' : '#e6f7ef', padding: '6px 12px', borderRadius: '4px' }}>
                <strong>Límite Global 40% ({formatCurrency(maxBeneficioPermitido)})</strong>
                <span>Se aplica: {formatCurrency(totalBeneficioAplicado)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '15px', color: 'var(--color-dark)', fontWeight: 600 }}>
                <span>Ingreso Laboral Gravado (Base Retención):</span><span>{formatCurrency(ingresoBaseRetencion)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', color: 'var(--color-gray-500)' }}>
                <span>Equivalencia Base UVT:</span><span>{ingresoBaseUVT.toFixed(2)} UVT</span>
              </div>

              {/* TRAMO MARGINAL */}
              <div style={{ background: 'var(--color-primary)', color: 'var(--color-white)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>Retención (Art 383): {formulaStr}</div>
                    <div style={{ fontSize: '20px', fontWeight: 700 }}>Retención en la Fuente:</div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800 }}>
                    {formatCurrency(retencionIndependientes)}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
