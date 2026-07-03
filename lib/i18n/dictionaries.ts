import type { Locale } from '@/lib/i18n/types'

export interface Dictionary {
  common: {
    homeAriaLabel: string
    openMenu: string
    closeMenu: string
    languageSwitcherLabel: string
  }
  nav: {
    platform: string
    apps: string
    ecosystems: string
    studio: string
    technologies: string
    contact: string
  }
  header: {
    explorePlatform: string
    buildWithDaiego: string
  }
  hero: {
    titlePrefix: string
    titleHighlight: string
    typedPhrases: string[]
  }
  platform: {
    title: string
    subtitle: string
    modules: string[]
    footerLine: string
  }
  products: {
    title: string
    subtitle: string
    comingSoon: string
    apps: Array<{
      name: string
      description: string
      features: string[]
    }>
    upcoming: {
      name: string
      description: string
      features: string[]
    }
  }
  ecosystems: {
    title: string
    subtitle: string
    badge: string
    toysTitle: string
    toysDescription: string
    bullets: string[]
    tools: Array<{ tool: string; detail: string }>
  }
  services: {
    title: string
    subtitle: string
    items: string[]
    startProject: string
  }
  whyChoose: {
    title: string
    subtitle: string
    pillars: Array<{ title: string; description: string }>
  }
  process: {
    title: string
    subtitle: string
    steps: Array<{ title: string; description: string }>
  }
  showcase: {
    title: string
    subtitle: string
    metrics: {
      salesToday: string
      inventoryAlerts: string
      employeesActive: string
      subscriptionsDue: string
      aiRecommendations: string
      totalUsers: string
      active: string
    }
    adminPanel: string
    dashboard: string
    performance: string
    recentActivity: string
    activityTypes: {
      sale: string
      inventory: string
      subscription: string
    }
    aiAnalyzing: string
    restockReady: string
  }
  techStack: {
    title: string
    subtitle: string
    categories: {
      frontend: string
      backend: string
      databases: string
      cloudDevops: string
      aiAutomation: string
    }
    items: {
      aiAgents: string
      workflowAutomation: string
    }
  }
  cta: {
    title: string
    subtitle: string
    startProject: string
    contact: string
    note: string
  }
  footer: {
    tagline: string
    description: string
    platform: string
    apps: string
    ecosystems: string
    rights: string
    privacy: string
    terms: string
  }
  social: {
    title: string
    subtitle: string
    visit: string
    openAriaLabel: string
    backPrompt: string
    backLink: string
    links: Array<{ id: string; name: string; description: string }>
  }
  trust: {
    title: string
    subtitle: string
    benefits: Array<{ label: string; description: string }>
    audiencesTitle: string
    audiences: Array<{ title: string; description: string }>
  }
  modularMap: {
    coreLabel: string
    labels: Record<string, string>
  }
  operationsFlow: {
    steps: Array<{ label: string; detail: string }>
  }
}

