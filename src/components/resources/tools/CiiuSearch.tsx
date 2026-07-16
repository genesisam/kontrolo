import React, { useState } from 'react';

// Mock DB of 30 common CIIU Codes for demo purposes
const CIIU_DATABASE = [
  { code: '5611', name: 'Expendio a la mesa de comidas preparadas (Restaurantes)', category: 'Gastronomía' },
  { code: '5613', name: 'Expendio de comidas preparadas en cafeterías', category: 'Gastronomía' },
  { code: '5630', name: 'Expendio de bebidas alcohólicas para el consumo dentro del establecimiento', category: 'Gastronomía' },
  { code: '6201', name: 'Actividades de desarrollo de sistemas informáticos (Software)', category: 'Tecnología' },
  { code: '6202', name: 'Actividades de consultoría informática y actividades de administración de instalaciones informáticas', category: 'Tecnología' },
  { code: '6311', name: 'Procesamiento de datos, alojamiento (hosting) y actividades relacionadas', category: 'Tecnología' },
  { code: '4711', name: 'Comercio al por menor en establecimientos no especializados, con surtido compuesto principalmente por alimentos, bebidas o tabaco (Supermercados)', category: 'Comercio' },
  { code: '4771', name: 'Comercio al por menor de prendas de vestir y sus accesorios en establecimientos especializados', category: 'Comercio' },
  { code: '4520', name: 'Mantenimiento y reparación de vehículos automotores (Talleres)', category: 'Servicios' },
  { code: '6920', name: 'Actividades de contabilidad, teneduría de libros, auditoría financiera y asesoría tributaria', category: 'Profesional' },
  { code: '6910', name: 'Actividades jurídicas (Abogados)', category: 'Profesional' },
  { code: '8621', name: 'Actividades de la práctica médica, sin internación', category: 'Salud' },
  { code: '8622', name: 'Actividades de la práctica odontológica', category: 'Salud' },
  { code: '9602', name: 'Peluquería y otros tratamientos de belleza', category: 'Servicios' },
  { code: '7310', name: 'Publicidad', category: 'Profesional' },
  { code: '7110', name: 'Actividades de arquitectura e ingeniería y otras actividades conexas de consultoría técnica', category: 'Profesional' },
  { code: '4111', name: 'Construcción de edificios residenciales', category: 'Construcción' },
  { code: '4112', name: 'Construcción de edificios no residenciales', category: 'Construcción' },
  { code: '6820', name: 'Actividades inmobiliarias realizadas a cambio de una retribución o por contrata', category: 'Inmobiliaria' },
  { code: '8511', name: 'Educación de la primera infancia', category: 'Educación' },
  { code: '8521', name: 'Educación básica primaria', category: 'Educación' },
  { code: '4921', name: 'Transporte de pasajeros', category: 'Transporte' },
  { code: '4923', name: 'Transporte de carga por carretera', category: 'Transporte' },
  { code: '1410', name: 'Confección de prendas de vestir, excepto prendas de piel', category: 'Manufactura' },
  { code: '1081', name: 'Elaboración de productos de panadería', category: 'Manufactura' },
  { code: '0111', name: 'Cultivo de cereales, legumbres y semillas oleaginosas', category: 'Agricultura' },
  { code: '0141', name: 'Cría de ganado bovino y bufalino', category: 'Agricultura' },
  { code: '5511', name: 'Alojamiento en hoteles', category: 'Turismo' },
  { code: '7911', name: 'Actividades de las agencias de viaje', category: 'Turismo' },
  { code: '9321', name: 'Actividades de parques de atracciones y parques temáticos', category: 'Entretenimiento' }
];

export default function CiiuSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCodes = CIIU_DATABASE.filter(item => {
    const term = searchTerm.toLowerCase();
    return item.name.toLowerCase().includes(term) || 
           item.code.includes(term) || 
           item.category.toLowerCase().includes(term);
  });

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', fontFamily: '"General Sans", sans-serif' }}>
      
      <div style={{ background: '#006642', color: 'var(--color-white)', padding: '32px', borderRadius: '16px 16px 0 0', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 600, color: '#ffffff' }}>Buscador de Códigos CIIU</h4>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej. Restaurante, Software, Abogados..." 
            style={{ width: '100%', padding: '16px 20px', borderRadius: '100px', border: 'none', fontSize: '16px', outline: 'none', boxSizing: 'border-box', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
          />
        </div>
      </div>

      <div style={{ background: 'var(--color-white)', padding: '32px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minHeight: '400px' }}>
        
        {filteredCodes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-gray-500)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '16px' }}>No encontramos ningún código CIIU que coincida con tu búsqueda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredCodes.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px', border: '1px solid var(--color-gray-100)', borderRadius: '12px', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#006642'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-100)'}>
                <div style={{ background: '#eefcf5', color: '#006642', padding: '12px 20px', borderRadius: '8px', fontSize: '20px', fontWeight: 800, marginRight: '24px', minWidth: '100px', textAlign: 'center' }}>
                  {item.code}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--color-dark)' }}>{item.name}</h4>
                  <span style={{ fontSize: '12px', background: 'var(--color-gray-50)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-gray-800)' }}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: 'var(--color-gray-500)' }}>
          * Mostrando los {filteredCodes.length} códigos más buscados. Para consultar la lista completa (CIIU Rev. 4 A.C.), visita la página oficial de la Cámara de Comercio.
        </div>
      </div>
    </div>
  );
}
