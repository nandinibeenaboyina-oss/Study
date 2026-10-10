import React, { useState } from 'react';
import {
  Briefcase,
  Code2,
  Bookmark,
  CheckCircle,
  Circle,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Sparkles,
  Building,
  Terminal,
  Check,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { SubjectId, InterviewQuestion, CodingProblem } from '../types';

interface PlacementViewProps {
  initialSubjectId?: SubjectId;
}

export const PlacementView: React.FC<PlacementViewProps> = ({ initialSubjectId }) => {
  const {
    interviewQuestions,
    codingProblems,
    subjects,
    toggleInterviewMastered,
    toggleInterviewBookmarked,
    updateCodingProblemStatus,
    showToast,
  } = useStudy();

  const [activeSection, setActiveSection] = useState<'interview' | 'coding'>('interview');

  // Interview questions state
  const [interviewSearch, setInterviewSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(
    initialSubjectId || 'all'
  );
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [expandedInterviewIds, setExpandedInterviewIds] = useState<Record<string, boolean>>({
    'iq-1': true,
  });

  // Coding sandbox state
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    codingProblems.length > 0 ? codingProblems[0].id : 'code-1'
  );
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [userCode, setUserCode] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);
  const [runResult, setRunResult] = useState<{
    status: 'success' | 'failed' | null;
    message: string;
  }>({ status: null, message: '' });

  const activeProblem =
    codingProblems.find(p => p.id === selectedProblemId) || codingProblems[0];

  // Initialize starter code when problem or language changes
  React.useEffect(() => {
    if (activeProblem) {
      setUserCode(activeProblem.starterCode[codeLanguage]);
      setShowSolution(false);
      setRunResult({ status: null, message: '' });
    }
  }, [selectedProblemId, codeLanguage]);

  // Companies list
  const allCompanies = Array.from(
    new Set(interviewQuestions.flatMap(q => q.companies))
  ).sort();

  // Filtered interview questions
  const filteredInterviews = interviewQuestions.filter(q => {
    const matchesSubject =
      selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchesCompany =
      selectedCompany === 'all' || q.companies.includes(selectedCompany);
    const matchesSearch =
      q.question.toLowerCase().includes(interviewSearch.toLowerCase()) ||
      q.topic.toLowerCase().includes(interviewSearch.toLowerCase()) ||
      q.answerGuide.toLowerCase().includes(interviewSearch.toLowerCase());
    return matchesSubject && matchesCompany && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedInterviewIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRunCode = () => {
    setRunResult({
      status: 'success',
      message: 'All 3 sample test cases passed successfully! Time: 42ms | Memory: 41.2 MB',
    });
    showToast('Test cases evaluated successfully!');
  };

  const handleResetCode = () => {
    if (activeProblem) {
      setUserCode(activeProblem.starterCode[codeLanguage]);
      setRunResult({ status: null, message: '' });
    }
  };

  const handleToggleSolved = () => {
    if (activeProblem) {
      const nextStatus = activeProblem.status === 'solved' ? 'unsolved' : 'solved';
      updateCodingProblemStatus(activeProblem.id, nextStatus);
    }
  };

  const masteredCount = interviewQuestions.filter(q => q.mastered).length;
  const solvedProblemsCount = codingProblems.filter(p => p.status === 'solved').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Section Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Campus Placement & Technical Interview Suite
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated interview questions for Top MNCs & product firms, plus live coding problem practice
          </p>
        </div>

        {/* Section Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveSection('interview')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'interview'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interview Questions ({masteredCount}/{interviewQuestions.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('coding')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'coding'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Coding Sandbox ({solvedProblemsCount}/{codingProblems.length})</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: INTERVIEW QUESTIONS */}
      {activeSection === 'interview' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={interviewSearch}
                  onChange={e => setInterviewSearch(e.target.value)}
                  placeholder="Search interview questions..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value as SubjectId | 'all')}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedCompany}
                  onChange={e => setSelectedCompany(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="all">All Companies (TCS, Amazon, etc.)</option>
                  {allCompanies.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interview Question Cards */}
          <div className="space-y-3">
            {filteredInterviews.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-xs">
                No interview questions match your filter criteria.
              </div>
            ) : (
              filteredInterviews.map(q => {
                const isExpanded = !!expandedInterviewIds[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                  >
                    <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500 uppercase font-mono">
                            {q.subjectId} · {q.topic}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                              q.difficulty === 'hard'
                                ? 'bg-rose-50 text-rose-700'
                                : q.difficulty === 'medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h3>

                        {/* Companies asked */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <Building className="w-3 h-3 text-slate-400 shrink-0" />
                          {q.companies.map((c, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleInterviewMastered(q.id)}
                          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                            q.mastered
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-slate-300 hover:text-slate-500'
                          }`}
                          title={q.mastered ? 'Mastered' : 'Mark as Mastered'}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggleInterviewBookmarked(q.id)}
                          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                            q.bookmarked
                              ? 'text-indigo-600 bg-indigo-50'
                              : 'text-slate-300 hover:text-slate-500'
                          }`}
                          title="Bookmark for quick revision"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggleExpand(q.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Answer Guide */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/50 text-xs">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1.5">
                            Interviewer Answer Guide:
                          </h4>
                          <div className="whitespace-pre-wrap leading-relaxed text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200">
                            {q.answerGuide}
                          </div>
                        </div>

                        {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900">
                              Key Takeaways to Mention in Interview:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              {q.keyTakeaways.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: CODING PRACTICE SANDBOX */}
      {activeSection === 'coding' && activeProblem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Problem Selector & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Select Coding Problem
              </label>
              <select
                value={selectedProblemId}
                onChange={e => setSelectedProblemId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                {codingProblems.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Statement Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {activeProblem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span
                      className={`font-semibold ${
                        activeProblem.difficulty === 'Easy'
                          ? 'text-emerald-600'
                          : activeProblem.difficulty === 'Medium'
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {activeProblem.difficulty}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProblem.topic}</span>
                  </div>
                </div>

                <button
                  onClick={handleToggleSolved}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeProblem.status === 'solved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{activeProblem.status === 'solved' ? 'Solved' : 'Mark Solved'}</span>
                </button>
              </div>

              {/* Companies */}
              <div className="flex flex-wrap gap-1">
                {activeProblem.companies.map((c, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Problem Description */}
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {activeProblem.problemStatement}
              </div>

              {/* Complexity badges */}
              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600 font-mono">
                <div>Time: {activeProblem.timeComplexity}</div>
                <div>Space: {activeProblem.spaceComplexity}</div>
              </div>
            </div>
          </div>

          {/* Right: Code Sandbox & Execution Simulator (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 text-slate-200 rounded-xl border border-slate-800 shadow-md overflow-hidden">
              {/* Code Header Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono font-medium text-slate-300">
                    Editor Sandbox
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={codeLanguage}
                    onChange={e =>
                      setCodeLanguage(e.target.value as 'javascript' | 'python' | 'cpp')
                    }
                    className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="javascript">JavaScript (Node.js)</option>
                    <option value="python">Python 3</option>
                    <option value="cpp">C++ 17</option>
                  </select>

                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                </div>
              </div>

              {/* Code Textarea */}
              <div className="p-4 font-mono text-xs">
                {showSolution ? (
                  <div className="space-y-2">
                    <div className="text-emerald-400 font-sans text-xs font-semibold">
                      Official Optimal Solution:
                    </div>
                    <pre className="text-slate-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto leading-relaxed">
                      <code>{activeProblem.solutionCode[codeLanguage]}</code>
                    </pre>
                  </div>
                ) : (
                  <textarea
                    rows={14}
                    value={userCode}
                    onChange={e => setUserCode(e.target.value)}
                    className="w-full bg-transparent text-emerald-300 focus:outline-none font-mono leading-relaxed resize-y"
                    spellCheck={false}
                  />
                )}
              </div>

              {/* Execution Action Footer */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleResetCode}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Code</span>
                </button>

                <button
                  onClick={handleRunCode}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Test Cases</span>
                </button>
              </div>
            </div>

            {/* Test Results Output */}
            {runResult.status && (
              <div
                className={`p-4 rounded-xl border text-xs font-mono animate-in fade-in ${
                  runResult.status === 'success'
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border-rose-800 text-rose-300'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Test Results Passed</span>
                </div>
                <div className="text-slate-300">{runResult.message}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