const en: Dictionary = {
  common: {
    homeAriaLabel: 'DAIEGO home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageSwitcherLabel: 'Language',
  },
  nav: {
    platform: 'Platform',
    apps: 'Apps',
    ecosystems: 'Ecosystems',
    studio: 'Studio',
    technologies: 'Technologies',
    contact: 'Contact',
  },
  header: {
    explorePlatform: 'Explore platform',
    buildWithDaiego: 'Build with DAIEGO',
  },
  hero: {
    titlePrefix: 'AI-powered',
    titleHighlight: 'business',
    typedPhrases: [
      'operating system',
      'sales platform',
      'automation suite',
      'growth engine',
    ],
  },
  platform: {
    title: 'What DAIEGO Does',
    subtitle:
      'DAIEGO connects the essential parts of a business operation into one modular platform—powered by AI.',
    modules: [
      'Sales',
      'Inventory',
      'POS',
      'Employees',
      'Attendance',
      'Payments',
      'Subscriptions',
      'Customers',
      'Reports',
      'AI Automation',
    ],
    footerLine:
      'Sales · Inventory · POS · Employees · Attendance · Payments · Subscriptions · Customers · Reports · AI',
  },
  products: {
    title: 'The DAIEGO Ecosystem',
    subtitle:
      'Modular apps inside DAIEGO—each one a real software product, connected by the same platform and AI.',
    comingSoon: 'Coming soon',
    apps: [
      {
        name: 'DAIEGO Store',
        description: 'Inventory, POS, sales and branch management for retail businesses.',
        features: ['Inventory control', 'Point of sale', 'Sales tracking', 'Branch management'],
      },
      {
        name: 'DAIEGO Clofi',
        description:
          'Employee attendance, time tracking and workforce management for store teams.',
        features: ['Clock in / clock out', 'Worked hours', 'Attendance records', 'Team management'],
      },
      {
        name: 'DAIEGO Receipts',
        description: 'Payments, receipts and service management for daily business operations.',
        features: ['Payment processing', 'Receipt management', 'Client services', 'Daily control'],
      },
      {
        name: 'DAIEGO Streaming',
        description:
          'Subscription, profile, renewal and customer management for digital services.',
        features: ['Subscription control', 'Profile management', 'Renewals', 'Customer tracking'],
      },
    ],
    upcoming: {
      name: 'DAIEGO Finance',
      description: 'Savings, loans and financial workflows—built on the DAIEGO platform.',
      features: ['Account control', 'Finance workflows', 'Risk assessment'],
    },
  },
  ecosystems: {
    title: 'Ecosystems powered by DAIEGO',
    subtitle:
      'We do not only build software. We use our own systems to operate real businesses, validate workflows and improve our products from real operations.',
    badge: 'Real operation',
    toysTitle: 'DAIEGO Toys',
    toysDescription:
      'A retail and collectibles ecosystem powered by DAIEGO Store, Clofi and internal automation tools.',
    bullets: [
      'LEGO, Funkos and Hot Wheels',
      'Inventory management',
      'Marketplace operations',
      'Local store sales',
      'Customer order tracking',
      'Sales and stock reports',
    ],
    tools: [
      { tool: 'DAIEGO Store', detail: 'Inventory · POS · Sales' },
      { tool: 'DAIEGO Clofi', detail: 'Team · Attendance' },
      { tool: 'AI Automation', detail: 'Reports · Restock alerts' },
    ],
  },
  services: {
    title: 'Build custom software with DAIEGO Studio',
    subtitle:
      'We design and develop intelligent platforms, internal systems, dashboards and automations for companies that want to operate smarter.',
    items: [
      'Custom web platforms',
      'AI-powered tools',
      'Admin dashboards',
      'Internal business systems',
      'Inventory and POS systems',
      'CRM and customer management',
      'Workflow automation',
      'API integrations',
    ],
    startProject: 'Start a project',
  },
  whyChoose: {
    title: 'Built from real operations',
    subtitle:
      'Every DAIEGO product is built from real operational needs: managing sales, tracking stock, controlling employee hours, processing payments, handling subscriptions and understanding business data.',
    pillars: [
      {
        title: 'Operate',
        description: 'Run sales, inventory, teams and services from connected modules.',
      },
      {
        title: 'Automate',
        description: 'Use AI and workflows to reduce repetitive tasks and improve decisions.',
      },
      {
        title: 'Scale',
        description:
          'Grow from one operation to multiple branches, products and digital ecosystems.',
      },
    ],
  },
  process: {
    title: 'Our Process',
    subtitle: 'A proven approach to delivering exceptional software solutions',
    steps: [
      {
        title: 'Discover',
        description:
          'We deeply understand your business, challenges, and goals through collaborative consultation',
      },
      {
        title: 'Design',
        description:
          'Beautiful, functional interfaces that solve real problems and delight your team',
      },
      {
        title: 'Build',
        description: 'Clean, scalable code using modern technologies and best practices',
      },
      {
        title: 'Launch',
        description:
          'Seamless deployment and ongoing support to keep your systems running smoothly',
      },
    ],
  },
  showcase: {
    title: 'One platform. Multiple modules.',
    subtitle:
      'Sales, operations, customers and data—connected in a single modular interface and powered by AI.',
    metrics: {
      salesToday: 'Sales today',
      inventoryAlerts: 'Inventory alerts',
      employeesActive: 'Employees active',
      subscriptionsDue: 'Subscriptions due',
      aiRecommendations: 'AI recommendations',
      totalUsers: 'Total Users',
      active: 'Active',
    },
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    performance: 'Performance',
    recentActivity: 'Recent activity',
    activityTypes: {
      sale: 'Sale',
      inventory: 'Inventory',
      subscription: 'Subscription',
    },
    aiAnalyzing: 'AI analyzing…',
    restockReady: 'Restock recommendation ready',
  },
  techStack: {
    title: 'Technologies',
    subtitle:
      'A focused, modern stack we use to design, build and ship the DAIEGO platform.',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      cloudDevops: 'Cloud & DevOps',
      aiAutomation: 'AI & Automation',
    },
    items: {
      aiAgents: 'AI agents',
      workflowAutomation: 'Workflow automation',
    },
  },
  cta: {
    title: 'Build and operate with DAIEGO',
    subtitle:
      "One platform. Multiple modules. Connected by AI. Tell us about your operation and we'll design the right modular solution.",
    startProject: 'Start a project',
    contact: 'Contact',
    note: 'Response within 24 hours · No obligation · Free consultation',
  },
  footer: {
    tagline: 'AI Business Operating System',
    description:
      'Modular software, automation tools and AI-powered platforms to operate and scale real businesses.',
    platform: 'Platform',
    apps: 'Apps',
    ecosystems: 'Ecosystems',
    rights: 'DAIEGO LLC © 2026. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  social: {
    title: 'Our social networks',
    subtitle:
      'Follow us, discover updates and contact us directly. The entire DAIEGO ecosystem in one place.',
    visit: 'Visit →',
    openAriaLabel: 'Open {name} in a new tab',
    backPrompt: 'Prefer to go back to the main site?',
    backLink: 'Go to home',
    links: [
      {
        id: 'tiktok',
        name: 'TikTok',
        description: 'Videos, news and behind-the-scenes content from DAIEGO.',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        description: 'Community, announcements and official updates.',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        description: 'Photos, stories and day-to-day life in the DAIEGO ecosystem.',
      },
      {
        id: 'whatsapp-channel',
        name: 'WhatsApp Channel',
        description: 'Follow the official channel: Toys, Receipts, Streaming and more.',
      },
      {
        id: 'whatsapp-catalog',
        name: 'WhatsApp Catalog',
        description: 'Explore products and services available in the catalog.',
      },
      {
        id: 'whatsapp-direct',
        name: 'Direct message',
        description: 'Write to us on WhatsApp and we will assist you directly.',
      },
    ],
  },
  trust: {
    title: 'Trusted by teams who demand more',
    subtitle: 'DAIEGO builds software for companies that are serious about growth',
    benefits: [
      {
        label: 'Custom Web Apps',
        description: 'Tailored applications built to your unique business needs',
      },
      {
        label: 'Admin Panels',
        description: 'Powerful dashboards for full operational control',
      },
      {
        label: 'Business Automation',
        description: 'Streamline workflows and reduce manual tasks',
      },
      {
        label: 'Internal Tools',
        description: 'Purpose-built systems that grow with your business',
      },
    ],
    audiencesTitle: 'We build software for:',
    audiences: [
      { title: 'Entrepreneurs', description: 'Build ambitious ideas at scale' },
      { title: 'Growing Companies', description: 'Systems that scale with your success' },
      { title: 'Operations Teams', description: 'Tools designed for efficiency' },
      { title: 'Digital Businesses', description: 'Platforms built for the modern market' },
    ],
  },
  modularMap: {
    coreLabel: 'Core OS',
    labels: {
      store: 'Store',
      clofi: 'Clofi',
      receipts: 'Receipts',
      streaming: 'Streaming',
      toys: 'Toys',
      studio: 'Studio',
      ai: 'AI Automation',
      reports: 'Reports',
    },
  },
  operationsFlow: {
    steps: [
      { label: 'Sale', detail: 'A sale occurs in DAIEGO Toys' },
      { label: 'Inventory', detail: 'DAIEGO Store updates stock' },
      { label: 'Employee', detail: 'Clofi logs team activity' },
      { label: 'Payment', detail: 'Receipts processes transaction' },
      { label: 'Report', detail: 'Reports aggregates data' },
      { label: 'AI Decision', detail: 'AI generates recommendation' },
    ],
  },
}

