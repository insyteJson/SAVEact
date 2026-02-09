import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { UserScenario, DocumentType, CitizenshipPath, NameMatchStatus, QuizStep } from '../types';
import { evaluateDocuments, getQuickStatus } from '../services/documentLogic';
import { US_STATES } from '../data/states';

const DOCUMENT_OPTIONS: DocumentType[] = [
  'us_passport',
  'us_passport_card',
  'drivers_license',
  'state_id',
  'birth_certificate',
  'naturalization_certificate',
  'marriage_license',
  'court_order',
  'military_id',
  'tribal_id',
];

const CITIZENSHIP_OPTIONS: CitizenshipPath[] = [
  'born_in_us',
  'naturalized',
  'born_abroad_us_parent',
];

const NAME_OPTIONS: NameMatchStatus[] = [
  'matches',
  'changed_marriage',
  'changed_court_order',
  'changed_other',
];

const STEPS: QuizStep[] = ['citizenship', 'documents', 'name_check', 'state', 'results'];

export default function Quiz() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [scenario, setScenario] = useState<UserScenario>({
    citizenshipPath: null,
    documentsHeld: [],
    nameMatchStatus: null,
    state: '',
  });

  const step = STEPS[currentStep];
  const result = step === 'results' ? evaluateDocuments(scenario) : null;
  const status = step === 'results' ? getQuickStatus(scenario) : null;

  const canAdvance = () => {
    switch (step) {
      case 'citizenship':
        return scenario.citizenshipPath !== null;
      case 'documents':
        return scenario.documentsHeld.length > 0;
      case 'name_check':
        return scenario.nameMatchStatus !== null;
      case 'state':
        return scenario.state !== '';
      default:
        return false;
    }
  };

  const toggleDocument = (doc: DocumentType) => {
    setScenario((prev) => ({
      ...prev,
      documentsHeld: prev.documentsHeld.includes(doc)
        ? prev.documentsHeld.filter((d) => d !== doc)
        : [...prev.documentsHeld, doc],
    }));
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScenario({
      citizenshipPath: null,
      documentsHeld: [],
      nameMatchStatus: null,
      state: '',
    });
  };

  const progressPercent = ((currentStep) / (STEPS.length - 1)) * 100;

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('quiz.title')}
        </h1>
        <p className="text-gray-600 mb-6">{t('quiz.subtitle')}</p>

        {/* Progress Bar */}
        {step !== 'results' && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Step {currentStep + 1} of {STEPS.length - 1}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Step: Citizenship */}
        {step === 'citizenship' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('quiz.citizenship.title')}
            </h2>
            <fieldset className="space-y-3">
              <legend className="sr-only">{t('quiz.citizenship.title')}</legend>
              {CITIZENSHIP_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    scenario.citizenshipPath === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="citizenship"
                    value={option}
                    checked={scenario.citizenshipPath === option}
                    onChange={() => setScenario((prev) => ({ ...prev, citizenshipPath: option }))}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">{t(`quiz.citizenship.${option}`)}</span>
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {/* Step: Documents */}
        {step === 'documents' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {t('quiz.documents.title')}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{t('quiz.documents.subtitle')}</p>
            <fieldset className="space-y-3">
              <legend className="sr-only">{t('quiz.documents.title')}</legend>
              {DOCUMENT_OPTIONS.map((doc) => (
                <label
                  key={doc}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    scenario.documentsHeld.includes(doc)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={scenario.documentsHeld.includes(doc)}
                    onChange={() => toggleDocument(doc)}
                    className="rounded text-blue-600"
                  />
                  <span className="text-gray-900">{t(`quiz.documents.${doc}`)}</span>
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {/* Step: Name Check */}
        {step === 'name_check' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('quiz.nameCheck.title')}
            </h2>
            <fieldset className="space-y-3">
              <legend className="sr-only">{t('quiz.nameCheck.title')}</legend>
              {NAME_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    scenario.nameMatchStatus === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="nameMatch"
                    value={option}
                    checked={scenario.nameMatchStatus === option}
                    onChange={() => setScenario((prev) => ({ ...prev, nameMatchStatus: option }))}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">{t(`quiz.nameCheck.${option}`)}</span>
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {/* Step: State */}
        {step === 'state' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('quiz.state.title')}
            </h2>
            <select
              value={scenario.state}
              onChange={(e) => setScenario((prev) => ({ ...prev, state: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 focus:border-blue-600 focus:outline-none"
              aria-label={t('quiz.state.title')}
            >
              <option value="">{t('quiz.state.placeholder')}</option>
              {US_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step: Results */}
        {step === 'results' && result && (
          <div>
            {/* Status Banner */}
            {status === 'ready' && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-green-800 mb-2">{t('quiz.results.ready')}</h2>
                <p className="text-green-700">{t('quiz.results.readyDesc')}</p>
              </div>
            )}
            {status === 'bridge_needed' && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-amber-800 mb-2">{t('quiz.results.bridgeAlert')}</h2>
                <p className="text-amber-700">{t('quiz.results.bridgeAlertDesc')}</p>
                <ul className="mt-3 space-y-1">
                  {result.bridgeDocumentsNeeded.map((doc, i) => (
                    <li key={i} className="font-semibold text-amber-900">• {doc}</li>
                  ))}
                </ul>
              </div>
            )}
            {status === 'needs_more' && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-red-800 mb-2">{t('quiz.results.needMore')}</h2>
                <p className="text-red-700">{t('quiz.results.needMoreDesc')}</p>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.map((warning, i) => (
              <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3" role="alert">
                <p className="text-yellow-800 text-sm">{warning}</p>
              </div>
            ))}

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quiz.results.needed')}</h3>
              <div className="space-y-3">
                {result.requirements.map((req, i) => (
                  <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900">{req.document}</p>
                    <p className="text-sm text-blue-700 mt-1 bg-blue-50 rounded p-2">
                      {t('quiz.results.proTip')}: {req.proTip}
                    </p>
                    {req.alternatives && req.alternatives.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Alternatives: {req.alternatives.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                to="/checklist"
                className="w-full text-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('quiz.results.viewChecklist')}
              </Link>
              <Link
                to="/locator"
                className="w-full text-center bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('quiz.results.findOffice')}
              </Link>
              <button
                onClick={resetQuiz}
                className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('quiz.results.startOver')}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step !== 'results' && (
          <div className="flex gap-3 mt-8">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('quiz.back')}
              </button>
            )}
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canAdvance()}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('quiz.next')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
