import React, { useState } from 'react';

// --- CONSTANTES 2026 ---
const SMMLV = 1750905;
const AUX_TRANSPORTE = 249095;

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function LaborSettlementCalculator() {
  // Estados Inputs
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [baseSalary, setBaseSalary] = useState<number | ''>('');
  const [vacationDaysOwed, setVacationDaysOwed] = useState<number | ''>('');
  const [reason, setReason] = useState<'renuncia' | 'despido_injusto'>('renuncia');

  // Cálculos de Fechas
  const sDate = startDate ? new Date(startDate + 'T00:00:00') : null;
  const eDate = endDate ? new Date(endDate + 'T00:00:00') : null;

  // Matemática de Días (Calendario estándar para simplicidad y precisión)
  const getDaysDiff = (start: Date, end: Date) => {
    if (end < start) return 0;
    const diffTime = end.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalDaysWorked = (sDate && eDate) ? getDaysDiff(sDate, eDate) : 0;

  // Lógica de Días para Prima (último semestre)
  let primaDays = 0;
  if (sDate && eDate && totalDaysWorked > 0) {
    const year = eDate.getFullYear();
    const isSecondSemester = eDate.getMonth() >= 6; // Julio es 6
    const semesterStart = isSecondSemester ? new Date(year, 6, 1) : new Date(year, 0, 1);
    const applicableStart = sDate > semesterStart ? sDate : semesterStart;
    primaDays = getDaysDiff(applicableStart, eDate);
  }

  // Lógica de Días para Cesantías (último año)
  let cesantiasDays = 0;
  if (sDate && eDate && totalDaysWorked > 0) {
    const year = eDate.getFullYear();
    const yearStart = new Date(year, 0, 1);
    const applicableStart = sDate > yearStart ? sDate : yearStart;
    cesantiasDays = getDaysDiff(applicableStart, eDate);
  }

  // Bases Salariales
  const parsedSalary = typeof baseSalary === 'number' ? baseSalary : 0;
  const hasTransportAux = parsedSalary > 0 && parsedSalary <= (SMMLV * 2);
  const valTransportAux = hasTransportAux ? AUX_TRANSPORTE : 0;
  
  const basePrestaciones = parsedSalary + valTransportAux;
  const baseVacaciones = parsedSalary; // Vacaciones NO incluyen auxilio de transporte

  // Liquidación Proporcional
  const prima = (basePrestaciones * primaDays) / 360;
  const cesantias = (basePrestaciones * cesantiasDays) / 360;
  const intCesantias = (cesantias * cesantiasDays * 0.12) / 360;
  
  const parsedVacations = typeof vacationDaysOwed === 'number' ? vacationDaysOwed : 0;
  const vacaciones = (baseVacaciones / 30) * parsedVacations;

  const totalPrestaciones = prima + cesantias + intCesantias + vacaciones;

  // Indemnización Despido Injusta Causa (Término Indefinido Art. 64 CST)
  let indemnizacion = 0;
  if (reason === 'despido_injusto' && parsedSalary > 0 && totalDaysWorked > 0) {
    const dailySalary = parsedSalary / 30;
    const isHighEarner = parsedSalary >= (SMMLV * 10);
    
    const daysFirstYear = isHighEarner ? 20 : 30;
    const daysSubsequentYears = isHighEarner ? 15 : 20;

    if (totalDaysWorked <= 360) {
      indemnizacion = daysFirstYear * dailySalary;
    } else {
      const extraDays = totalDaysWorked - 360;
      const extraYearsProportion = extraDays / 360;
      indemnizacion = (daysFirstYear * dailySalary) + (daysSubsequentYears * dailySalary * extraYearsProportion);
    }
  }

  const grandTotal = totalPrestaciones + indemnizacion;

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val === '' ? '' : Number(val));
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: 'var(--color-dark)', color: 'var(--color-white)', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-white)' }}>Simulador de Liquidación Laboral</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', color: '#a0aec0' }}>Calcula prestaciones sociales e indemnizaciones (Contratos a Término Indefinido).</p>
        </div>
      </div>

      <div style={{ background: 'var(--color-white)', padding: '32px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* PARTE SUPERIOR: INPUTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* FECHAS */}
          <div>
             <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Fechas del Contrato</label>
             <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-gray-800)', marginBottom: '4px' }}>Fecha Ingreso</div>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', cursor: 'pointer' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-gray-800)', marginBottom: '4px' }}>Fecha Retiro</div>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', cursor: 'pointer' }} />
                </div>
             </div>
             {totalDaysWorked > 0 && (
                <div style={{ fontSize: '12px', color: 'var(--color-primary)', marginTop: '8px', fontWeight: 500 }}>
                  Tiempo total laborado: {totalDaysWorked} días.
                </div>
             )}
          </div>

          {/* INPUT SALARIO */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark)' }}>Salario Mensual (Base)</label>
              <button 
                onClick={() => setBaseSalary(SMMLV)}
                style={{ background: '#eef2ff', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', cursor: 'pointer' }}
              >
                Mínimo 2026
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-500)' }}>$</span>
              <input type="text" value={parsedSalary > 0 ? parsedSalary.toLocaleString('es-CO') : ''} onChange={(e) => handleNumChange(e, setBaseSalary)} placeholder="1.750.905" style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            {hasTransportAux && (
              <div style={{ fontSize: '11px', color: '#006642', marginTop: '6px' }}>
                + Aux. Transporte (${AUX_TRANSPORTE.toLocaleString('es-CO')}) para Prima y Cesantías.
              </div>
            )}
          </div>

          {/* VACACIONES */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Días de Vacaciones Adeudados</label>
            <input type="number" value={vacationDaysOwed} onChange={(e) => setVacationDaysOwed(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 15" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ fontSize: '11px', color: 'var(--color-gray-800)', marginTop: '6px' }}>
              Días exactos que el empleado no disfrutó.
            </div>
          </div>

          {/* MOTIVO DE RETIRO */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Motivo de Terminación</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value as any)} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '15px', outline: 'none', background: 'var(--color-white)', cursor: 'pointer' }}
            >
              <option value="renuncia">Renuncia Voluntaria / Justa Causa</option>
              <option value="despido_injusto">Despido SIN Justa Causa</option>
            </select>
            {reason === 'despido_injusto' && (
              <div style={{ fontSize: '11px', color: 'var(--color-danger)', marginTop: '6px' }}>
                ⚠ Incluye indemnización penal (Art. 64 CST).
              </div>
            )}
          </div>

        </div>

        {/* PARTE INFERIOR: RESUMEN Y DESGLOSE */}
        {parsedSalary > 0 && totalDaysWorked > 0 && (
          <div>
            <hr style={{ border: 'none', borderTop: '1px dashed var(--color-gray-200)', margin: '0 0 32px 0' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              
              {/* COLUMNA DESGLOSE */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '16px' }}>Desglose de Liquidación</h3>
                
                {/* Prestaciones Sociales */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Prestaciones Proporcionales</div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span style={{color: 'var(--color-gray-500)'}}>Cesantías ({cesantiasDays} días)</span>
                    <span style={{fontWeight: 500}}>{formatCurrency(cesantias)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span style={{color: 'var(--color-gray-500)'}}>Int. Cesantías</span>
                    <span style={{fontWeight: 500}}>{formatCurrency(intCesantias)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span style={{color: 'var(--color-gray-500)'}}>Prima ({primaDays} días)</span>
                    <span style={{fontWeight: 500}}>{formatCurrency(prima)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span style={{color: 'var(--color-gray-500)'}}>Vacaciones ({parsedVacations} días)</span>
                    <span style={{fontWeight: 500}}>{formatCurrency(vacaciones)}</span>
                  </div>
                </div>

                {/* Indemnización */}
                {indemnizacion > 0 && (
                  <div style={{ marginBottom: '16px', padding: '12px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #fed7d7' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#c53030', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Indemnización (Art 64)</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{color: '#c53030'}}>Despido Injustificado</span>
                      <span style={{fontWeight: 700, color: '#c53030'}}>{formatCurrency(indemnizacion)}</span>
                    </div>
                  </div>
                )}

              </div>

              {/* COLUMNA TOTALES DESTACADOS */}
              <div style={{ background: 'var(--color-gray-50)', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-gray-100)', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                
                {/* COSTO TOTAL */}
                <div style={{ background: 'var(--color-dark)', padding: '24px', borderRadius: '12px', color: 'var(--color-white)', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '14px', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Total a Pagar</div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-white)', lineHeight: '1.2' }}>{formatCurrency(grandTotal)}</div>
                  <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '12px', opacity: 0.8 }}>
                    Sujeto a retenciones en la fuente aplicables (si supera topes).
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
