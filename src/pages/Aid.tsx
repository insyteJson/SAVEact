import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { aidResources } from '../data/aidResources';
import { getPhoneLink } from '../services/civicApi';

type FilterType = 'all' | 'documents' | 'transportation' | 'legal' | 'cost';

const FILTERS: FilterType[] = ['all', 'documents', 'transportation', 'legal', 'cost'];

export default function Aid() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered =
    activeFilter === 'all'
      ? aidResources
      : aidResources.filter((r) => r.services.includes(activeFilter));

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('aid.title')}
        </h1>
        <p className="text-gray-600 mb-8">{t('aid.subtitle')}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter services">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
              }`}
            >
              {t(`aid.filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="space-y-4">
          {filtered.map((resource) => (
            <article
              key={resource.name}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
                      >
                        {t(`aid.filters.${service}`)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:min-w-[160px]">
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    {t('aid.visitWebsite')}
                  </a>
                  {resource.phone && (
                    <a
                      href={getPhoneLink(resource.phone)}
                      className="text-center bg-green-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      {t('aid.callNow')}: {resource.phone}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No organizations found for this filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
