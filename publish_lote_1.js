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
    title: 'Qué es un ERP en la nube y cómo funciona',
    slug: { _type: 'slug', current: 'que-es-software-erp-nube' },
    seoTitle: 'Qué es un ERP en la nube, cómo funciona y ventajas | Kontrolo',
    seoDescription: 'Descubre qué es un sistema ERP en la nube, cómo funciona y por qué las pymes en Colombia están migrando para automatizar ventas, inventarios y contabilidad.',
    excerpt: 'Un ERP en la nube es el motor invisible detrás de las empresas modernas. Aprende cómo esta tecnología conecta inventarios, facturación y finanzas en un solo lugar.',
    bodyMd: `
# Qué es un ERP en la nube y cómo funciona

La gestión de una empresa moderna requiere agilidad. Atrás quedaron los días en los que la contabilidad vivía en el computador de un solo empleado y el inventario se llevaba en un cuaderno. Hoy, las empresas más competitivas de Colombia usan un **ERP en la nube**.

## ¿Qué es exactamente un sistema ERP?

Las siglas ERP significan *Enterprise Resource Planning* (Planificación de Recursos Empresariales). En palabras sencillas, es un software unificado que conecta y centraliza todas las áreas operativas de tu negocio.
En lugar de tener un programa para facturar, una tabla de Excel para inventario y un cuaderno para las compras, el ERP consolida todo en una sola plataforma. Y al estar "en la nube", significa que puedes acceder desde cualquier dispositivo con internet, sin necesidad de servidores locales costosos.

## ¿Cómo funciona un ERP en la nube en la práctica?

El núcleo de un ERP es su base de datos compartida. Si haces una venta en la caja registradora (Módulo POS), el sistema automáticamente descuenta el producto del inventario, genera la Facturación Electrónica DIAN y registra el ingreso en la contabilidad.
* **Información en tiempo real:** No tienes que esperar a fin de mes para saber cuánto vendiste.
* **Automatización de procesos:** Tareas manuales y repetitivas se hacen solas.
* **Seguridad de grado bancario:** La nube protege tu información contra daños de computadores locales, robos o virus.

## 4 Ventajas clave para Pymes en Colombia

1. **Cumplimiento legal automático:** Con la DIAN exigiendo documentos electrónicos, un ERP garantiza que cada transacción cumpla la normativa vigente sin esfuerzo humano.
2. **Control de inventarios sin pérdidas:** Sabes exactamente qué entra y qué sale, reduciendo robos hormiga y mermas.
3. **Reducción de costos de IT:** No pagas mantenimiento de servidores ni técnicos; solo una mensualidad (SaaS).
4. **Toma de decisiones con datos reales:** Dashboards y reportes que te dicen cuáles son tus productos estrella.

## Conclusión
Un ERP en la nube ya no es un lujo de grandes corporaciones, es una herramienta indispensable de supervivencia comercial. Si quieres llevar tu negocio al siguiente nivel operativo, agenda una demostración con **Kontrolo** y descubre nuestra suite completa de ERP y POS.
    `
  },
  {
    title: 'Cuánto cuesta implementar un ERP en Colombia',
    slug: { _type: 'slug', current: 'cuanto-cuesta-erp-colombia' },
    seoTitle: 'Cuánto cuesta implementar un software ERP en Colombia | Kontrolo',
    seoDescription: 'Conoce los costos reales de implementar un sistema ERP en Colombia. Análisis de precios, licencias SaaS, costos ocultos y retorno de inversión para pymes.',
    excerpt: 'Implementar un ERP es una inversión inteligente. Analizamos los costos reales, modelos de precios SaaS y cómo calcular el Retorno de Inversión (ROI).',
    bodyMd: `
# ¿Cuánto cuesta implementar un ERP en Colombia?

Una de las preguntas más frecuentes de gerentes y dueños de negocio es: "¿Cuánto me va a costar este sistema?". La respuesta rápida es que el costo de un ERP en Colombia ha caído drásticamente en los últimos 5 años gracias al modelo en la nube (SaaS), pasando de ser una inversión millonaria exclusiva para grandes corporaciones, a ser totalmente accesible para Pymes.

## Modelo Tradicional vs. Modelo SaaS (Nube)

Históricamente, los sistemas ERP requerían instalar servidores, comprar costosas licencias vitalicias y pagar implementaciones que duraban años.
Hoy, el modelo SaaS (Software as a Service) cambió las reglas:
* **Cero costos de servidores:** Todo se aloja en plataformas seguras como AWS.
* **Pago por uso o mensualidad:** Pides planes que se ajusten a la cantidad de usuarios o módulos.
* **Actualizaciones automáticas:** No pagas versiones nuevas; el sistema siempre está al día con la DIAN.

## Variables que definen el precio de un ERP

1. **Número de Usuarios:** Muchos proveedores cobran una tarifa base que incluye 2 o 3 usuarios, y cobran extra por cada acceso adicional.
2. **Módulos requeridos:** Un sistema básico de facturación e inventario es más económico que un ERP completo con contabilidad NIIF, nómina y CRM.
3. **Capacitación y Configuración (Onboarding):** Algunos sistemas cobran un "setup fee" por configurar tus bodegas, cargar tus listas de precios y entrenar a tu personal.
4. **Soporte Técnico:** Asegúrate de que el soporte local en Colombia esté incluido en tu mensualidad.

## Costos ocultos que debes evitar

Al cotizar, ten mucho cuidado con empresas que ofrecen "ERP gratuito". Usualmente esconden costos como:
* Cobros altísimos por cada Factura Electrónica emitida.
* Limitación en el espacio de almacenamiento.
* Obligación de pagar consultoría obligatoria para hacer un simple cambio.

## El Retorno de Inversión (ROI)

El costo de un ERP no debe verse como un gasto. Un buen sistema como Kontrolo se paga solo en menos de 6 meses gracias a:
* Reducción de horas extras del contador.
* Evitar multas de la DIAN por errores humanos.
* Minimizar pérdidas de inventario o "fugas" de caja.

¿Quieres una cotización exacta adaptada a tu negocio? Contáctanos hoy y descubre cómo Kontrolo puede automatizar tu empresa a un precio increíble.
    `
  },
  {
    title: '5 Errores al migrar tu contabilidad a la nube',
    slug: { _type: 'slug', current: 'errores-migrar-contabilidad-nube' },
    seoTitle: '5 Errores fatales al migrar tu contabilidad a la nube | Kontrolo',
    seoDescription: 'Evita multas y pérdidas de datos. Conoce los 5 errores más comunes al migrar tu sistema contable a la nube y cómo hacer una transición segura.',
    excerpt: 'Migrar a la nube es el camino correcto, pero hacerlo sin planificación puede ser desastroso. Conoce los 5 errores críticos y cómo evitarlos.',
    bodyMd: `
# 5 Errores al migrar tu contabilidad a la nube

La transición de los sistemas contables de escritorio (on-premise) hacia plataformas en la nube es inevitable. Sin embargo, en nuestro trabajo con miles de empresas en Colombia, hemos visto a muchos emprendedores y gerentes tropezar en el mismo lugar. Aquí te contamos los 5 errores críticos al migrar.

## Error 1: No limpiar los datos antes de migrar (Basura entra, basura sale)
Uno de los mayores errores es exportar el Excel viejo con clientes duplicados, productos descontinuados y saldos incorrectos, y subirlo al nuevo sistema. La migración es el momento perfecto para depurar la base de datos.
* Solución: Haz un inventario físico real y unifica el catálogo de productos antes de importarlo.

## Error 2: Resistencia al cambio del personal
Puedes comprar el mejor ERP del planeta, pero si tus empleados están acostumbrados a su vieja hoja de Excel, se resistirán a usarlo. La falta de capacitación hace que el sistema fracase.
* Solución: Involucra a tu equipo clave desde el proceso de selección del software. Que entiendan que el ERP les ahorrará horas de trabajo manual.

## Error 3: No validar la integración nativa con la DIAN
En Colombia, la contabilidad y la DIAN van de la mano. Contratar un ERP extranjero o un software viejo que no se integre fluidamente con los nuevos Documentos Equivalentes Electrónicos o Facturación Electrónica es un suicidio comercial.
* Solución: Asegúrate de que el proveedor tenga soporte directo para la normativa tributaria colombiana, como lo hace Kontrolo.

## Error 4: Olvidar los permisos de seguridad y roles
Migrar a la nube da gran accesibilidad, lo cual es excelente, pero también peligroso si no se configura bien. No todos tus empleados deben tener acceso a los márgenes de ganancia, costos o nómina.
* Solución: Configura los perfiles de usuario. Un cajero solo debe ver el POS, mientras que el gerente tiene acceso total.

## Error 5: Hacer la migración en temporada alta
Cambiar de sistema en pleno mes de diciembre o justo en fechas de cierre contable es garantía de caos.
* Solución: Planifica la salida a producción (Go-Live) en los días de menor flujo de ventas de tu negocio. Así el equipo podrá adaptarse con calma.

La migración a un entorno cloud debe ser motivo de tranquilidad, no de estrés. Con el acompañamiento del equipo de soporte de Kontrolo, garantizamos un aterrizaje seguro en la nube.
    `
  },
  {
    title: 'ERP vs Excel: Por qué las hojas de cálculo te hacen perder dinero',
    slug: { _type: 'slug', current: 'erp-vs-excel' },
    seoTitle: 'ERP vs Excel: Por qué dejar las hojas de cálculo | Kontrolo',
    seoDescription: 'Comparativa definitiva entre usar Excel y un Software ERP para gestionar empresas. Descubre los riesgos de las hojas de cálculo y los beneficios de automatizar.',
    excerpt: 'Excel es excelente para analizar datos, pero usarlo para administrar ventas, inventarios y clientes es una bomba de tiempo. Descubre por qué.',
    bodyMd: `
# ERP vs Excel: Por qué las hojas de cálculo te hacen perder dinero

Es innegable: Excel es una de las herramientas más importantes jamás creadas. Casi todas las empresas del mundo comenzaron gestionando sus clientes, proveedores e inventarios en una tabla cuadriculada. Pero hay un punto de quiebre donde Excel deja de ser una solución y se convierte en el mayor cuello de botella.

## El problema de escalar con Excel

Imagina esto: Tienes un archivo llamado "Inventario_Final_V3_Real_Corregido.xlsx". Tu vendedor anota una salida de producto, pero olvida guardar. Al mismo tiempo, el bodeguero anota una entrada en otra copia del mismo archivo en su computador. Al final de la semana, tienes dos versiones de la "verdad" y ninguna coincide con lo que hay en el estante.

Ese es el problema número uno de las hojas de cálculo para gestión operativa: **No tienen integridad relacional ni trabajo colaborativo seguro en tiempo real para procesos transaccionales.**

## Los riesgos ocultos de depender de Excel

1. **Pérdida de datos por errores humanos:** Un simple "eliminar fila" por error o un "arrastrar fórmula" mal ejecutado puede dañar el costo promedio de todo tu inventario.
2. **Cero integración legal:** Excel no se conecta con la DIAN. Tienes que digitar todo en el facturador gratuito, luego digitarlo en Excel, y luego el contador lo digita en su sistema. Tres personas haciendo el trabajo de una.
3. **Falta de auditoría:** Si desaparecen 10 unidades de mercancía, en Excel es casi imposible saber quién borró el dato, a qué hora y desde qué computador.
4. **Dependencia de la "macro" del ex-empleado:** Muchas pymes dependen de una tabla con fórmulas complejas que creó un empleado hace 5 años. Si esa persona se va o el archivo se corrompe, el negocio se paraliza.

## La solución: Automatización con ERP

Al cambiar a un ERP como Kontrolo, el paradigma cambia:
* **Verdad Única:** Cuando se vende algo en el módulo POS, el inventario se actualiza para toda la empresa en el mismo segundo.
* **Trazabilidad total:** Sabes exactamente qué usuario anuló una factura o ajustó un stock.
* **Seguridad en la nube:** Backups diarios y automáticos. Adiós a las memorias USB con copias de la información.

Si sientes que tu negocio gasta más tiempo actualizando celdas de Excel que consiguiendo nuevos clientes, es el síntoma claro de que necesitas evolucionar a un ERP.
    `
  }
];

async function publishAll() {
  console.log("Iniciando inyección del Lote 1 (Clúster ERP)...");
  
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
  
  console.log("Lote 1 inyectado en su totalidad.");
}

publishAll();
