import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Globe, Github } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Export & Clone from GitHub',
      description: 'Clone the repository to your local computer using Git:',
      code: `git clone https://github.com/your-username/btech-cse-study-planner.git\ncd btech-cse-study-planner`,
    },
    {
      title: '2. Install Dependencies',
      description: 'Ensure Node.js 18+ is installed, then run:',
      code: `npm install`,
    },
    {
      title: '3. Run in Development Mode',
      description: 'Start Vite development server with local live reload:',
      code: `npm run dev`,
    },
    {
      title: '4. Build Production Bundle',
      description: 'Compile the optimized static bundle:',
      code: `npm run build`,
    },
    {
      title: '5. Deploy to Vercel (Recommended - Free Tier)',
      description: 'Deploy instantly with zero configuration using Vercel CLI or GitHub Integration:',
      code: `npx vercel deploy --prod`,
    },
    {
      title: '6. Deploy to Netlify / GitHub Pages',
      description: 'Build command: "npm run build" | Publish directory: "dist"',
      code: `# For Netlify CLI:\nnpx netlify deploy --prod --dir=dist`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-800" />
            <h2 className="text-base font-semibold text-slate-900">
              GitHub Export & Deployment Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900 leading-relaxed">
            <p className="font-semibold mb-1">Self-Contained & Production-Ready</p>
            This application is engineered with standard Vite, React 19, and Tailwind CSS.
            All user data, study goals, custom tasks, notes, and quiz performance persist seamlessly
            in the browser’s local storage with zero complex database setup required. It is 100% compatible
            with GitHub repositories, Vercel, Netlify, and Cloud Run.
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-semibold text-slate-900 text-xs">{step.title}</h3>
                  <button
                    onClick={() => copyToClipboard(step.code, idx)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-md text-xs font-mono overflow-x-auto">
                  <code>{step.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 rounded-lg p-3.5 bg-white">
            <h3 className="text-xs font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Environment Variables Configuration</span>
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              No mandatory external database credentials are required. If using optional AI acceleration:
            </p>
            <div className="p-2.5 bg-slate-100 rounded-md text-xs font-mono text-slate-800">
              VITE_APP_URL="http://localhost:3000"
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
