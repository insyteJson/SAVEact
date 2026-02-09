import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const featureCards = [
  { key: 'quiz', path: '/quiz', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'locator', path: '/locator', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { key: 'checklist', path: '/checklist', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { key: 'aid', path: '/aid', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t('home.hero')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center bg-white text-blue-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t('home.startQuiz')}
            </Link>
            <Link
              to="/locator"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white/10 transition-colors"
            >
              {t('home.findOffice')}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 px-4 bg-gray-50" aria-label="Features">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => (
            <Link
              key={card.key}
              to={card.path}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`home.features.${card.key}.title`)}
              </h2>
              <p className="text-gray-600 text-sm">
                {t(`home.features.${card.key}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            {t('home.disclaimer')}
          </p>
        </div>
      </section>
    </main>
  );
}