const es: Dictionary = {
  common: {
    homeAriaLabel: 'Inicio de DAIEGO',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    languageSwitcherLabel: 'Idioma',
  },
  nav: {
    platform: 'Plataforma',
    apps: 'Apps',
    ecosystems: 'Ecosistemas',
    studio: 'Studio',
    technologies: 'Tecnologías',
    contact: 'Contacto',
  },
  header: {
    explorePlatform: 'Explorar plataforma',
    buildWithDaiego: 'Construir con DAIEGO',
  },
  hero: {
    titlePrefix: 'Negocios con',
    titleHighlight: 'IA',
    typedPhrases: [
      'sistema operativo',
      'plataforma de ventas',
      'suite de automatización',
      'motor de crecimiento',
    ],
  },
  platform: {
    title: 'Qué hace DAIEGO',
    subtitle:
      'DAIEGO conecta las partes esenciales de la operación de un negocio en una plataforma modular impulsada por IA.',
    modules: [
      'Ventas',
      'Inventario',
      'POS',
      'Empleados',
      'Asistencia',
      'Pagos',
      'Suscripciones',
      'Clientes',
      'Reportes',
      'Automatización con IA',
    ],
    footerLine:
      'Ventas · Inventario · POS · Empleados · Asistencia · Pagos · Suscripciones · Clientes · Reportes · IA',
  },
  products: {
    title: 'El ecosistema DAIEGO',
    subtitle:
      'Apps modulares dentro de DAIEGO: cada una es un producto de software real, conectado por la misma plataforma e IA.',
    comingSoon: 'Próximamente',
    apps: [
      {
        name: 'DAIEGO Store',
        description:
          'Inventario, POS, ventas y gestión de sucursales para negocios retail.',
        features: [
          'Control de inventario',
          'Punto de venta',
          'Seguimiento de ventas',
          'Gestión de sucursales',
        ],
      },
      {
        name: 'DAIEGO Clofi',
        description:
          'Asistencia de empleados, control de tiempo y gestión de equipos para tiendas.',
        features: [
          'Entrada / salida',
          'Horas trabajadas',
          'Registros de asistencia',
          'Gestión de equipos',
        ],
      },
      {
        name: 'DAIEGO Receipts',
        description:
          'Pagos, recibos y gestión de servicios para la operación diaria del negocio.',
        features: [
          'Procesamiento de pagos',
          'Gestión de recibos',
          'Servicios a clientes',
          'Control diario',
        ],
      },
      {
        name: 'DAIEGO Streaming',
        description:
          'Gestión de suscripciones, perfiles, renovaciones y clientes para servicios digitales.',
        features: [
          'Control de suscripciones',
          'Gestión de perfiles',
          'Renovaciones',
          'Seguimiento de clientes',
        ],
      },
    ],
    upcoming: {
      name: 'DAIEGO Finance',
      description:
        'Ahorros, préstamos y flujos financieros construidos sobre la plataforma DAIEGO.',
      features: ['Control de cuentas', 'Flujos financieros', 'Evaluación de riesgo'],
    },
  },
  ecosystems: {
    title: 'Ecosistemas impulsados por DAIEGO',
    subtitle:
      'No solo construimos software. Usamos nuestros propios sistemas para operar negocios reales, validar flujos y mejorar nuestros productos desde la operación.',
    badge: 'Operación real',
    toysTitle: 'DAIEGO Toys',
    toysDescription:
      'Un ecosistema de retail y coleccionables impulsado por DAIEGO Store, Clofi y herramientas internas de automatización.',
    bullets: [
      'LEGO, Funkos y Hot Wheels',
      'Gestión de inventario',
      'Operaciones de marketplace',
      'Ventas en tienda local',
      'Seguimiento de pedidos',
      'Reportes de ventas y stock',
    ],
    tools: [
      { tool: 'DAIEGO Store', detail: 'Inventario · POS · Ventas' },
      { tool: 'DAIEGO Clofi', detail: 'Equipo · Asistencia' },
      { tool: 'Automatización con IA', detail: 'Reportes · Alertas de reposición' },
    ],
  },
  services: {
    title: 'Construye software a medida con DAIEGO Studio',
    subtitle:
      'Diseñamos y desarrollamos plataformas inteligentes, sistemas internos, dashboards y automatizaciones para empresas que quieren operar mejor.',
    items: [
      'Plataformas web a medida',
      'Herramientas con IA',
      'Dashboards administrativos',
      'Sistemas internos de negocio',
      'Sistemas de inventario y POS',
      'CRM y gestión de clientes',
      'Automatización de flujos',
      'Integraciones API',
    ],
    startProject: 'Iniciar un proyecto',
  },
  whyChoose: {
    title: 'Construido desde operaciones reales',
    subtitle:
      'Cada producto de DAIEGO nace de necesidades operativas reales: gestionar ventas, controlar stock, registrar horas de empleados, procesar pagos, manejar suscripciones y entender los datos del negocio.',
    pillars: [
      {
        title: 'Operar',
        description:
          'Ejecuta ventas, inventario, equipos y servicios desde módulos conectados.',
      },
      {
        title: 'Automatizar',
        description:
          'Usa IA y flujos de trabajo para reducir tareas repetitivas y mejorar decisiones.',
      },
      {
        title: 'Escalar',
        description:
          'Crece de una operación a múltiples sucursales, productos y ecosistemas digitales.',
      },
    ],
  },
  process: {
    title: 'Nuestro proceso',
    subtitle: 'Un enfoque probado para entregar soluciones de software excepcionales',
    steps: [
      {
        title: 'Descubrir',
        description:
          'Entendemos a fondo tu negocio, desafíos y objetivos mediante una consultoría colaborativa',
      },
      {
        title: 'Diseñar',
        description:
          'Interfaces hermosas y funcionales que resuelven problemas reales y deleitan a tu equipo',
      },
      {
        title: 'Construir',
        description:
          'Código limpio y escalable usando tecnologías modernas y mejores prácticas',
      },
      {
        title: 'Lanzar',
        description:
          'Despliegue fluido y soporte continuo para mantener tus sistemas funcionando',
      },
    ],
  },
  showcase: {
    title: 'Una plataforma. Múltiples módulos.',
    subtitle:
      'Ventas, operaciones, clientes y datos conectados en una sola interfaz modular impulsada por IA.',
    metrics: {
      salesToday: 'Ventas de hoy',
      inventoryAlerts: 'Alertas de inventario',
      employeesActive: 'Empleados activos',
      subscriptionsDue: 'Suscripciones por vencer',
      aiRecommendations: 'Recomendaciones de IA',
      totalUsers: 'Usuarios totales',
      active: 'Activos',
    },
    adminPanel: 'Panel admin',
    dashboard: 'Dashboard',
    performance: 'Rendimiento',
    recentActivity: 'Actividad reciente',
    activityTypes: {
      sale: 'Venta',
      inventory: 'Inventario',
      subscription: 'Suscripción',
    },
    aiAnalyzing: 'IA analizando…',
    restockReady: 'Recomendación de reposición lista',
  },
  techStack: {
    title: 'Tecnologías',
    subtitle:
      'Un stack moderno y enfocado que usamos para diseñar, construir y lanzar la plataforma DAIEGO.',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Bases de datos',
      cloudDevops: 'Cloud y DevOps',
      aiAutomation: 'IA y automatización',
    },
    items: {
      aiAgents: 'Agentes de IA',
      workflowAutomation: 'Automatización de flujos',
    },
  },
  cta: {
    title: 'Construye y opera con DAIEGO',
    subtitle:
      'Una plataforma. Múltiples módulos. Conectados por IA. Cuéntanos sobre tu operación y diseñaremos la solución modular adecuada.',
    startProject: 'Iniciar un proyecto',
    contact: 'Contacto',
    note: 'Respuesta en 24 horas · Sin compromiso · Consulta gratuita',
  },
  footer: {
    tagline: 'Sistema operativo de negocios con IA',
    description:
      'Software modular, herramientas de automatización y plataformas con IA para operar y escalar negocios reales.',
    platform: 'Plataforma',
    apps: 'Apps',
    ecosystems: 'Ecosistemas',
    rights: 'DAIEGO LLC © 2026. Todos los derechos reservados.',
    privacy: 'Política de privacidad',
    terms: 'Términos de servicio',
  },
  social: {
    title: 'Nuestras redes sociales',
    subtitle:
      'Síguenos, descubre novedades y contáctanos directamente. Todo el ecosistema DAIEGO en un solo lugar.',
    visit: 'Visitar →',
    openAriaLabel: 'Abrir {name} en una nueva pestaña',
    backPrompt: '¿Prefieres volver al sitio principal?',
    backLink: 'Ir al inicio',
    links: [
      {
        id: 'tiktok',
        name: 'TikTok',
        description: 'Videos, novedades y contenido detrás de escena de DAIEGO.',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        description: 'Comunidad, anuncios y actualizaciones oficiales.',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        description: 'Fotos, historias y el día a día del ecosistema DAIEGO.',
      },
      {
        id: 'whatsapp-channel',
        name: 'Canal de WhatsApp',
        description: 'Sigue el canal oficial: Toys, Receipts, Streaming y más.',
      },
      {
        id: 'whatsapp-catalog',
        name: 'Catálogo de WhatsApp',
        description: 'Explora productos y servicios disponibles en el catálogo.',
      },
      {
        id: 'whatsapp-direct',
        name: 'Mensaje directo',
        description: 'Escríbenos por WhatsApp y te atendemos directamente.',
      },
    ],
  },
  trust: {
    title: 'La confianza de equipos que exigen más',
    subtitle: 'DAIEGO construye software para empresas que se toman en serio el crecimiento',
    benefits: [
      {
        label: 'Apps web a medida',
        description: 'Aplicaciones adaptadas a las necesidades únicas de tu negocio',
      },
      {
        label: 'Paneles admin',
        description: 'Dashboards potentes para control operativo total',
      },
      {
        label: 'Automatización de negocio',
        description: 'Optimiza flujos de trabajo y reduce tareas manuales',
      },
      {
        label: 'Herramientas internas',
        description: 'Sistemas a medida que crecen con tu negocio',
      },
    ],
    audiencesTitle: 'Construimos software para:',
    audiences: [
      { title: 'Emprendedores', description: 'Construye ideas ambiciosas a escala' },
      {
        title: 'Empresas en crecimiento',
        description: 'Sistemas que escalan con tu éxito',
      },
      { title: 'Equipos de operaciones', description: 'Herramientas diseñadas para eficiencia' },
      {
        title: 'Negocios digitales',
        description: 'Plataformas construidas para el mercado moderno',
      },
    ],
  },
  modularMap: {
    coreLabel: 'OS central',
    labels: {
      store: 'Store',
      clofi: 'Clofi',
      receipts: 'Receipts',
      streaming: 'Streaming',
      toys: 'Toys',
      studio: 'Studio',
      ai: 'Automatización IA',
      reports: 'Reportes',
    },
  },
  operationsFlow: {
    steps: [
      { label: 'Venta', detail: 'Ocurre una venta en DAIEGO Toys' },
      { label: 'Inventario', detail: 'DAIEGO Store actualiza el stock' },
      { label: 'Empleado', detail: 'Clofi registra la actividad del equipo' },
      { label: 'Pago', detail: 'Receipts procesa la transacción' },
      { label: 'Reporte', detail: 'Reports agrega los datos' },
      { label: 'Decisión IA', detail: 'La IA genera una recomendación' },
    ],
  },
}

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
