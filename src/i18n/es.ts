const es = {
  translation: {
    app: {
      title: 'VoterBridge',
      tagline: 'Navega la Ley SAVE. Regístrate para votar.',
      privacyBadge: 'Modo privado: Sus datos nunca salen de su dispositivo',
      nav: {
        home: 'Inicio',
        quiz: 'Verificar Documentos',
        locator: 'Buscar Oficina',
        checklist: 'Lista de Verificación',
        aid: 'Ayuda Financiera',
      },
    },
    home: {
      hero: 'Prepárate para la Ley SAVE',
      subtitle:
        'La Ley SAVE requiere prueba documental de ciudadanía para registrarse para votar. Te ayudamos a determinar exactamente lo que necesitas — gratis.',
      startQuiz: 'Verificar Mis Documentos',
      findOffice: 'Buscar Mi Oficina Electoral',
      features: {
        quiz: {
          title: 'Verificación de Documentos',
          description: 'Descubre qué documentos necesitas según tu situación.',
        },
        locator: {
          title: 'Localizador de Oficinas',
          description: 'Encuentra tu oficina electoral local con direcciones y número de teléfono.',
        },
        checklist: {
          title: 'Lista para Llevar',
          description: 'Obtén una lista imprimible personalizada para tu situación.',
        },
        aid: {
          title: 'Ayuda Financiera',
          description: 'Encuentra organizaciones que pueden ayudar a cubrir los costos de documentos.',
        },
      },
      disclaimer:
        'VoterBridge es una herramienta informativa no partidista. No almacenamos ningún dato personal. Siempre verifique los requisitos con su oficina electoral local.',
    },
    quiz: {
      title: 'Verificación de Documentos SAVE',
      subtitle: 'Responda algunas preguntas para saber qué necesita.',
      citizenship: {
        title: '¿Cómo se convirtió en ciudadano estadounidense?',
        born_in_us: 'Nacido/a en los Estados Unidos',
        naturalized: 'Ciudadano/a naturalizado/a',
        born_abroad_us_parent: 'Nacido/a en el extranjero de padre/madre estadounidense',
      },
      documents: {
        title: '¿Qué documentos tiene actualmente?',
        subtitle: 'Seleccione todos los que apliquen.',
        us_passport: 'Pasaporte de EE.UU. (libro)',
        us_passport_card: 'Tarjeta de Pasaporte de EE.UU.',
        drivers_license: 'Licencia de Conducir',
        state_id: 'Tarjeta de Identificación Estatal',
        birth_certificate: 'Certificado de Nacimiento',
        naturalization_certificate: 'Certificado de Naturalización',
        marriage_license: 'Licencia de Matrimonio Certificada',
        court_order: 'Orden Judicial (cambio de nombre)',
        military_id: 'Identificación Militar (CAC)',
        tribal_id: 'Identificación Tribal',
      },
      nameCheck: {
        title: '¿El nombre en su identificación actual coincide con su certificado de nacimiento?',
        matches: 'Sí, coinciden exactamente',
        changed_marriage: 'No, cambié mi nombre por matrimonio',
        changed_court_order: 'No, cambié mi nombre por orden judicial',
        changed_other: 'No, por otra razón',
      },
      state: {
        title: '¿En qué estado se registrará?',
        placeholder: 'Seleccione su estado',
      },
      results: {
        title: 'Sus Resultados SAVE',
        ready: '¡Está listo para SAVE!',
        readyDesc: 'Según sus respuestas, parece tener los documentos necesarios para registrarse.',
        needMore: 'Necesita Documentos Adicionales',
        needMoreDesc: 'Esto es lo que aún necesita reunir.',
        bridgeAlert: 'Documento Puente Requerido',
        bridgeAlertDesc:
          'Debido a que su nombre no coincide con su certificado de nacimiento, necesitará un documento puente para conectar sus identidades.',
        needed: 'Documentos que Necesita',
        have: 'Documentos que Tiene',
        proTip: 'Consejo',
        viewChecklist: 'Ver Lista Completa',
        findOffice: 'Buscar Mi Oficina Electoral',
        startOver: 'Comenzar de Nuevo',
      },
      next: 'Siguiente',
      back: 'Atrás',
    },
    locator: {
      title: 'Encuentre Su Oficina Electoral',
      subtitle: 'Ingrese su dirección o código postal para encontrar dónde registrarse en persona.',
      placeholder: 'Ingrese código postal o dirección completa',
      search: 'Buscar',
      searching: 'Buscando...',
      callOffice: 'Llamar a la Oficina',
      getDirections: 'Obtener Direcciones',
      verifyHours: 'Siempre llame antes para verificar el horario de la oficina antes de viajar.',
      noResults: 'No se encontraron oficinas electorales para esta ubicación. Intente con otra dirección o código postal.',
      error: 'No se pudo buscar. Verifique la configuración de su clave API.',
      apiKeyMissing: 'Clave API de Google Civic no configurada. Agregue VITE_GOOGLE_CIVIC_API_KEY a su archivo .env.',
    },
    checklist: {
      title: 'Su Lista de Verificación',
      subtitle: 'Una lista imprimible de todo lo que necesita llevar para registrarse.',
      selectScenario: 'Seleccione su situación para generar una lista:',
      scenarios: {
        standard: 'Estándar — Nacido en EE.UU., nombre coincide',
        nameChange: 'Cambio de Nombre — Matrimonio u orden judicial',
        naturalized: 'Ciudadano Naturalizado',
        bornAbroad: 'Nacido en el Extranjero de Padre/Madre Estadounidense',
      },
      generate: 'Generar Lista',
      downloadPdf: 'Descargar PDF',
      print: 'Imprimir Lista',
      required: 'Requerido',
      recommended: 'Recomendado',
      proTip: 'Consejo',
      alternatives: 'Alternativas',
      generalTips: {
        title: 'Consejos Generales',
        tips: [
          'Traiga documentos originales — las fotocopias generalmente son rechazadas.',
          'Los documentos deben tener un sello en relieve o sello de certificación oficial.',
          'Llegue temprano — las oficinas pueden tener largas esperas cerca de las fechas límite.',
          'Traiga un bolígrafo con tinta negra para llenar formularios.',
          'Tenga su Número de Seguro Social memorizado o escrito por separado.',
        ],
      },
    },
    aid: {
      title: 'Ayuda Financiera y Asistencia',
      subtitle:
        'Obtener documentos no debería ser una barrera para votar. Estas organizaciones pueden ayudar.',
      national: 'Organizaciones Nacionales',
      state: 'Organizaciones Estatales/Regionales',
      services: 'Servicios',
      visitWebsite: 'Visitar Sitio Web',
      callNow: 'Llamar Ahora',
      filters: {
        all: 'Todos los Servicios',
        documents: 'Asistencia con Documentos',
        transportation: 'Transporte',
        legal: 'Ayuda Legal',
        cost: 'Cobertura de Costos',
      },
    },
    privacy: {
      title: 'Modo Privado Activo',
      description:
        'Todo el procesamiento de datos ocurre en su navegador. Ninguna información personal se envía a ningún servidor. Cuando cierre esta pestaña, todos los datos se borran.',
      toggle: 'Modo Privado',
    },
    footer: {
      disclaimer: 'VoterBridge es una herramienta cívica no partidista. No está afiliada con ninguna agencia gubernamental.',
      privacy: 'Política de Privacidad',
      about: 'Acerca de',
    },
  },
};

export default es;
