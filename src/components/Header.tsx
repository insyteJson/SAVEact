import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { usePrivacy } from '../context/PrivacyContext';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'quiz', path: '/quiz' },
  { key: 'locator', path: '/locator' },
  { key: 'checklist', path: '/checklist' },
  { key: 'aid', path: '/aid' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { privacyMode } = usePrivacy();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Privacy Badge */}
      {privacyMode && (
        <div className="bg-green-700 text-white text-center text-xs py-1 px-4">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {t('app.privacyBadge')}
          </span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-900 no-underline">
            {t('app.title')}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {t(`app.nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 px-2 py-1 rounded border border-gray-300 hover:border-blue-400 transition-colors"
              aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white" aria-label="Mobile navigation">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium no-underline ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t(`app.nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
