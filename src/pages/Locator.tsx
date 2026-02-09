import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ElectionOffice } from '../types';
import { findElectionOffices, getDirectionsUrl, getPhoneLink } from '../services/civicApi';

export default function Locator() {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  const [offices, setOffices] = useState<ElectionOffice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const results = await findElectionOffices(address.trim());
      setOffices(results);
    } catch (err) {
      if (err instanceof Error && err.message === 'GOOGLE_CIVIC_API_KEY_MISSING') {
        setError(t('locator.apiKeyMissing'));
      } else {
        setError(t('locator.error'));
      }
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('locator.title')}
        </h1>
        <p className="text-gray-600 mb-8">{t('locator.subtitle')}</p>

        {!apiKey && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6" role="alert">
            <p className="text-yellow-800 text-sm">{t('locator.apiKeyMissing')}</p>
          </div>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('locator.placeholder')}
              className="flex-1 p-3 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
              aria-label={t('locator.placeholder')}
            />
            <button
              type="submit"
              disabled={loading || !address.trim()}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('locator.searching') : t('locator.search')}
            </button>
          </div>
        </form>

        {/* Verify Hours Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm font-medium">{t('locator.verifyHours')}</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* No Results */}
        {searched && !loading && !error && offices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('locator.noResults')}</p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {offices.map((office, index) => (
            <article
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{office.name}</h2>
              <p className="text-gray-600 mb-4">{office.address}</p>
              {office.hours && (
                <p className="text-sm text-gray-500 mb-4">{office.hours}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getPhoneLink(office.phone)}
                  className="flex-1 text-center bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  aria-label={`${t('locator.callOffice')}: ${office.phone}`}
                >
                  {t('locator.callOffice')}: {office.phone}
                </a>
                <a
                  href={getDirectionsUrl(office.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('locator.getDirections')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
