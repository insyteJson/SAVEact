const en = {
  translation: {
    app: {
      title: 'VoterBridge',
      tagline: 'Navigate the SAVE Act. Register to Vote.',
      privacyBadge: 'Privacy Mode: Your data never leaves your device',
      nav: {
        home: 'Home',
        quiz: 'Document Check',
        locator: 'Find Office',
        checklist: 'Checklist',
        aid: 'Financial Aid',
      },
    },
    home: {
      hero: 'Get SAVE-Ready to Register',
      subtitle:
        'The SAVE Act requires documentary proof of citizenship to register to vote. We help you figure out exactly what you need \u2014 for free.',
      startQuiz: 'Check My Documents',
      findOffice: 'Find My Election Office',
      features: {
        quiz: {
          title: 'Document Check',
          description: 'Find out which documents you need based on your situation.',
        },
        locator: {
          title: 'Office Locator',
          description: 'Find your local election office with directions and phone number.',
        },
        checklist: {
          title: 'Go-Bag Checklist',
          description: 'Get a printable checklist customized to your scenario.',
        },
        aid: {
          title: 'Financial Aid',
          description: 'Find organizations that can help cover document costs.',
        },
      },
      disclaimer:
        'VoterBridge is a non-partisan informational tool. We do not store any personal data. Always verify requirements with your local election office.',
    },
    quiz: {
      title: 'SAVE-Ready Document Check',
      subtitle: 'Answer a few questions to find out what you need.',
      citizenship: {
        title: 'How did you become a U.S. citizen?',
        born_in_us: 'Born in the United States',
        naturalized: 'Naturalized citizen',
        born_abroad_us_parent: 'Born abroad to a U.S. citizen parent',
      },
      documents: {
        title: 'Which documents do you currently have?',
        subtitle: 'Select all that apply.',
        us_passport: 'U.S. Passport (book)',
        us_passport_card: 'U.S. Passport Card',
        drivers_license: "Driver's License",
        state_id: 'State ID Card',
        birth_certificate: 'Birth Certificate',
        naturalization_certificate: 'Certificate of Naturalization',
        marriage_license: 'Certified Marriage License',
        court_order: 'Court Order (name change)',
        military_id: 'Military ID (CAC)',
        tribal_id: 'Tribal ID',
      },
      nameCheck: {
        title: 'Does the name on your current ID match your birth certificate?',
        matches: 'Yes, they match exactly',
        changed_marriage: 'No, I changed my name through marriage',
        changed_court_order: 'No, I changed my name through a court order',
        changed_other: 'No, for another reason',
      },
      state: {
        title: 'Which state will you register in?',
        placeholder: 'Select your state',
      },
      results: {
        title: 'Your SAVE-Ready Results',
        ready: "You're SAVE-Ready!",
        readyDesc: 'Based on your answers, you appear to have the documents needed to register.',
        needMore: 'You Need Additional Documents',
        needMoreDesc: "Here's what you still need to gather.",
        bridgeAlert: 'Bridge Document Required',
        bridgeAlertDesc:
          "Because your name doesn't match your birth certificate, you'll need a bridge document to connect your identities.",
        needed: 'Documents You Need',
        have: 'Documents You Have',
        proTip: 'Pro Tip',
        viewChecklist: 'View Full Checklist',
        findOffice: 'Find My Election Office',
        startOver: 'Start Over',
      },
      next: 'Next',
      back: 'Back',
    },
    locator: {
      title: 'Find Your Election Office',
      subtitle: 'Enter your address or ZIP code to find where to register in person.',
      placeholder: 'Enter ZIP code or full address',
      search: 'Search',
      searching: 'Searching...',
      callOffice: 'Call Office',
      getDirections: 'Get Directions',
      verifyHours: 'Always call ahead to verify office hours before traveling.',
      noResults: 'No election offices found for this location. Try a different address or ZIP code.',
      error: 'Unable to search. Please check your API key configuration.',
      apiKeyMissing: 'Google Civic API key not configured. Add VITE_GOOGLE_CIVIC_API_KEY to your .env file.',
    },
    checklist: {
      title: 'Your Go-Bag Checklist',
      subtitle: 'A printable checklist of everything you need to bring to register.',
      selectScenario: 'Select your scenario to generate a checklist:',
      scenarios: {
        standard: 'Standard \u2014 Born in U.S., name matches',
        nameChange: 'Name Change \u2014 Marriage or court order',
        naturalized: 'Naturalized Citizen',
        bornAbroad: 'Born Abroad to U.S. Parent',
      },
      generate: 'Generate Checklist',
      downloadPdf: 'Download PDF',
      print: 'Print Checklist',
      required: 'Required',
      recommended: 'Recommended',
      proTip: 'Pro Tip',
      alternatives: 'Alternatives',
      generalTips: {
        title: 'General Tips',
        tips: [
          'Bring original documents \u2014 photocopies are usually rejected.',
          'Documents must have a raised seal or official certification stamp.',
          'Arrive early \u2014 offices may have long wait times near deadlines.',
          'Bring a pen with black ink for filling out forms.',
          'Have your Social Security Number memorized or written down separately.',
        ],
      },
    },
    aid: {
      title: 'Financial Aid & Assistance',
      subtitle:
        "Getting documents shouldn't be a barrier to voting. These organizations can help.",
      national: 'National Organizations',
      state: 'State/Regional Organizations',
      services: 'Services',
      visitWebsite: 'Visit Website',
      callNow: 'Call Now',
      filters: {
        all: 'All Services',
        documents: 'Document Assistance',
        transportation: 'Transportation',
        legal: 'Legal Help',
        cost: 'Cost Coverage',
      },
    },
    privacy: {
      title: 'Privacy Mode Active',
      description:
        'All data processing happens in your browser. No personal information is sent to any server. When you close this tab, all data is erased.',
      toggle: 'Privacy Mode',
    },
    footer: {
      disclaimer: 'VoterBridge is a non-partisan civic tool. Not affiliated with any government agency.',
      privacy: 'Privacy Policy',
      about: 'About',
    },
  },
};

export default en;
