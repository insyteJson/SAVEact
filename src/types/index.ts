export type DocumentType =
  | 'us_passport'
  | 'us_passport_card'
  | 'drivers_license'
  | 'state_id'
  | 'birth_certificate'
  | 'naturalization_certificate'
  | 'marriage_license'
  | 'court_order'
  | 'military_id'
  | 'tribal_id';

export type CitizenshipPath =
  | 'born_in_us'
  | 'naturalized'
  | 'born_abroad_us_parent';

export type NameMatchStatus =
  | 'matches'
  | 'changed_marriage'
  | 'changed_court_order'
  | 'changed_other';

export interface UserScenario {
  citizenshipPath: CitizenshipPath | null;
  documentsHeld: DocumentType[];
  nameMatchStatus: NameMatchStatus | null;
  state: string;
}

export interface DocumentRequirement {
  document: string;
  required: boolean;
  proTip: string;
  alternatives?: string[];
}

export interface ChecklistResult {
  scenarioLabel: string;
  requirements: DocumentRequirement[];
  bridgeDocumentsNeeded: string[];
  warnings: string[];
}

export interface ElectionOffice {
  name: string;
  address: string;
  phone: string;
  hours?: string;
}

export interface CivicApiResponse {
  officials?: Array<{
    name: string;
    phones?: string[];
    address?: Array<{
      line1: string;
      line2?: string;
      city: string;
      state: string;
      zip: string;
    }>;
  }>;
  offices?: Array<{
    name: string;
    officialIndices: number[];
  }>;
}

export interface FinancialAidResource {
  name: string;
  description: string;
  services: string[];
  website: string;
  phone?: string;
  national: boolean;
  states?: string[];
}

export type QuizStep =
  | 'citizenship'
  | 'documents'
  | 'name_check'
  | 'state'
  | 'results';
