import type { FinancialAidResource } from '../types';

export const aidResources: FinancialAidResource[] = [
  {
    name: 'VoteRiders',
    description:
      'Helps voters obtain the ID and documents they need to vote. Provides free assistance with birth certificates, state IDs, and other documents.',
    services: ['documents', 'cost', 'legal'],
    website: 'https://www.voteriders.org',
    phone: '(844) 338-8743',
    national: true,
  },
  {
    name: 'Vote.org',
    description:
      'Uses technology to simplify political engagement and increase voter turnout. Provides voter registration tools and election reminders.',
    services: ['documents'],
    website: 'https://www.vote.org',
    national: true,
  },
  {
    name: 'League of Women Voters',
    description:
      'Empowers voters and defends democracy through advocacy, education, and litigation. Local chapters provide voter registration assistance.',
    services: ['documents', 'legal'],
    website: 'https://www.lwv.org',
    phone: '(202) 429-1965',
    national: true,
  },
  {
    name: 'Spread The Vote',
    description:
      'Helps Americans obtain government-issued photo IDs. Covers costs of birth certificates, Social Security cards, and state IDs.',
    services: ['documents', 'cost', 'transportation'],
    website: 'https://www.spreadthevote.org',
    national: true,
  },
  {
    name: 'ACLU - Voting Rights',
    description:
      'Provides legal assistance for voting rights issues and can help with challenges related to voter registration documentation.',
    services: ['legal'],
    website: 'https://www.aclu.org/issues/voting-rights',
    national: true,
  },
  {
    name: 'National Association of Latino Elected Officials (NALEO)',
    description:
      'Provides bilingual voter registration assistance and helps Latino voters navigate documentation requirements.',
    services: ['documents', 'legal'],
    website: 'https://www.naleo.org',
    phone: '(888) 839-8682',
    national: true,
  },
  {
    name: 'Asian Americans Advancing Justice',
    description:
      'Provides multilingual voter assistance and helps Asian American and Pacific Islander communities with voter registration.',
    services: ['documents', 'legal'],
    website: 'https://www.advancingjustice-aajc.org',
    national: true,
  },
  {
    name: 'Native Vote',
    description:
      'Supports Native American and Alaska Native voter participation. Helps with tribal ID and documentation issues.',
    services: ['documents', 'transportation'],
    website: 'https://www.nativevote.org',
    national: true,
  },
  {
    name: 'Campus Vote Project',
    description:
      'Helps college students navigate voter registration, including documentation requirements when registering away from home.',
    services: ['documents'],
    website: 'https://www.campusvoteproject.org',
    national: true,
  },
  {
    name: 'National Disability Rights Network',
    description:
      'Assists voters with disabilities in obtaining necessary documentation and accessing polling places.',
    services: ['documents', 'legal', 'transportation'],
    website: 'https://www.ndrn.org',
    phone: '(202) 408-9514',
    national: true,
  },
];
