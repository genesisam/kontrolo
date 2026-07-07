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
    title: 'Mejor sistema POS para restaurantes y minimarkets',
    slug: { _type: 'slug', current: 'mejor-sistema-pos-restaurantes' },
    seoTitle: 'Mejor sistema POS para restaurantes y minimarkets en Colombia | Kontrolo',
    seoDescription: 'Conoce cómo elegir el mejor software POS para tu restaurante o minimarket. Facturación rápida, control de mesas y recetas, inventarios y cumplimiento DIAN.',
    excerpt: 'El corazón de un restaurante o tienda exitosa es la velocidad de atención. Descubre qué características debe tener el sistema POS ideal para tu negocio.',
    bodyMd: `
# Mejor sistema POS para restaurantes y minimarkets

Atender a un cliente en el mostrador o en una mesa requiere precisión y, sobre todo, velocidad. En un restaurante en hora pico o un minimarket con fila, un software POS (Point of Sale) lento no solo te hace perder clientes, sino que genera errores graves en la caja y el inventario.

## Características del POS ideal para Restaurantes

Los restaurantes tienen una operatividad muy distinta a una tienda de ropa. Tu POS debe incluir:
1. **Control de Mesas y Comandas:** Que el mesero tome el pedido en una tablet y llegue automáticamente a la cocina.
2. **Control de Recetas (Escandallo):** Al vender una hamburguesa, el sistema debe descontar del inventario: pan, 150g de carne y queso.
3. **Múltiples medios de pago:** Integración con Nequi, Daviplata, tarjetas y efectivo, permitiendo dividir cuentas por silla.
4. **Cierre de caja ciego:** Para evitar que el cajero manipule el dinero antes de entregar su reporte.

## El POS perfecto para Minimarkets y Retail

Por otro lado, un minimarket necesita agilidad extrema en el punto de pago:
1. **Lector de código de barras ultra rápido:** Cobrar decenas de productos en segundos.
2. **Control de inventario en tiempo real:** Saber qué productos se están agotando para pedirle al proveedor antes de quedar en cero.
3. **Manejo de códigos PLU:** Especialmente para frutas y verduras pesadas en báscula.

## La importancia de la integración DIAN (Documento Equivalente Electrónico)

Desde 2024, la DIAN exige a restaurantes y minimarkets que las tradicionales tirillas POS cumplan con la resolución del Documento Equivalente Electrónico. Tu sistema POS ya no puede ser una simple caja registradora, debe comunicarse con la nube.

Con **Kontrolo POS**, tienes un ecosistema híbrido que funciona rapidísimo en tu mostrador (incluso con cortes de internet), pero sincroniza toda la información en tiempo real a tu ERP contable y directamente con los servidores de la DIAN. No sacrifiques velocidad por cumplimiento legal; con nosotros, tienes ambos.
    `
  },
  {
    title: 'Cómo hacer un cuadre de caja perfecto sin faltantes',
    slug: { _type: 'slug', current: 'como-hacer-cuadre-de-caja' },
    seoTitle: 'Cómo hacer un cuadre de caja perfecto paso a paso | Kontrolo',
    seoDescription: 'Evita los faltantes y dolores de cabeza al final del día. Te enseñamos cómo hacer un cierre y cuadre de caja perfecto usando las mejores prácticas y software POS.',
    excerpt: 'El cierre de caja es el momento de la verdad en cualquier negocio retail. Sigue estos pasos para lograr un cuadre perfecto y evitar pérdidas misteriosas.',
    bodyMd: `
# Cómo hacer un cuadre de caja perfecto sin faltantes

El final del turno puede ser el momento más estresante para un administrador de restaurante o administrador de tienda. Contar monedas, revisar vouchers de tarjetas de crédito y buscar por qué faltan $50,000 COP es una pesadilla recurrente. Hacer un cuadre de caja perfecto no es cuestión de suerte, es cuestión de método.

## ¿Por qué descuadra la caja?

Antes de solucionarlo, debemos entender por qué sucede:
1. **Errores de digitación:** Marcar un producto de $10.000 como si costara $100.000.
2. **Devoluciones de cambio incorrectas:** Entregar más dinero de "vueltas" en horas pico.
3. **Salidas de efectivo no registradas:** Pagarle al proveedor de hielos directamente desde la gaveta sin registrar el gasto ("vale de caja").
4. **Falta de control:** Cajeros que manipulan el dinero al cierre sin supervisión.

## Pasos para un Cuadre de Caja Exitoso

Para lograr cierres diarios de caja donde los números calcen al centavo, implementa este protocolo:

1. **La base de caja estricta:** Cada turno debe iniciar con una base fija (ej. $100.000) en monedas y billetes pequeños. Esta base debe contarse antes de registrar la primera venta.
2. **Registrar todo movimiento no comercial (Vales):** Si sacas dinero para comprar café para el equipo, debe registrarse inmediatamente en el sistema POS como una "Salida de Efectivo/Gasto".
3. **Implementar el Cierre de Caja Ciego:** El mejor amigo del administrador. El sistema POS NO le dice al cajero cuánto dinero debería haber. El cajero cuenta el efectivo y los vouchers, ingresa la cifra en el sistema, y es el software el que le avisa al administrador si hay faltantes o sobrantes.

## La herramienta es clave

Hacer cierres de caja en cuadernos o calculadoras es inviable si vendes más de 20 veces al día. Un sistema **POS profesional como Kontrolo** automatiza el cruce de datos: separa las ventas en efectivo de Nequi, tarjetas y transferencias, y te genera un informe (X y Z) detallado a prueba de manipulaciones.
    `
  },
  {
    title: 'Qué hardware necesito para un punto de venta POS',
    slug: { _type: 'slug', current: 'hardware-punto-de-venta-pos' },
    seoTitle: 'Hardware para Punto de Venta POS: Todo lo que necesitas | Kontrolo',
    seoDescription: 'Guía completa sobre el hardware que necesitas para tu punto de venta (POS). Computadores, impresoras térmicas, cajones monederos y lectores de códigos.',
    excerpt: '¿Vas a montar tu punto de venta y no sabes qué equipos comprar? Te explicamos las partes esenciales del hardware POS y cómo ahorrar dinero.',
    bodyMd: `
# Qué hardware necesito para un punto de venta POS

Has decidido modernizar tu negocio o abrir un nuevo local. Tienes el software ideal (como Kontrolo), pero surge la duda: *¿Qué equipos físicos (hardware) tengo que comprar para armar la caja registradora perfecta?*

## Los 4 componentes esenciales

No importa si tienes una ferretería, un minimarket o una pizzería, el hardware básico es universal:

1. **El terminal (Computador All-in-One o Tablet)**
   El "cerebro" del punto de venta. Para negocios con poco espacio, una Tablet Android/iPad de 10 pulgadas es ideal. Para tiendas minoristas de alto flujo, recomendamos un equipo All-in-One táctil de 15 pulgadas, ya que resiste mejor derrames y golpes.
   
2. **Impresora Térmica (de recibos)**
   A pesar de la digitalización, los clientes en mostrador aún piden la tirilla física. Las impresoras térmicas de 80mm son el estándar mundial: no usan tinta y el papel es muy económico. Busca impresoras con conexión USB y puerto RJ11 (vital para abrir el cajón monedero).

3. **Cajón Monedero (Gaveta de dinero)**
   Mantiene el efectivo seguro. Se conecta directamente a la impresora térmica mediante el cable RJ11. El software POS le envía una señal a la impresora al momento de realizar el cobro, la cual hace que la gaveta se "dispare" (abra) automáticamente. ¡Nunca dejes la llave pegada!

4. **Lector de código de barras (Scanner)**
   Indispensable en supermercados y minimarkets. Permite "pistolear" los productos. Los modelos modernos (Omnidireccionales o 2D) pueden leer códigos incluso si están arrugados o desde la pantalla de un celular.

## Accesorios adicionales según tu nicho

* **Balanzas conectadas:** Si vendes carne o verduras. Al poner el peso, el precio se inyecta directamente al POS.
* **Datáfono integrado:** Elimina la necesidad de que el cajero digite el valor en el datáfono, evitando cobros por montos incorrectos.
* **Impresora de comandas (Cocina):** Para que los pedidos lleguen directamente al chef en formato de "ticket de cocina".

En Kontrolo POS, nuestro software en la nube está diseñado para conectarse a casi cualquier hardware moderno mediante Bluetooth, WiFi o USB. Aprovecha la tecnología y mejora la experiencia de tus clientes al máximo.
    `
  },
  {
    title: 'Control de inventarios en tiempo real para retail',
    slug: { _type: 'slug', current: 'control-inventarios-tiempo-real' },
    seoTitle: 'Control de inventarios en tiempo real para retail | Kontrolo',
    seoDescription: 'Descubre cómo evitar pérdidas y quiebres de stock aplicando el control de inventarios en tiempo real en tu negocio retail o minimarket.',
    excerpt: 'Tener mercancía estancada o quedar sin producto en plena venta es terrible. Aprende a gestionar tu stock en tiempo real con tecnología POS.',
    bodyMd: `
# Control de inventarios en tiempo real para retail

El corazón financiero de cualquier negocio minorista (retail, minimarkets, ferreterías, tiendas de ropa) no está en la caja registradora, está en las estanterías. El inventario es literalmente tu dinero convertido en cajas y botellas. No controlarlo significa que estás perdiendo plata todos los días.

## Los problemas del inventario manual

Muchas empresas cierran sus puertas un fin de semana entero para contar producto por producto con una tabla de Excel. Los problemas saltan a la vista:
* **Faltantes misteriosos:** Productos que se vencieron, se dañaron o fueron sustraídos (robo hormiga).
* **Quiebres de stock (Stockouts):** Cuando un cliente te pide el producto más vendido y le dices "no me queda". Es venta perdida y daño a tu marca.
* **Sobre-stock:** Comprar cientos de unidades de un producto que no tiene rotación porque nadie revisó las estadísticas de venta.

## La revolución del control en "Tiempo Real"

Controlar tu inventario en tiempo real significa que tu base de datos centralizada sabe exactamente qué ocurre cada segundo del día.
Con un ecosistema como **Kontrolo (ERP + POS)** funciona así:
1. Recibes 50 Coca-Colas del proveedor e ingresas la factura de compra al ERP. Tu stock sube inmediatamente a 50 a nivel empresa.
2. Tu vendedor en la sucursal Norte vende 3 unidades en el POS.
3. Sin que el administrador haga nada, el stock central baja a 47.
4. El sistema evalúa el "Punto de Reorden" (Stock Mínimo). Si configuraste que necesitas alertar cuando lleguen a 10 unidades, el software te envía una notificación para llamar al proveedor.

## Tecnología al servicio del almacén

Hoy en día puedes usar terminales móviles con escáner integrado o incluso tu celular para hacer "conteos cíclicos". En lugar de cerrar la tienda para contar, el bodeguero cuenta solo el pasillo 3 mientras la tienda sigue vendiendo. El sistema inteligente calcula la diferencia en segundos.

No dejes el destino de tu inversión en la intuición ni en hojas de papel. Mantén tus bodegas vigiladas 24/7 y aumenta tu rentabilidad implementando un control de inventario nativo y en la nube.
    `
  }
];

async function publishAll() {
  console.log("Iniciando inyección del Lote 2 (Clúster POS)...");
  
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
  
  console.log("Lote 2 inyectado en su totalidad.");
}

publishAll();
