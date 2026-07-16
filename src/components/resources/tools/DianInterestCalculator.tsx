import React, { useState } from 'react';

// Referencia EA 2026 (Proyectada: Tasa Usura - 2 puntos porcentuales)
const TASA_DIAN_EA = 0.28; 

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function DianInterestCalculator() {
  const [capital, setCapital] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [payDate, setPayDate] = useState<string>('');

  const dDue = dueDate ? new Date(dueDate + 'T00:00:00') : null;
  const dPay = payDate ? new Date(payDate + 'T00:00:00') : null;

  let daysOfDelay = 0;
  if (dDue && dPay && dPay > dDue) {
    const diffTime = dPay.getTime() - dDue.getTime();
    daysOfDelay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  const parsedCapital = typeof capital === 'number' ? capital : 0;
  let interestAmount = 0;
  
  if (parsedCapital > 0 && daysOfDelay > 0) {
    // Fórmula DIAN de interés compuesto diario
    const factor = Math.pow((1 + TASA_DIAN_EA), (daysOfDelay / 365));
    interestAmount = Math.round(parsedCapital * (factor - 1));
  }

  const totalToPay = parsedCapital + interestAmount;

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCapital(val === '' ? '' : Number(val));
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      <div style={{ background: '#0056ff', color: 'var(--color-white)', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-white)' }}>Calculadora de Intereses Moratorios DIAN</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', color: '#eef2ff' }}>Calcula la deuda real con actualización diaria (Tasa Ref: {(TASA_DIAN_EA * 100).toFixed(1)}% E.A.)</p>
        </div>
      </div>

      <div style={{ background: 'var(--color-white)', padding: '32px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        
        <div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Impuesto a Cargo (Capital Adeudado)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-500)' }}>$</span>
              <input type="text" value={parsedCapital > 0 ? parsedCapital.toLocaleString('es-CO') : ''} onChange={handleNumChange} placeholder="5.000.000" style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Fecha de Vencimiento</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-dark)' }}>Fecha de Pago (Hoy)</label>
              <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }} />
            </div>
          </div>
          
          {daysOfDelay > 0 && (
            <div style={{ fontSize: '13px', color: 'var(--color-danger)', background: '#fff5f5', padding: '12px', borderRadius: '8px', border: '1px solid #fed7d7' }}>
              ⚠ Tienes un retraso de <strong>{daysOfDelay} días calendario</strong> frente a la DIAN. El interés compuesto cuenta fines de semana y festivos.
            </div>
          )}
        </div>

        <div style={{ background: 'var(--color-gray-50)', borderRadius: '16px', padding: '32px', border: '1px solid var(--color-gray-100)', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
             <span style={{color: 'var(--color-gray-800)'}}>Capital Inicial:</span>
             <span style={{fontWeight: 600}}>{formatCurrency(parsedCapital)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#c53030' }}>
             <span style={{color: '#c53030'}}>Intereses de Mora:</span>
             <span style={{fontWeight: 600}}>+ {formatCurrency(interestAmount)}</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px dashed var(--color-gray-300)', margin: '8px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-gray-800)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Total a Pagar a la DIAN</div>
            <div style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-dark)', lineHeight: '1.1' }}>{formatCurrency(totalToPay)}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
