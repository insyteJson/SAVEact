import type { ElectionOffice, CivicApiResponse } from '../types';

const CIVIC_API_BASE = 'https://www.googleapis.com/civicinfo/v2';

export async function findElectionOffices(
  address: string
): Promise<ElectionOffice[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_CIVIC_API_KEY_MISSING');
  }

  const params = new URLSearchParams({
    address,
    key: apiKey,
    roles: 'legislatorUpperBody',
    levels: 'administrativeArea1',
  });

  const response = await fetch(
    `${CIVIC_API_BASE}/representatives?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Civic API error: ${response.status}`);
  }

  const data: CivicApiResponse = await response.json();
  const offices: ElectionOffice[] = [];

  if (data.offices && data.officials) {
    for (const office of data.offices) {
      for (const index of office.officialIndices) {
        const official = data.officials[index];
        if (official?.address?.[0]) {
          const addr = official.address[0];
          offices.push({
            name: office.name,
            address: [addr.line1, addr.line2, `${addr.city}, ${addr.state} ${addr.zip}`]
              .filter(Boolean)
              .join(', '),
            phone: official.phones?.[0] ?? 'Not available',
          });
        }
      }
    }
  }

  return offices;
}

export function getDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function getPhoneLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
