import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrateHome() {
  console.log('Migrando HomePage...');
  
  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Página de Inicio',
    seo: {
      metaTitle: 'Kontrolo | PMS, ERP y POS en la nube para Colombia',
      metaDescription: 'Centraliza tu negocio con Kontrolo: suite en la nube de PMS, ERP y POS. Gestiona reservas, ventas, inventarios y contabilidad con DIAN, pagos e informes en tiempo real.'
    },
    hero: {
      headline: 'Software PMS, ERP y POS en la nube para tu negocio en Colombia',
      subheadline: 'Reservas, ventas, inventario, contabilidad y facturación electrónica DIAN: todo tu negocio bajo Kontrolo. Para hoteles, restaurantes y comercios que quieren crecer sin enredos.',
      primaryButtonText: 'Prueba gratis 15 días',
      secondaryButtonText: 'Agendar una demo'
    },
    trustedBy: 'Más de 1 000 negocios en Colombia usan Kontrolo',
    problems: {
      title: '¿Tu negocio funciona con 5 sistemas que no se hablan entre sí?',
      description: 'Excel para el inventario, un facturador aparte, las reservas en un cuaderno, la nómina donde el contador y las ventas en la memoria del cajero. Así se ve el caos que Kontrolo elimina:',
      bottomText: 'Nada de esto es culpa tuya. Es culpa de tener herramientas desconectadas.',
      problemCards: [
        { _key: '1', icon: '🧾', title: 'Miedo a la DIAN', description: 'Multas de hasta 1.5 UVT por factura electrónica no reportada a tiempo.' },
        { _key: '2', icon: '⏰', title: 'Horas perdidas', description: 'Digitar dos veces lo mismo en sistemas distintos te roba hasta 12 horas semanales.' },
        { _key: '3', icon: '📦', title: 'Inventario fantasma', description: 'Vendes lo que ya no tienes y compras lo que no rota porque los datos no cuadran.' },
        { _key: '4', icon: '🛏️', title: 'Sobreventas de habitaciones', description: 'Dos huéspedes en la misma habitación: la reseña de 1 estrella ya está escrita.' },
        { _key: '5', icon: '📊', title: 'Ceguera gerencial', description: 'Te enteras de cuánto ganaste (o perdiste) un mes después, cuando ya es tarde.' },
        { _key: '6', icon: '💸', title: 'Costos ocultos', description: 'Cada sistema suelto es otra licencia, otro soporte y otro margen de error.' }
      ]
    },
    benefits: {
      caption: 'Resultados reales: automatización, control y crecimiento',
      title: 'Beneficios que transforman la gestión de tu negocio',
      description: 'Kontrolo es la suite de software en la nube para hoteles, restaurantes y empresas en Colombia que centraliza tus operaciones, automatiza procesos y potencia la rentabilidad.'
    },
    cta: {
      caption: 'COMIENZA HOY',
      title: 'Deja de perder dinero y tiempo con sistemas que no se hablan',
      description: 'Únete a más de 500 empresas en Colombia que ya facturan, controlan y crecen con Kontrolo.',
      socialProof: '★★★★★ 4.9/5 en Capterra y G2'
    }
  };
  
  await client.createOrReplace(doc);
  console.log('HomePage migrada con éxito.');
}

