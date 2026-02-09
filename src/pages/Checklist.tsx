import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChecklistResult, UserScenario } from '../types';
import { evaluateDocuments } from '../services/documentLogic';
import { generateChecklistPdf } from '../services/pdfGenerator';

type ScenarioKey = 'standard' | 'nameChange' | 'naturalized' | 'bornAbroad';

const PRESET_SCENARIOS: Record<ScenarioKey, UserScenario> = {
  standard: {
    citizenshipPath: 'born_in_us',
    documentsHeld: ['birth_certificate', 'drivers_license'],
    nameMatchStatus: 'matches',
    state: '',
  },
  nameChange: {
    citizenshipPath: 'born_in_us',
    documentsHeld: ['birth_certificate', 'drivers_license'],
    nameMatchStatus: 'changed_marriage',
    state: '',
  },
  naturalized: {
    citizenshipPath: 'naturalized',
    documentsHeld: ['naturalization_certificate', 'drivers_license'],
    nameMatchStatus: 'matches',
    state: '',
  },
  bornAbroad: {
    citizenshipPath: 'born_abroad_us_parent',
    documentsHeld: ['drivers_license'],
    nameMatchStatus: 'matches',
    state: '',
  },
};

export default function Checklist() {
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey | null>(null);
  const [checklist, setChecklist] = useState<ChecklistResult | null>(null);

  const handleGenerate = () => {
    if (!selectedScenario) return;
    const result = evaluateDocuments(PRESET_SCENARIOS[selectedScenario]);
    setChecklist(result);
  };

  const handleDownloadPdf = () => {
    if (!checklist) return;
    generateChecklistPdf(checklist);
  };

  const handlePrint = () => {
    window.print();
  };

  const scenarioKeys: ScenarioKey[] = ['standard', 'nameChange', 'naturalized', 'bornAbroad'];

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('checklist.title')}
        </h1>
        <p className="text-gray-600 mb-8">{t('checklist.subtitle')}</p>

        {/* Scenario Selection */}
        {!checklist && (
          <div>
            <p className="font-medium text-gray-900 mb-4">{t('checklist.selectScenario')}</p>
            <fieldset className="space-y-3 mb-6">
              <legend className="sr-only">Select scenario</legend>
              {scenarioKeys.map((key) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedScenario === key
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="scenario"
                    value={key}
                    checked={selectedScenario === key}
                    onChange={() => setSelectedScenario(key)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">{t(`checklist.scenarios.${key}`)}</span>
                </label>
              ))}
            </fieldset>
            <button
              onClick={handleGenerate}
              disabled={!selectedScenario}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('checklist.generate')}
            </button>
          </div>
        )}

        {/* Generated Checklist */}
        {checklist && (
          <div className="print:shadow-none" id="checklist-content">
            {/* Actions */}
            <div className="flex gap-3 mb-6" data-print-hidden>
              <button
                onClick={handleDownloadPdf}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('checklist.downloadPdf')}
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {t('checklist.print')}
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">{checklist.scenarioLabel}</h2>

            {/* Warnings */}
            {checklist.warnings.map((warning, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4" role="alert">
                <p className="text-amber-800 text-sm font-medium">{warning}</p>
              </div>
            ))}

            {/* Bridge Documents */}
            {checklist.bridgeDocumentsNeeded.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-amber-800 mb-3">Bridge Documents</h3>
                {checklist.bridgeDocumentsNeeded.map((doc, i) => (
                  <label key={i} className="flex items-center gap-3 py-2">
                    <input type="checkbox" className="rounded border-gray-400 text-blue-600" />
                    <span className="font-medium text-amber-900">{doc}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Document Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documents Checklist
              </h3>
              <div className="space-y-4">
                {checklist.requirements.map((req, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded border-gray-400 text-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{req.document}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            req.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {req.required ? t('checklist.required') : t('checklist.recommended')}
                          </span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1 bg-blue-50 rounded p-2">
                          {t('checklist.proTip')}: {req.proTip}
                        </p>
                        {req.alternatives && req.alternatives.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {t('checklist.alternatives')}: {req.alternatives.join(', ')}
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* General Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                {t('checklist.generalTips.title')}
              </h3>
              <ul className="space-y-2">
                {(t('checklist.generalTips.tips', { returnObjects: true }) as string[]).map(
                  (tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <span className="mt-0.5 flex-shrink-0">*</span>
                      <span>{tip}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Back button */}
            <button
              onClick={() => setChecklist(null)}
              className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              data-print-hidden
            >
              Choose Different Scenario
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
