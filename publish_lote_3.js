import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '41l0h6ji',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skxaZ8wXcyc5JTT3P5tj73gx8fEWp6qk5c05eEfMnzIO71hGaVvNHyh7pfWTMH5uneShi9fMck8L3ruaxtZbEwBpsXsUz09oM3QWu77lAsUDvlHj79BQDx7P7sZLukEKMSJ4mSQE9WQREEs6PTR9U52qPgoCASaUCgsyWjGuoaenezGRz7vX'
})

function mdToBlocks(md) {
    const blocks = [];
    const lines = md.split('\n');

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        if (line.startsWith('# ')) {
            blocks.push({ _type: 'block', style: 'h1', children: [{ _type: 'span', text: line.substring(2) }] });
        } else if (line.startsWith('## ')) {
            blocks.push({ _type: 'block', style: 'h2', children: [{ _type: 'span', text: line.substring(3) }] });
        } else if (line.startsWith('### ')) {
            blocks.push({ _type: 'block', style: 'h3', children: [{ _type: 'span', text: line.substring(4) }] });
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
            blocks.push({ _type: 'block', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', text: line.substring(2).replace(/\*\*/g, '') }] });
        } else if (line.match(/^\d+\.\s/)) {
            blocks.push({ _type: 'block', style: 'normal', listItem: 'number', level: 1, children: [{ _type: 'span', text: line.replace(/^\d+\.\s/, '').replace(/\*\*/g, '') }] });
        } else if (line.startsWith('> [')) {
            continue;
        } else {
            let cleanText = line.replace(/\*\*/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
            blocks.push({ _type: 'block', style: 'normal', children: [{ _type: 'span', text: cleanText }] });
        }
    }
    return blocks;
}

const posts = [
  {
    title: 'Qué es un PMS Hotelero y por qué es vital',
    slug: { _type: 'slug', current: 'que-es-pms-hotelero' },
    seoTitle: 'Qué es un Software PMS Hotelero y por qué necesitas uno | Kontrolo',
    seoDescription: 'Descubre qué es un Property Management System (PMS), cómo funciona y por qué es el cerebro de cualquier hotel moderno para controlar reservas y facturación.',
    excerpt: 'Si gestionas un hotel con Excel o agendas de papel, estás perdiendo reservas y dinero. Conoce qué es un PMS y cómo transforma la gestión hotelera.',
    bodyMd: `
# Qué es un PMS Hotelero y por qué es vital

Gestionar un hotel va mucho más allá de entregar llaves. Implica coordinar reservas telefónicas, disponibilidad en Booking.com, cobros de restaurante, facturación a agencias y el cronograma del equipo de limpieza. Intentar hacer todo esto en una hoja de Excel es la receta perfecta para el estrés y el temido "Overbooking" (sobreventa).

Aquí es donde entra el **PMS** (*Property Management System* o Sistema de Gestión de Propiedades).

## ¿Qué hace exactamente un PMS?

El PMS es el "cerebro" central de tu hotel. Es el software en la nube donde los recepcionistas pasan la mayor parte de su turno. Su función principal es unificar todas las operaciones del establecimiento en una sola pantalla visual, conocida como el *Front-Desk* o *Planning*.

Sus funciones clave incluyen:
1. **Gestión de Reservas:** Ver la disponibilidad de todas las habitaciones en un calendario visual.
2. **Check-in y Check-out:** Registrar huéspedes, escanear documentos y asignar llaves rápidamente.
3. **Cargos a la habitación (Folio):** Si un huésped cena en el restaurante del hotel, el PMS carga esa cuenta directamente a su habitación para que pague al final.
4. **Housekeeping (Limpieza):** Avisar a las camareras en tiempo real qué habitaciones están sucias, en limpieza o listas para entrega.

## Por qué es vital para el crecimiento

Sin un PMS, la comunicación entre la recepción, la cocina y la gerencia es un teléfono roto. Con un sistema como **Kontrolo PMS**, cuando el huésped pide una bebida en la piscina, el mesero usa el POS para cargarla a la habitación 204. Al día siguiente, en el check-out, el recepcionista simplemente hace un clic y el PMS suma el valor de la noche más la bebida, generando automáticamente la **Facturación Electrónica DIAN**.

Un PMS moderno no es un gasto, es tu mejor recepcionista trabajando 24/7 sin cometer errores.
    `
  },
  {
    title: 'Cómo automatizar el check-in y check-out en tu hotel',
    slug: { _type: 'slug', current: 'automatizar-checkin-checkout-hotel' },
    seoTitle: 'Cómo automatizar el Check-in y Check-out en tu Hotel | Kontrolo',
    seoDescription: 'Mejora la experiencia de tus huéspedes reduciendo las filas en recepción. Estrategias y software para automatizar el check-in y check-out hotelero.',
    excerpt: 'Las largas filas en recepción después de un vuelo agotador arruinan la experiencia del huésped. Aprende a agilizar este proceso con tecnología.',
    bodyMd: `
# Cómo automatizar el check-in y check-out en tu hotel

Pocas cosas generan tanta frustración en un huésped como llegar cansado después de un largo viaje y encontrarse con una fila de 30 minutos en la recepción de su hotel, solo para llenar un formulario en papel y entregar su tarjeta de crédito. La primera impresión es crucial, y un proceso lento puede garantizarte una mala reseña en TripAdvisor.

## El problema del Check-in Tradicional

El método clásico requiere que el recepcionista transcriba los datos del pasaporte o cédula al sistema, pida firmas en hojas de registro y pase manualmente la tarjeta por el datáfono. Es ineficiente y propenso a errores tipográficos.

## Pasos para la automatización

Para agilizar estos procesos, los hoteles más innovadores están implementando las siguientes estrategias apoyadas en su **Software PMS**:

1. **Pre-Check-in Digital (Web):**
   Días antes de la llegada, el PMS envía un correo o mensaje de WhatsApp al huésped con un enlace seguro. Desde su celular, el huésped llena sus datos, sube una foto de su pasaporte y acepta las políticas del hotel. Al llegar a la recepción, ¡el proceso toma 10 segundos!
   
2. **Kioscos de Auto-servicio:**
   Instalar tablets en el lobby donde los huéspedes pueden escanear su código QR de reserva, pagar el saldo pendiente y recibir su llave magnética, tal como en los aeropuertos.

3. **Check-out Express y Facturación Automática:**
   La mañana de la salida, el huésped recibe en su teléfono el estado de cuenta (noches + consumos del minibar o restaurante). Si todo está correcto, autoriza el cargo a la tarjeta que dejó en garantía. El sistema **Kontrolo PMS** procesa el pago y automáticamente envía la **Facturación Electrónica DIAN** a su correo. El huésped solo tiene que dejar la llave en un buzón y marcharse.

## El Impacto en tu equipo

Automatizar no significa despedir a tus recepcionistas. Significa liberarlos de tareas robóticas de digitación para que puedan convertirse en verdaderos "Anfitriones", enfocándose en saludar con una sonrisa, recomendar tours y hacer que la estadía sea memorable.

Un hotel sin filas es un hotel con huéspedes felices. Implementa Kontrolo PMS y transforma la primera y última impresión de tu negocio.
    `
  },
  {
    title: 'Channel Manager vs PMS: Entiende las diferencias',
    slug: { _type: 'slug', current: 'channel-manager-vs-pms' },
    seoTitle: 'Channel Manager vs PMS Hotelero: ¿Cuál es la diferencia? | Kontrolo',
    seoDescription: 'Entiende las diferencias entre un PMS y un Channel Manager, cómo se integran y por qué necesitas ambos para maximizar la ocupación de tu hotel.',
    excerpt: '¿Confundido con la jerga tecnológica hotelera? Te explicamos de forma sencilla qué hace el PMS, qué hace el Channel Manager y cómo trabajan juntos.',
    bodyMd: `
# Channel Manager vs PMS: Entiende las diferencias

Si acabas de entrar al mundo de la administración hotelera, es muy probable que te hayas topado con una sopa de letras tecnológica. Dos de los términos más comunes—y más confundidos—son **PMS** y **Channel Manager**. Aunque ambos son vitales para tu hotel, hacen cosas completamente distintas.

## ¿Qué es el PMS (Property Management System)?

Como explicamos en artículos anteriores, el PMS es tu sistema de gestión interna. Es el software que usa tu recepcionista para hacer el check-in, asignar las habitaciones (la 201, la 202), facturar a la DIAN, llevar la contabilidad y ver qué cuartos faltan por limpiar.
* **Resumen:** El PMS gestiona lo que pasa **ADENTRO** de tu hotel.

## ¿Qué es el Channel Manager (Gestor de Canales)?

Imagina que tienes 10 habitaciones disponibles. Publicas tu hotel en Booking.com, en Expedia, en Airbnb y en Despegar (estos se llaman canales u OTAs).
Si entra una reserva por Booking para la habitación 5, tienes que correr inmediatamente a Expedia y Airbnb a cerrar la disponibilidad para que no te la reserven dos veces (Overbooking). Si es de madrugada, probablemente no alcances a hacerlo.

El **Channel Manager** es un software que se conecta a todas estas plataformas web al mismo tiempo. Su único trabajo es mantener el inventario y las tarifas actualizadas en todas partes.
* **Resumen:** El Channel Manager gestiona lo que pasa **AFUERA** de tu hotel.

## Cómo trabajan juntos (La integración perfecta)

Un hotel moderno no elige entre uno u otro; necesita que ambos hablen el mismo idioma.
Funciona así:
1. Alguien reserva por Expedia a las 3:00 a.m.
2. Expedia le avisa al **Channel Manager**.
3. El Channel Manager cierra la venta en Booking, Airbnb y tu página web en 1 segundo.
4. Simultáneamente, el Channel Manager le envía los datos del huésped a tu **PMS (Kontrolo)**.
5. A la mañana siguiente, tu recepcionista abre el PMS y ve la nueva reserva ya asignada en el calendario, lista para el check-in.

No intentes gestionar tu hotel dividiendo tu tiempo en 5 páginas web diferentes. Busca un software integral como Kontrolo, que incluye PMS robusto y se integra sin problemas con los mejores Channel Managers del mercado.
    `
  },
  {
    title: 'Estrategias para aumentar las reservas directas sin Booking',
    slug: { _type: 'slug', current: 'aumentar-reservas-directas-hotel' },
    seoTitle: 'Estrategias para aumentar reservas directas de tu hotel | Kontrolo',
    seoDescription: 'Aprende cómo dejar de depender de las comisiones de Booking y Expedia. Estrategias de marketing y motores de reservas para vender directo en tu hotel.',
    excerpt: 'Pagar 15% o 20% de comisión a las plataformas de viaje devora tus ganancias. Aplica estas estrategias para que los huéspedes te reserven directamente.',
    bodyMd: `
# Estrategias para aumentar las reservas directas sin Booking

Booking.com, Expedia y Airbnb (las famosas OTAs) son excelentes vitrinas para dar a conocer tu hotel al mundo entero. Sin embargo, su servicio no es barato. Pagar entre un 15% y un 22% de comisión por cada reserva devora el margen de ganancia de cualquier negocio hotelero.

El Santo Grial de la hotelería moderna es lograr un balance: usar a las OTAs para atraer clientes nuevos, pero fidelizarlos para que sus futuras estadías sean **reservas directas**. Aquí te enseñamos cómo.

## 1. Ten un Motor de Reservas en tu propia página web

El peor error que puedes cometer es tener una página web hermosa, pero que obliga al cliente a llenar un formulario de "Contacto" o enviar un correo para saber si hay disponibilidad. ¡El cliente moderno quiere comprar de inmediato!
Necesitas instalar un **Motor de Reservas (Booking Engine)** en tu web. Es un software que se conecta a tu PMS (como Kontrolo) y le muestra al usuario la disponibilidad real y le permite pagar con tarjeta de crédito en ese mismo segundo.

## 2. Ofrece la "Garantía del Mejor Precio"

Muchos huéspedes encuentran tu hotel en Booking, pero luego buscan tu página web oficial para ver si es más barato. Si tu página web tiene el mismo precio (o peor, es más cara) que Booking, reservarán por Booking por conveniencia.
* **La estrategia:** Ofrece siempre un descuento del 5% o 10% en tu web directa. Prefieres perder un 5% ofreciéndole descuento al cliente, que perder un 18% pagándole la comisión a la plataforma.

## 3. Beneficios exclusivos por reservar directo

No siempre se trata de bajar el precio. A veces el valor agregado es más poderoso. En tu web y tus redes sociales, promociona mensajes como:
* *"Reserva en nuestra web oficial y obtén Late Check-out gratis hasta las 2:00 PM."*
* *"Desayuno premium incluido solo para reservas directas."*
* *"Bebida de cortesía al llegar si reservas en nuestro sitio."*

## 4. Captura los datos y haz Remarketing

Cuando un cliente reserva por una OTA, la plataforma "oculta" el correo electrónico real del cliente para que no puedas contactarlo directamente después.
Al momento del Check-in, pídele amablemente su email personal para enviarle la Factura Electrónica. Con esa base de datos, puedes enviarle campañas de Email Marketing meses después ofreciéndole un descuento especial si vuelve para sus próximas vacaciones, pero esta vez, reservando directo.

Empodera tu hotel con un **PMS robusto como Kontrolo**, integra un motor de reservas y comienza a recuperar el control de tus ganancias.
    `
  }
];

async function publishAll() {
  console.log("Iniciando inyección del Lote 3 (Clúster PMS)...");
  
  for (const post of posts) {
    const doc = {
      _type: 'post',
      title: post.title,
      slug: post.slug,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      excerpt: post.excerpt,
      body: mdToBlocks(post.bodyMd)
    };
    
    try {
      const res = await client.create(doc);
      console.log('✅ [' + post.slug.current + '] publicado exitosamente. ID: ' + res._id);
    } catch (err) {
      console.error('❌ Error en [' + post.slug.current + ']: ', err.message);
    }
  }
  
  console.log("Lote 3 inyectado en su totalidad. FIN DE LA ESTRATEGIA.");
}

publishAll();
