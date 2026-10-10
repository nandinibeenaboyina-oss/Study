import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useStudy } from '../context/StudyContext';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { exportDataAsJSON, importDataFromJSON, resetToDefaults } = useStudy();
  const [importJsonText, setImportJsonText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setImportJsonText(content);
      const res = importDataFromJSON(content);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Data restored successfully from backup file!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Failed to parse JSON file.',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!importJsonText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste valid JSON content.' });
      return;
    }
    const res = importDataFromJSON(importJsonText);
    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: 'Data restored successfully from text!',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Invalid JSON format.',
      });
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to restore default B.Tech CSE syllabus and study tasks? Any custom tasks or notes will be reset.'
      )
    ) {
      resetToDefaults();
      setStatusMessage({
        type: 'success',
        text: 'Reset to default B.Tech CSE curriculum and sample datasets.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Backup & Data Persistence</span>
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Section 1: Export */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <h3 className="font-semibold text-slate-900 mb-1">Export Full Backup</h3>
            <p className="text-xs text-slate-600 mb-3">
              Download your entire study planner data, customized notes, tasks,
              exam countdowns, and quiz scores as an offline JSON file.
            </p>
            <button
              onClick={exportDataAsJSON}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Section 2: Import */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
            <h3 className="font-semibold text-slate-900">Restore / Import Backup</h3>
            <p className="text-xs text-slate-600">
              Restore your study data from a previously downloaded JSON backup file.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Upload Backup File (.json)
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Or Paste JSON Content
              </label>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={e => setImportJsonText(e.target.value)}
                placeholder='{"version": 1, "tasks": [...]}'
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={handleManualImport}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Apply Pasted Data</span>
              </button>
            </div>
          </div>

          {/* Section 3: Reset */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">Reset to Defaults</h3>
              <p className="text-xs text-slate-600">
                Restore the default curated 7 B.Tech CSE subjects syllabus and initial tasks.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