async function migrateSolutionPages() {
  console.log('Migrando SolutionPages...');
  
  // ERP
  const erpDoc = {
    _id: 'solutionPage-erp',
    _type: 'solutionPage',
    title: 'Software ERP',
    slug: { _type: 'slug', current: 'software-erp' },
    seo: {
      metaTitle: 'Software ERP en la nube para empresas en Colombia | Kontrolo',
      metaDescription: 'Software ERP en la nube con facturación electrónica DIAN. Kontrolo organiza contabilidad, inventarios, compras y ventas en una sola plataforma.'
    },
    hero: {
      label: 'SOFTWARE ERP',
      headline: 'El ERP en la Nube Ideal para Crecer sin Límites',
      subheadline: 'Organiza toda tu empresa. Desde contabilidad y facturación DIAN, hasta compras, ventas y conciliación bancaria en tiempo real.',
      primaryButtonText: 'Conoce Nuestro ERP',
      primaryButtonLink: '/contacto'
    },
    overview: {
      caption: 'POTENCIA Y CONTROL',
      title: 'Control absoluto de tu negocio en tiempo real',
      description: 'Optimiza tus recursos y simplifica procesos complejos. Toma el control de cada aspecto financiero, operativo y comercial desde un solo lugar.',
      cards: []
    },
    features: {
      caption: 'FUNCIONALIDADES DESTACADAS',
      title: 'Descubre las potentes funciones del software ERP en la nube Kontrolo',
      description: 'Kontrolo ERP unifica contabilidad, ventas, compras, inventarios, nómina y facturación DIAN en una sola plataforma. Optimiza la gestión, reduce tareas manuales y facilita decisiones con datos actualizados en tiempo real.',
      cards: [
        { _key: '1', icon: '🧾', title: 'Automatización contable avanzada', description: 'Ahorra horas de trabajo con asientos automáticos, cierre contable guiado y control tributario integrado. Kontrolo actualiza balances, estados financieros y retenciones de forma inmediata, reduciendo errores humanos.' },
        { _key: '2', icon: '🛒', title: 'Compras inteligentes y control de proveedores', description: 'Registra y aprueba órdenes de compra desde cualquier dispositivo. Evalúa proveedores, compara precios y recibe alertas automáticas cuando el inventario alcanza su nivel mínimo.' },
        { _key: '3', icon: '💼', title: 'Ventas y gestión comercial conectada', description: 'Convierte cotizaciones en facturas con un clic, controla descuentos, márgenes y cuentas por cobrar. Integra tu CRM y punto de venta (POS) para tener una visión completa de tus ventas y clientes en tiempo real.' },
        { _key: '4', icon: '💰', title: 'Tesorería y conciliación automática', description: 'Sincroniza tus bancos para realizar conciliaciones automáticas y proyecciones de flujo de caja. Supervisa pagos, anticipos y gastos con alertas en tiempo real y niveles de aprobación personalizados.' },
        { _key: '5', icon: '📦', title: 'Gestión de inventarios y trazabilidad completa', description: 'Administra existencias por bodega, lote o número de serie. Rastrea movimientos de entrada y salida, controla costos promedio y genera reportes de rotación e inventario valorizado.' },
        { _key: '6', icon: '📊', title: 'Reportes gerenciales y análisis estratégico', description: 'Visualiza métricas financieras, operativas y de rentabilidad en dashboards configurables por usuario. Analiza desempeño por sede, área o producto y anticipa decisiones clave para mejorar la rentabilidad.' }
      ]
    },
    integrations: {
      caption: 'INTEGRACIONES ERP',
      title: 'Integraciones contables sin fricción con tu software ERP',
      description: 'Kontrolo ERP se conecta con sistemas contables, bancos, DIAN, plataformas de pago, e-commerce y nómina para sincronizar transacciones, facturas e inventarios en tiempo real, sin procesos manuales ni integraciones complejas.',
      cards: []
    },
    cta: {
      caption: 'COMIENZA HOY',
      title: 'Activa Kontrolo y centraliza tu operación en la nube',
      description: 'Transforma tu negocio con Kontrolo, la suite de gestión empresarial que integra PMS, ERP y POS con facturación electrónica DIAN, pagos y CRM. Automatiza procesos, reduce errores y toma decisiones con datos en tiempo real.',
      buttonText: 'Solicitar demo gratuita',
      buttonLink: '/contacto'
    }
  };
  
  // POS
  const posDoc = {
    _id: 'solutionPage-pos',
    _type: 'solutionPage',
    title: 'Sistema POS',
    slug: { _type: 'slug', current: 'software-pos' },
    seo: {
      metaTitle: 'Sistema POS con facturación electrónica DIAN | Kontrolo',
      metaDescription: 'Software de punto de venta (POS) en la nube para Colombia. Kontrolo es fácil, rápido y cumple con la facturación electrónica de la DIAN sin complicaciones.'
    },
    hero: {
      label: 'SISTEMA POS',
      headline: 'Vende más rápido y cumple con la DIAN al instante',
      subheadline: 'Sistema de Punto de Venta (POS) rápido, intuitivo y con facturación electrónica integrada. Perfecto para restaurantes, tiendas y puntos físicos.',
      primaryButtonText: 'Ver Sistema POS',
      primaryButtonLink: '/contacto'
    },
    overview: {
      caption: 'AGILIDAD EN EL MOSTRADOR',
      title: 'Vende más, espera menos',
      description: 'Transforma la experiencia en tu punto de venta. Agiliza cobros, controla inventarios al instante y mantén a tus clientes felices con un servicio rápido y sin errores.',
      cards: []
    },
    features: {
      caption: 'FUNCIONALIDADES DESTACADAS',
      title: 'Descubre las potentes funciones del software POS en la nube Kontrolo',
      description: 'Kontrolo POS conecta ventas, inventarios, clientes y métodos de pago en una sola plataforma. Optimiza la operación de tu negocio, controla tus puntos de venta en tiempo real y mejora la experiencia de tus clientes con un sistema rápido, seguro y totalmente en la nube.',
      cards: [
        { _key: '1', icon: '🛒', title: 'Ventas rápidas y sin errores', description: 'Registra ventas en segundos con interfaz intuitiva y tickets automáticos. Aplica descuentos, combos o precios especiales sin depender del área administrativa. Kontrolo POS reduce los errores humanos y acelera el servicio en mostrador o mesa.' },
        { _key: '2', icon: '📄', title: 'Facturación electrónica DIAN integrada', description: 'Cumple con la normativa vigente sin salir del POS. Genera facturas electrónicas y notas crédito en segundos, conectadas directamente con la DIAN. Evita reprocesos y garantiza trazabilidad fiscal total.' },
        { _key: '3', icon: '📦', title: 'Gestión de inventario por sucursal', description: 'Actualiza existencias automáticamente cada vez que realizas una venta. Consulta el stock en todas tus sedes y recibe alertas de productos con bajo inventario.' },
        { _key: '4', icon: '🤝', title: 'CRM y fidelización de clientes', description: 'Registra clientes frecuentes, aplica programas de puntos y consulta historial de compras. Aumenta la recompra y crea promociones personalizadas para cada tipo de cliente.' },
        { _key: '5', icon: '💳', title: 'Pagos integrados y conciliación automática', description: 'Integra Wompi, PayU o Bancolombia para recibir pagos por tarjeta, PSE o QR. Las transacciones se registran automáticamente en tu sistema contable o ERP Kontrolo.' },
        { _key: '6', icon: '📊', title: 'Reportes inteligentes y control en tiempo real', description: 'Accede a paneles con métricas de ventas, márgenes, turnos y rentabilidad por producto o empleado. Toma decisiones rápidas con reportes actualizados desde cualquier dispositivo.' }
      ]
    },
    integrations: {
      caption: 'INTEGRACIONES POS',
      title: 'Integraciones contables sin fricción con tu software POS',
      description: 'Las integraciones de Kontrolo POS enlazan tu caja con contabilidad, bancos, DIAN, pasarelas de pago, e-commerce y nómina, para que cada venta actualice automáticamente facturas, cierres de caja e inventarios.',
      cards: []
    },
    cta: {
      caption: 'COMIENZA HOY',
      title: 'Activa Kontrolo y centraliza tu operación en la nube',
      description: 'Transforma tu negocio con Kontrolo, la suite de gestión empresarial que integra PMS, ERP y POS con facturación electrónica DIAN, pagos y CRM. Automatiza procesos, reduce errores y toma decisiones con datos en tiempo real.',
      buttonText: 'Solicitar demo gratuita',
      buttonLink: '/contacto'
    }
  };

  // PMS
  const pmsDoc = {
    _id: 'solutionPage-pms',
    _type: 'solutionPage',
    title: 'Software PMS para Hoteles',
    slug: { _type: 'slug', current: 'software-pms-para-hoteles' },
    seo: {
      metaTitle: 'Software PMS para hoteles en Colombia | Kontrolo',
      metaDescription: 'Software PMS para hoteles en Colombia: Kontrolo centraliza reservas, limpieza de habitaciones, check-in/out e inventario, con facturación electrónica DIAN y reportes en tiempo real.'
    },
    hero: {
      label: 'SOLUCIÓN TODO EN UNO PARA HOTELES',
      headline: 'Software PMS para hoteles y hostales en Colombia',
      subheadline: 'Centraliza reservas, limpieza de habitaciones, facturación electrónica DIAN y reportes en tiempo real desde una sola plataforma en la nube. Evita sobreventas, mejora la experiencia de tus huéspedes y toma decisiones con datos precisos y actualizados.',
      primaryButtonText: 'Comenzar Prueba Gratis',
      primaryButtonLink: '/contacto'
    },
    overview: {
      caption: 'BENEFICIOS CLAVE',
      title: 'Eleva la gestión de tu hotel al siguiente nivel',
      description: 'Simplifica tu operación diaria, reduce la carga administrativa y mejora la experiencia de tus huéspedes con un sistema diseñado para hacerte la vida más fácil.',
      cards: []
    },
    features: {
      caption: 'FUNCIONALIDADES DESTACADAS',
      title: 'Descubre las potentes funciones del software PMS para hoteles Kontrolo',
      description: 'Kontrolo reúne todas las herramientas necesarias para digitalizar la gestión hotelera, optimizar tu operación y ofrecer una experiencia de huésped impecable.',
      cards: [
        { _key: '1', icon: '📅', title: 'Gestión integral de reservas', description: 'Administra tus reservas y disponibilidad en tiempo real, evitando sobreventas. Integra canales como Booking, Expedia o Airbnb y sincroniza todo el inventario.' },
        { _key: '2', icon: '📱', title: 'Check-in y check-out digital', description: 'Agiliza el registro y salida de huéspedes con formularios digitales y llaves electrónicas. Automatiza cobros y ofrece una experiencia moderna.' },
        { _key: '3', icon: '📊', title: 'Reportes y análisis en tiempo real', description: 'Genera reportes automáticos sobre ocupación, ingresos y gastos. Visualiza indicadores clave y toma decisiones con datos actualizados en segundos.' },
        { _key: '4', icon: '🧹', title: 'Control de limpieza y mantenimiento de habitaciones', description: 'Coordina tareas de limpieza y mantenimiento desde cualquier dispositivo. Reduce tiempos muertos y mejora la comunicación entre equipos.' },
        { _key: '5', icon: '📄', title: 'Facturación electrónica DIAN integrada', description: 'Cumple con la normativa DIAN y automatiza la facturación para hoteles y hostales. Evita errores y genera comprobantes fiscales en segundos.' },
        { _key: '6', icon: '🔗', title: 'Integración total con sistemas externos', description: 'Conecta Kontrolo con CRM, ERP, POS y Channel Manager. Centraliza información, reduce errores y mejora la productividad general del hotel.' }
      ]
    },
    integrations: {
      caption: 'INTEGRACIONES PMS',
      title: 'Integraciones sin fricción con tu software hotelero',
      description: 'Kontrolo PMS se conecta con channel manager, motor de reservas, DIAN, pasarelas de pago y CRM para sincronizar disponibilidad, tarifas y facturación electrónica en tiempo real, sin migraciones complejas.',
      cards: []
    },
    cta: {
      caption: 'COMIENZA HOY',
      title: 'Activa Kontrolo y centraliza tu operación en la nube',
      description: 'Transforma tu negocio con Kontrolo, la suite de gestión empresarial que integra PMS, ERP y POS con facturación electrónica DIAN, pagos y CRM. Automatiza procesos, reduce errores y toma decisiones con datos en tiempo real.',
      buttonText: 'Solicitar demo gratuita',
      buttonLink: '/contacto'
    }
  };

  await client.createOrReplace(erpDoc);
  await client.createOrReplace(posDoc);
  await client.createOrReplace(pmsDoc);
  
  console.log('SolutionPages migradas con éxito.');
}

