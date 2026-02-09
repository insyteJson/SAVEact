import { useTranslation } from 'react-i18next';
import { usePrivacy } from '../context/PrivacyContext';

export default function Footer() {
  const { t } = useTranslation();
  const { privacyMode, togglePrivacy } = usePrivacy();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">{t('footer.disclaimer')}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Privacy Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm">{t('privacy.toggle')}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={privacyMode}
                  onChange={togglePrivacy}
                  className="sr-only"
                  aria-label={t('privacy.toggle')}
                />
                <div
                  className={`w-10 h-5 rounded-full transition-colors ${
                    privacyMode ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-0.5 ${
                      privacyMode ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy Description */}
        {privacyMode && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">{t('privacy.description')}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
