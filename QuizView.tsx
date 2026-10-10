import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  Flag,
  Plus,
  History,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { QuizQuestion, SubjectId, QuizAttempt } from '../types';

interface QuizViewProps {
  initialSubjectId?: SubjectId;
}

export const QuizView: React.FC<QuizViewProps> = ({ initialSubjectId }) => {
  const {
    quizQuestions,
    subjects,
    recordQuizAttempt,
    quizAttempts,
    addCustomQuestion,
  } = useStudy();

  // Quiz state
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(
    initialSubjectId || 'all'
  );
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('exam');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Active quiz session data
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [startTime, setStartTime] = useState<number>(0);

  // Custom question modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customSubject, setCustomSubject] = useState<SubjectId>('dbms');
  const [customTopic, setCustomTopic] = useState('');
  const [customDifficulty, setCustomDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [customQuestionText, setCustomQuestionText] = useState('');
  const [customOptions, setCustomOptions] = useState(['', '', '', '']);
  const [customCorrectIndex, setCustomCorrectIndex] = useState(0);
  const [customExplanation, setCustomExplanation] = useState('');
  const [addModalError, setAddModalError] = useState('');

  // Timer countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isQuizActive && !isQuizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isQuizActive, isQuizFinished, timeLeft]);

  // Start Quiz
  const handleStartQuiz = () => {
    const pool =
      selectedSubject === 'all'
        ? [...quizQuestions]
        : quizQuestions.filter(q => q.subjectId === selectedSubject);

    if (pool.length === 0) return;

    // Shuffle and pick up to 10 questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(shuffled.length * 60); // 60s per question
    setStartTime(Date.now());
    setIsQuizActive(true);
    setIsQuizFinished(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    const q = activeQuestions[currentIndex];
    setUserAnswers(prev => ({
      ...prev,
      [q.id]: optionIndex,
    }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleFinishQuiz = () => {
    setIsQuizFinished(true);
    setIsQuizActive(false);

    // Calculate score
    let correctCount = 0;
    const answerBreakdown = activeQuestions.map(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect,
      };
    });

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    const subjectObj = subjects.find(s => s.id === selectedSubject);
    const subjectName = selectedSubject === 'all' ? 'All 7 Subjects Exam' : subjectObj?.name || 'Subject Quiz';

    recordQuizAttempt({
      subjectId: selectedSubject,
      subjectName,
      totalQuestions: activeQuestions.length,
      score: correctCount,
      percentage,
      timeTakenSeconds: elapsedSeconds,
      answers: answerBreakdown,
    });
  };

  const handleSaveCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestionText.trim()) {
      setAddModalError('Please enter the question text');
      return;
    }
    if (customOptions.some(opt => !opt.trim())) {
      setAddModalError('Please fill all 4 options');
      return;
    }
    if (!customExplanation.trim()) {
      setAddModalError('Please provide an explanation for the correct answer');
      return;
    }

    addCustomQuestion({
      subjectId: customSubject,
      topic: customTopic.trim() || 'General Concept',
      difficulty: customDifficulty,
      question: customQuestionText.trim(),
      options: customOptions.map(o => o.trim()),
      correctAnswerIndex: customCorrectIndex,
      explanation: customExplanation.trim(),
    });

    setIsAddModalOpen(false);
    setCustomQuestionText('');
    setCustomOptions(['', '', '', '']);
    setCustomExplanation('');
    setAddModalError('');
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = activeQuestions[currentIndex];
  const isAnswered = currentQ ? userAnswers[currentQ.id] !== undefined : false;

  // Active subject question count
  const availableCount =
    selectedSubject === 'all'
      ? quizQuestions.length
      : quizQuestions.filter(q => q.subjectId === selectedSubject).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Quiz Launch Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Interactive Exam & Quiz Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Multiple-choice assessments with immediate scoring and comprehensive technical explanations
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom MCQ</span>
        </button>
      </div>

      {/* Main View: Pre-quiz setup OR Active Quiz OR Finished Results */}
      {!isQuizActive && !isQuizFinished && (
        <div className="space-y-6">
          {/* Quiz Configuration Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h2 className="text-sm font-bold text-slate-900">
              Configure Quiz Assessment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subject Scope
                </label>
                <select
                  value={selectedSubject}
                  onChange={e =>
                    setSelectedSubject(e.target.value as SubjectId | 'all')
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="all">Comprehensive (All 7 Subjects)</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {availableCount} verified questions available in bank
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Quiz Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuizMode('exam')}
                    className={`px-3 py-2 text-xs rounded-lg border font-medium transition-colors text-left cursor-pointer ${
                      quizMode === 'exam'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div>Timed Mock Exam</div>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Full score report at end
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizMode('practice')}
                    className={`px-3 py-2 text-xs rounded-lg border font-medium transition-colors text-left cursor-pointer ${
                      quizMode === 'practice'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div>Practice Mode</div>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Instant explanation reveal
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                10 multiple-choice questions · 60 seconds per question
              </div>
              <button
                onClick={handleStartQuiz}
                disabled={availableCount === 0}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Launch Assessment
              </button>
            </div>
          </div>

          {/* Past Attempts History */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Recent Quiz Performance History
              </h3>
            </div>

            {quizAttempts.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                No quizzes attempted yet. Launch a quiz above to start tracking your scores!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Subject</th>
                      <th className="py-2.5">Score</th>
                      <th className="py-2.5">Percentage</th>
                      <th className="py-2.5">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {quizAttempts.slice(0, 5).map(att => (
                      <tr key={att.id}>
                        <td className="py-2.5 font-mono tabular-nums text-slate-500">
                          {att.date}
                        </td>
                        <td className="py-2.5 font-medium">{att.subjectName}</td>
                        <td className="py-2.5 font-mono tabular-nums">
                          {att.score} / {att.totalQuestions}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`font-mono tabular-nums font-bold ${
                              att.percentage >= 80
                                ? 'text-emerald-600'
                                : att.percentage >= 60
                                ? 'text-indigo-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {att.percentage}%
                          </span>
                        </td>
                        <td className="py-2.5 font-mono tabular-nums text-slate-500">
                          {formatTimer(att.timeTakenSeconds)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ SCREEN */}
      {isQuizActive && currentQ && (
        <div className="space-y-6">
          {/* Top Bar with Timer and Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-900">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-[11px] text-slate-400 capitalize">
                · {currentQ.subjectId} · {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              <button
                onClick={() => handleToggleFlag(currentQ.id)}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  flaggedQuestions[currentQ.id]
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Flag question for review"
              >
                <Flag className="w-4 h-4" />
              </button>

              <button
                onClick={handleFinishQuiz}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h2 className="text-base font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const isCorrect = currentQ.correctAnswerIndex === idx;

                // Practice mode immediate feedback styles
                let optionStyle =
                  'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                if (quizMode === 'practice' && isAnswered) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-lg border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Practice mode instant explanation card */}
            {quizMode === 'practice' && isAnswered && (
              <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Technical Explanation:</span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Nav controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {activeQuestions.map((q, idx) => {
                  const answered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isFlagged = flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white'
                          : isFlagged
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : answered
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {currentIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FINISHED RESULTS SCREEN WITH EXPLANATIONS */}
      {isQuizFinished && (
        <div className="space-y-6">
          {/* Result Banner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Assessment Results
            </h2>

            {/* Score */}
            <div className="flex items-center justify-center gap-6 py-2">
              <div>
                <div className="text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
                  {
                    activeQuestions.filter(
                      q => userAnswers[q.id] === q.correctAnswerIndex
                    ).length
                  }{' '}
                  / {activeQuestions.length}
                </div>
                <div className="text-xs text-slate-500">Correct Answers</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {Math.round(
                    (activeQuestions.filter(
                      q => userAnswers[q.id] === q.correctAnswerIndex
                    ).length /
                      activeQuestions.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs text-slate-500">Score Percentage</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => {
                  setIsQuizFinished(false);
                  setIsQuizActive(false);
                }}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Back to Quiz Menu
              </button>
            </div>
          </div>

          {/* Question-by-Question Review with Explanations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Detailed Question Analysis & Explanations
            </h3>

            {activeQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border bg-white shadow-xs space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {idx + 1}. {q.question}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5 capitalize">
                          {q.subjectId} · {q.topic}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  {/* Options status */}
                  <div className="space-y-1.5 pl-7">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = selectedOpt === optIdx;
                      const isCorrectChoice = q.correctAnswerIndex === optIdx;

                      let style = 'text-slate-600 bg-slate-50 border-slate-200';
                      if (isCorrectChoice) {
                        style = 'text-emerald-900 bg-emerald-50 border-emerald-300 font-semibold';
                      } else if (isUserChoice && !isCorrectChoice) {
                        style = 'text-rose-900 bg-rose-50 border-rose-300';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2 rounded-md border text-xs flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px]">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isUserChoice && (
                            <span className="text-[10px] uppercase font-bold text-slate-500">
                              (Your Pick)
                            </span>
                          )}
                          {isCorrectChoice && !isUserChoice && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700">
                              (Correct Answer)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Comprehensive Explanation */}
                  <div className="mt-2 ml-7 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900">Explanation:</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom MCQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Add Custom MCQ to Question Bank
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {addModalError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {addModalError}
              </div>
            )}

            <form onSubmit={handleSaveCustomQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={customSubject}
                    onChange={e => setCustomSubject(e.target.value as SubjectId)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={e => setCustomTopic(e.target.value)}
                    placeholder="e.g. Normalization or Paging"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Question Text *
                </label>
                <textarea
                  rows={2}
                  value={customQuestionText}
                  onChange={e => setCustomQuestionText(e.target.value)}
                  placeholder="Enter the problem statement..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">
                  Options & Correct Answer Selection:
                </label>
                {customOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={customCorrectIndex === i}
                      onChange={() => setCustomCorrectIndex(i)}
                      className="text-indigo-600"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const copy = [...customOptions];
                        copy[i] = e.target.value;
                        setCustomOptions(copy);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Explanation for Correct Answer *
                </label>
                <textarea
                  rows={2}
                  value={customExplanation}
                  onChange={e => setCustomExplanation(e.target.value)}
                  placeholder="Why is this option correct? Include mathematical steps or definitions."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 cursor-pointer"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