async function migrateResources() {
  console.log('Migrando Recursos...');
  const resources = [
    {
      _type: 'resource',
      title: 'Calculadora de UVT 2026',
      slug: { _type: 'slug', current: 'calculadora-uvt-2026' },
      description: 'Calcula el valor en UVT a pesos colombianos y viceversa con nuestra herramienta gratuita actualizada para 2026.',
      resourceType: 'calculator',
      toolId: 'uvt-calculator',
      category: 'Calculadoras Financieras',
      featured: true,
      faqs: [
        { _key: '1', _type: 'faq', question: '¿Qué es la UVT?', answer: [{ _type: 'block', children: [{ _type: 'span', text: 'La Unidad de Valor Tributario (UVT) es la medida de valor que permite ajustar los valores contenidos en las disposiciones relativas a los impuestos y obligaciones administrados por la DIAN.' }] }] },
        { _key: '2', _type: 'faq', question: '¿Cuál es el valor de la UVT en 2026?', answer: [{ _type: 'block', children: [{ _type: 'span', text: 'El valor de la UVT se actualiza anualmente por la DIAN.' }] }] }
      ]
    },
    {
      _type: 'resource',
      title: 'Costo Real de un Empleado',
      slug: { _type: 'slug', current: 'calculadora-costo-empleado-2026' },
      description: 'Descubre cuánto te cuesta realmente un empleado en Colombia incluyendo prestaciones sociales, seguridad social y aportes.',
      resourceType: 'calculator',
      toolId: 'employee-cost',
      category: 'Recursos Humanos',
      featured: true,
      faqs: [
        { _key: '1', _type: 'faq', question: '¿Qué incluye el costo de un empleado?', answer: [{ _type: 'block', children: [{ _type: 'span', text: 'Incluye el salario base, prestaciones sociales (cesantías, prima, vacaciones), aportes a seguridad social (salud, pensión, ARL) y aportes parafiscales.' }] }] }
      ]
    },
    {
      _type: 'resource',
      title: 'Simulador de Liquidación Laboral',
      slug: { _type: 'slug', current: 'simulador-liquidacion-laboral' },
      description: 'Calcula fácilmente el valor de la liquidación de un contrato de trabajo según la normativa laboral colombiana vigente.',
      resourceType: 'calculator',
      toolId: 'liquidation-calculator',
      category: 'Recursos Humanos',
      featured: false,
      faqs: []
    },
    {
      _type: 'resource',
      title: 'Calculadora de Intereses de Mora DIAN',
      slug: { _type: 'slug', current: 'calculadora-intereses-dian' },
      description: 'Calcula los intereses moratorios por pagos extemporáneos de impuestos según la tasa de usura vigente certificada.',
      resourceType: 'calculator',
      toolId: 'dian-interest',
      category: 'Impuestos',
      featured: false,
      faqs: []
    },
    {
      _type: 'resource',
      title: 'Generador de Contratos Laborales',
      slug: { _type: 'slug', current: 'generador-contratos-laborales' },
      description: 'Genera contratos laborales (término fijo, indefinido, obra o labor) adaptados a la ley colombiana con nuestra IA.',
      resourceType: 'ai-tool',
      toolId: 'contract-generator',
      category: 'Legal y RRHH',
      featured: false,
      faqs: []
    },
    {
      _type: 'resource',
      title: 'Buscador de Códigos CIIU',
      slug: { _type: 'slug', current: 'buscador-codigos-ciiu' },
      description: 'Encuentra rápidamente el código CIIU de tu actividad económica para el RUT y registro en Cámara de Comercio.',
      resourceType: 'calculator',
      toolId: 'ciiu-search',
      category: 'Herramientas',
      featured: false,
      faqs: []
    }
  ];

  for (const res of resources) {
    // Generate a determinist ID based on slug
    res._id = 'resource-' + res.slug.current;
    await client.createOrReplace(res);
  }
  console.log('Recursos migrados con éxito.');
}

