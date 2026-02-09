import type {
  UserScenario,
  ChecklistResult,
  DocumentRequirement,
  DocumentType,
} from '../types';

const PROOF_OF_CITIZENSHIP_DOCS: DocumentType[] = [
  'us_passport',
  'us_passport_card',
  'birth_certificate',
  'naturalization_certificate',
];

function hasAny(held: DocumentType[], check: DocumentType[]): boolean {
  return check.some((doc) => held.includes(doc));
}

export function evaluateDocuments(scenario: UserScenario): ChecklistResult {
  const { citizenshipPath, documentsHeld, nameMatchStatus } = scenario;
  const requirements: DocumentRequirement[] = [];
  const bridgeDocumentsNeeded: string[] = [];
  const warnings: string[] = [];

  let scenarioLabel = 'Standard Registration';

  const hasPassport = hasAny(documentsHeld, ['us_passport', 'us_passport_card']);

  if (hasPassport) {
    // Passport is the simplest path — it proves citizenship and identity
    requirements.push({
      document: 'U.S. Passport or Passport Card',
      required: true,
      proTip:
        'A valid U.S. Passport is the strongest single document. It proves both citizenship and identity.',
    });
  } else if (citizenshipPath === 'born_in_us') {
    scenarioLabel = 'Born in U.S. Registration';
    requirements.push({
      document: 'Birth Certificate (certified copy)',
      required: true,
      proTip:
        'Must be a certified copy with a raised seal. Hospital-issued or decorative certificates are NOT accepted. Order from your state vital records office.',
      alternatives: ['U.S. Passport', 'U.S. Passport Card'],
    });

    if (!documentsHeld.includes('birth_certificate')) {
      warnings.push(
        'You will need to obtain a certified birth certificate. Contact your state vital records office. Costs typically range from $10-$30.'
      );
    }
  } else if (citizenshipPath === 'naturalized') {
    scenarioLabel = 'Naturalized Citizen Registration';
    requirements.push({
      document: 'Certificate of Naturalization (N-550 or N-570)',
      required: true,
      proTip:
        'This is the certificate issued by USCIS when you became a citizen. If lost, file Form N-565 to replace it. A U.S. Passport also works.',
      alternatives: ['U.S. Passport', 'U.S. Passport Card'],
    });

    if (!documentsHeld.includes('naturalization_certificate') && !hasPassport) {
      warnings.push(
        'You will need your Certificate of Naturalization or a U.S. Passport. Replacing a lost naturalization certificate can take several months — start early.'
      );
    }
  } else if (citizenshipPath === 'born_abroad_us_parent') {
    scenarioLabel = 'Born Abroad to U.S. Parent';
    requirements.push({
      document: 'Consular Report of Birth Abroad (FS-240) or Certificate of Citizenship',
      required: true,
      proTip:
        'If you have a U.S. Passport, that is sufficient proof. Otherwise you will need your Consular Report of Birth Abroad or a Certificate of Citizenship (N-600).',
      alternatives: ['U.S. Passport', 'U.S. Passport Card'],
    });
  }

  // Photo ID requirement (most states require this for in-person registration)
  if (!hasPassport) {
    requirements.push({
      document: 'Government-issued Photo ID',
      required: true,
      proTip:
        'A driver\'s license, state ID, or military ID with your photo. The name must match or be connectable via bridge documents.',
      alternatives: ['Driver\'s License', 'State ID Card', 'Military ID', 'Tribal ID'],
    });
  }

  // Name mismatch — bridge documents
  if (nameMatchStatus === 'changed_marriage') {
    scenarioLabel = 'Name Change (Marriage) Registration';
    bridgeDocumentsNeeded.push('Certified Marriage License');
    requirements.push({
      document: 'Certified Marriage License',
      required: true,
      proTip:
        'Must be a certified copy from the county where you were married — not the decorative one from the ceremony. Costs typically $10-$25.',
    });
    warnings.push(
      'Your name does not match your birth certificate. You MUST bring a certified marriage license to bridge the name difference.'
    );
  } else if (nameMatchStatus === 'changed_court_order') {
    scenarioLabel = 'Name Change (Court Order) Registration';
    bridgeDocumentsNeeded.push('Certified Court Order for Name Change');
    requirements.push({
      document: 'Certified Court Order for Name Change',
      required: true,
      proTip:
        'Must be a certified copy from the court that issued the order. Contact the court clerk in the jurisdiction where the name change was granted.',
    });
    warnings.push(
      'Your name does not match your birth certificate. You MUST bring the certified court order to bridge the name difference.'
    );
  } else if (nameMatchStatus === 'changed_other') {
    bridgeDocumentsNeeded.push('Legal documentation of name change');
    warnings.push(
      'Your name does not match your birth certificate. You will need legal documentation proving the name change. Contact your local election office for specific requirements.'
    );
  }

  // Always recommend proof of residency
  requirements.push({
    document: 'Proof of Residency',
    required: true,
    proTip:
      'Utility bill, bank statement, or government document showing your current address. Must be recent (within 30-90 days depending on state).',
    alternatives: [
      'Utility bill',
      'Bank statement',
      'Government mail',
      'Lease agreement',
      'Pay stub with address',
    ],
  });

  // Proof of Social Security Number
  requirements.push({
    document: 'Social Security Number',
    required: true,
    proTip:
      'You don\'t need the physical card — just the number. But having the card can help if there are questions. Never leave your SS card at the office.',
  });

  return {
    scenarioLabel,
    requirements,
    bridgeDocumentsNeeded,
    warnings,
  };
}

export function getQuickStatus(scenario: UserScenario): 'ready' | 'needs_more' | 'bridge_needed' {
  const result = evaluateDocuments(scenario);

  if (result.bridgeDocumentsNeeded.length > 0) {
    return 'bridge_needed';
  }

  const hasProof = hasAny(scenario.documentsHeld, PROOF_OF_CITIZENSHIP_DOCS);
  const hasPhotoId =
    hasAny(scenario.documentsHeld, ['us_passport', 'us_passport_card']) ||
    hasAny(scenario.documentsHeld, ['drivers_license', 'state_id', 'military_id', 'tribal_id']);

  if (hasProof && hasPhotoId) {
    return 'ready';
  }

  return 'needs_more';
}