async function migrateNiches() {
  console.log('Migrando Nichos...');
  
  const niches = await client.fetch("*[_type == 'niche']");
  console.log(`Encontrados ${niches.length} nichos para actualizar.`);

  const updates = {
    'hoteles-boutique': {
      painPoints: [
        { _key: '1', title: 'Dependencia de OTAs', description: 'Dependencia excesiva de Booking o Expedia y pérdida de ingresos por altas comisiones.', icon: '📉' },
        { _key: '2', title: 'Recepción desorganizada', description: 'Tiempos de espera largos durante los check-ins y check-outs.', icon: '🕰️' },
        { _key: '3', title: 'Facturación manual', description: 'Errores en los cuadres de caja diarios y falta de reportes claros.', icon: '🧾' }
      ],
      features: [
        { _key: '1', title: 'Motor de Reservas Directas', description: 'Kontrolo te proporciona un motor de reservas optimizado para tu página web, permitiendo que tus huéspedes reserven directamente con confirmación instantánea.' },
        { _key: '2', title: 'Control Total del Front-Desk', description: 'Visualiza en tiempo real el estado de cada habitación y coordina a tu personal de limpieza desde un solo panel.' },
        { _key: '3', title: 'Facturación Electrónica Automática', description: 'Cada vez que un huésped realiza su check-out, Kontrolo genera la factura electrónica y actualiza tu contabilidad al instante.' }
      ],
      faqs: [
        { _key: '1', question: '¿Puedo sincronizar las reservas de Booking y Airbnb?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, Kontrolo cuenta con un Channel Manager integrado.'}]}] },
        { _key: '2', question: '¿Mis huéspedes pueden pagar consumos en su cuenta?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, puedes unificar consumos de restaurante o spa en la misma cuenta.'}]}] },
        { _key: '3', question: '¿Es difícil capacitar a mis recepcionistas?', answer: [{_type: 'block', children: [{_type: 'span', text: 'No, la interfaz es muy intuitiva y se aprende en un par de horas.'}]}] }
      ]
    },
    'glamping': {
      painPoints: [
        { _key: '1', title: 'Dobles reservas', description: 'Overbooking en temporada alta por falta de calendario sincronizado.', icon: '📅' },
        { _key: '2', title: 'Venta de paquetes', description: 'Dificultad para incluir paquetes adicionales (cenas, fogatas).', icon: '⛺' },
        { _key: '3', title: 'Inventario local', description: 'Falta de control en inventario de leña y snacks que genera pérdidas.', icon: '📦' }
      ],
      features: [
        { _key: '1', title: 'Gestión de Experiencias', description: 'Agrega fácilmente paquetes románticos, fogatas o tours como addons durante la reserva.' },
        { _key: '2', title: 'Calendario Visual', description: 'Administra tus domos desde un calendario interactivo fácil de leer y sincronizado.' },
        { _key: '3', title: 'Facturación Electrónica DIAN', description: 'Automatiza el cobro y la factura electrónica exigida por la DIAN sin cálculos manuales.' }
      ],
      faqs: [
        { _key: '1', question: '¿Funciona con internet inestable?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, tiene funciones optimizadas y modo contingente para consumos.'}]}] },
        { _key: '2', question: '¿Avisa si se agota la leña?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, puedes configurar alertas de stock mínimo para tus insumos.'}]}] },
        { _key: '3', question: '¿Puedo exigir anticipos?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Totalmente. Puedes cobrar porcentajes de anticipo con pasarelas de pago.'}]}] }
      ]
    },
    'hostales': {
      painPoints: [
        { _key: '1', title: 'Cobros enredados', description: 'Dificultad al dividir consumos o cobrar por cama separada.', icon: '💸' },
        { _key: '2', title: 'Pérdida de ganancias', description: 'Falta de control preciso de inventario en el bar o recepción.', icon: '🍻' },
        { _key: '3', title: 'Cambios de camas', description: 'Recepcionistas abrumados organizando los cambios manualmente.', icon: '🛏️' }
      ],
      features: [
        { _key: '1', title: 'Venta de Camas', description: 'Gestiona reservas por camas en dormitorios compartidos y maximiza tu ocupación.' },
        { _key: '2', title: 'POS para Bar Integrado', description: 'Vende bebidas y snacks rápidamente y cárgalo a la cama del huésped.' },
        { _key: '3', title: 'Cierres de Caja Precisos', description: 'Al final del turno, Kontrolo cuadra el efectivo, tarjetas y emite factura electrónica.' }
      ],
      faqs: [
        { _key: '1', question: '¿Puedo cobrar en otras monedas?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, cuenta con módulo multimoneda y cálculo de tasa de cambio.'}]}] },
        { _key: '2', question: '¿Es fácil cambiar a un huésped de cama?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Es tan simple como arrastrar y soltar la reserva en el calendario.'}]}] },
        { _key: '3', question: '¿Controla inventario del bar?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Por supuesto, se descuentan los ingredientes al registrar la venta.'}]}] }
      ]
    },
    'restaurantes-y-bares': {
      painPoints: [
        { _key: '1', title: 'Pedidos en libreta', description: 'Retrasos y errores de comunicación con cocina.', icon: '📝' },
        { _key: '2', title: 'Falta de control de recetas', description: 'Generando desperdicio y mermas en los ingredientes.', icon: '🥩' },
        { _key: '3', title: 'Lentitud en caja', description: 'Procesos lentos para facturar o dividir cuentas.', icon: '⏳' }
      ],
      features: [
        { _key: '1', title: 'POS Táctil Ultrarrápido', description: 'Toma pedidos desde una tablet y envíalos directo a pantallas KDS en cocina.' },
        { _key: '2', title: 'Control de Recetas (Escandallos)', description: 'Conoce el costo exacto. Al vender un plato, descuenta los ingredientes automáticamente.' },
        { _key: '3', title: 'Facturación DIAN y Propinas', description: 'Maneja correctamente Impoconsumo, IVA y propinas con un solo clic.' }
      ],
      faqs: [
        { _key: '1', question: '¿Se puede dividir la cuenta?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, en partes iguales o por producto, aceptando pagos mixtos.'}]}] },
        { _key: '2', question: '¿Funciona para múltiples sucursales?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Totalmente, centraliza la información de todas tus sedes en tiempo real.'}]}] },
        { _key: '3', question: '¿Qué pasa si se cae el internet?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Cuenta con modo offline. Luego se sincroniza al recuperar la conexión.'}]}] }
      ]
    },
    'ferreterias': {
      painPoints: [
        { _key: '1', title: 'Miles de productos', description: 'Precios desactualizados y desorden en el inventario.', icon: '🔧' },
        { _key: '2', title: 'Filas largas', description: 'Clientes molestos por lentitud al buscar productos.', icon: '🛒' },
        { _key: '3', title: 'Créditos informales', description: 'Cartera perdida y difícil de cobrar a los clientes.', icon: '💳' }
      ],
      features: [
        { _key: '1', title: 'Inventario Inteligente', description: 'Actualiza precios masivamente en segundos y recibe alertas de stock crítico.' },
        { _key: '2', title: 'POS y Cotizaciones', description: 'Genera cotizaciones en PDF, envíalas por WhatsApp y conviértelas en factura.' },
        { _key: '3', title: 'Cuentas por Cobrar', description: 'Administra créditos, programa fechas de pago y envía recordatorios automáticos.' }
      ],
      faqs: [
        { _key: '1', question: '¿Puedo vender productos fraccionados?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, soporta medidas como metros, kilos o litros.'}]}] },
        { _key: '2', question: '¿Tengo que subir mis productos uno a uno?', answer: [{_type: 'block', children: [{_type: 'span', text: 'No, puedes importar toda tu lista desde un archivo Excel.'}]}] },
        { _key: '3', question: '¿Maneja precios mayoristas?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, configura múltiples listas de precios por tipo de cliente.'}]}] }
      ]
    },
    'minimarkets-y-supermercados': {
      painPoints: [
        { _key: '1', title: 'Cajas desajustadas', description: 'Dinero desaparecido al finalizar el turno.', icon: '💵' },
        { _key: '2', title: 'Productos vencidos', description: 'Falta de reportes de fechas de expiración.', icon: '🗑️' },
        { _key: '3', title: 'Lentitud en caja', description: 'Filas interminables que espantan a los clientes.', icon: '🚶' }
      ],
      features: [
        { _key: '1', title: 'Ventas con Código de Barras', description: 'Escanea productos a toda velocidad y conéctate con balanzas digitales.' },
        { _key: '2', title: 'Alertas de Vencimiento', description: 'Gestiona fechas de expiración y reportes de alta rotación.' },
        { _key: '3', title: 'Cuadre de Caja Perfecto', description: 'Cierre Z con detalle exacto en efectivo, tarjetas y Nequi.' }
      ],
      faqs: [
        { _key: '1', question: '¿Se conecta con periféricos?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Sí, con lectores de barras, cajones monederos y balanzas.'}]}] },
        { _key: '2', question: '¿Controla turnos de cajeros?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Cada cajero tiene su PIN para total transparencia en el cuadre.'}]}] },
        { _key: '3', question: '¿Cómo actualizo los precios?', answer: [{_type: 'block', children: [{_type: 'span', text: 'Con herramientas de actualización masiva vía Excel o porcentaje.'}]}] }
      ]
    }
  };

  for (const niche of niches) {
    const slug = niche.slug?.current;
    if (slug && updates[slug]) {
      await client
        .patch(niche._id)
        .set({
          painPoints: updates[slug].painPoints,
          features: updates[slug].features,
          faqs: updates[slug].faqs,
        })
        .commit();
      console.log(`Nicho '${slug}' actualizado.`);
    }
  }
}

async function runMigration() {
  try {
    await migrateHome();
    await migrateSolutionPages();
    await migrateResources();
    await migrateNiches();
    console.log('¡Toda la migración ha finalizado exitosamente!');
  } catch (error) {
    console.error('Error durante la migración:', error);
  }
}

runMigration();
