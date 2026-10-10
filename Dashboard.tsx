import React, { useState, useEffect } from 'react';
import heroBannerImg from '../assets/images/cse_study_hero_banner_1791618600033.jpg';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  BookOpen,
  ArrowRight,
  Flame,
  Target,
  BrainCircuit,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { SubjectId, Exam } from '../types';
import { ActiveTab } from './Navbar';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewTask: () => void;
  onOpenNewExam: () => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  onStartQuiz: (subjectId?: SubjectId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  setActiveTab,
  onOpenNewTask,
  onOpenNewExam,
  onSelectSubject,
  onStartQuiz,
}) => {
  const {
    subjects,
    exams,
    tasks,
    studyLogs,
    quizAttempts,
    toggleTaskStatus,
    logSession,
    deleteExam,
  } = useStudy();

  // Pomodoro timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [timerSubject, setTimerSubject] = useState<SubjectId>('dbms');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      if (timerMode === 'focus') {
        logSession(timerSubject, 25, 'Completed 25-minute Pomodoro study block');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds, timerMode, timerSubject, logSession]);

  const handleStartTimer = () => setTimerRunning(true);
  const handlePauseTimer = () => setTimerRunning(false);
  const handleResetTimer = (minutes: number = 25, mode: 'focus' | 'break' = 'focus') => {
    setTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(minutes * 60);
  };

  const handleManualLogTimer = () => {
    const elapsedMinutes = Math.round((25 * 60 - timerSeconds) / 60);
    const minutesToLog = elapsedMinutes > 0 ? elapsedMinutes : 25;
    logSession(timerSubject, minutesToLog, 'Manual focus log');
    handleResetTimer(25, 'focus');
  };

  const formatTimerTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMinutes = (studyLogs || [])
    .filter(log => log && log.date === todayStr)
    .reduce((acc, curr) => acc + (curr.minutes || 0), 0);

  const totalStudyMinutes = (studyLogs || []).reduce((acc, curr) => acc + (curr.minutes || 0), 0);
  const totalHours = (totalStudyMinutes / 60).toFixed(1);

  const completedTasksCount = (tasks || []).filter(t => t && t.status === 'completed').length;
  const pendingTasks = (tasks || []).filter(t => t && t.status !== 'completed');

  // Days streak calculation (unique consecutive study days)
  const uniqueStudyDays = Array.from(new Set((studyLogs || []).map(l => l.date))).sort().reverse();
  const streakCount = Math.max(uniqueStudyDays.length, 1);

  // Overall syllabus completion
  const totalUnits = (subjects || []).reduce((sum, s) => sum + (s.units?.length || 0), 0);
  const completedUnits = (subjects || []).reduce(
    (sum, s) => sum + ((s.units || []).filter(u => u.completed).length),
    0
  );
  const syllabusPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  // Upcoming exams sorted by date
  const upcomingExams = [...(exams || [])]
    .filter(e => e && e.status === 'upcoming')
    .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());

  const getDaysLeft = (dateStr: string) => {
    const target = new Date(dateStr).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-md">
        <div className="absolute inset-0 opacity-25">
          <img
            src={heroBannerImg}
            alt="CSE Study Workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
              <BrainCircuit className="w-4 h-4" />
              <span>B.Tech CSE Exam & Placement Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Master Core CS & Campus Placements
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Track 7 core technical and aptitude domains, schedule university and recruitment exams,
              practice timed quizzes with explanations, and prepare for MNC interviews.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('quizzes')}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Take Practice Quiz
            </button>
            <button
              onClick={() => setActiveTab('placement')}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Placement Hub
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards (Single-elevation, tabular figures) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Today's Focus</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {todayMinutes} <span className="text-xs font-sans font-normal text-slate-500">mins</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Total logged: <span className="font-mono tabular-nums">{totalHours}h</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {streakCount} <span className="text-xs font-sans font-normal text-slate-500">days</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-medium">
            Daily consistency active
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Syllabus Progress</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {syllabusPercent}%
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span className="font-mono tabular-nums">{completedUnits}</span> of{' '}
            <span className="font-mono tabular-nums">{totalUnits}</span> units completed
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tasks Done</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {completedTasksCount}{' '}
            <span className="text-xs font-sans font-normal text-slate-500">
              / {tasks.length}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span className="font-mono tabular-nums">{pendingTasks.length}</span> pending tasks
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Exams & Daily Pomodoro Focus Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Upcoming Exams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Upcoming Exams & Placement Tests</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  University semester deadlines, GATE dates, and corporate recruitment rounds
                </p>
              </div>
              <button
                onClick={onOpenNewExam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule Exam</span>
              </button>
            </div>

            {upcomingExams.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-200 rounded-lg">
                No upcoming exams scheduled. Click "Schedule Exam" to add your next test.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingExams.slice(0, 4).map(exam => {
                  const daysLeft = getDaysLeft(exam.examDate);
                  const isUrgent = daysLeft >= 0 && daysLeft <= 14;
                  const isPast = daysLeft < 0;

                  return (
                    <div
                      key={exam.id}
                      className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {exam.title}
                          </h3>
                          {exam.subjectId !== 'all' && (
                            <span className="text-[11px] font-medium text-slate-500 uppercase">
                              · {exam.subjectId}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span>Date: {exam.examDate}</span>
                          <span aria-hidden="true">·</span>
                          <span>Time: {exam.time}</span>
                          <span aria-hidden="true">·</span>
                          <span>Venue: {exam.venueOrMode}</span>
                        </div>
                        {exam.syllabusCovered && (
                          <p className="text-xs text-slate-600 italic">
                            Coverage: {exam.syllabusCovered}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="text-right">
                          <div
                            className={`text-sm font-bold font-mono tabular-nums ${
                              isPast
                                ? 'text-slate-400'
                                : isUrgent
                                ? 'text-amber-600'
                                : 'text-indigo-600'
                            }`}
                          >
                            {isPast
                              ? 'Passed'
                              : daysLeft === 0
                              ? 'TODAY'
                              : `${daysLeft} days left`}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Target: {exam.targetScore}%
                          </div>
                        </div>

                        <button
                          onClick={() => deleteExam(exam.id)}
                          title="Remove exam"
                          className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Today's Tasks Quick Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>Immediate Action Tasks</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  High & medium priority study goals for this week
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View All Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {tasks.slice(0, 5).map(task => {
                const isCompleted = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className="py-3 flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div>
                        <p
                          className={`text-xs font-medium ${
                            isCompleted
                              ? 'line-through text-slate-400'
                              : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="capitalize">{task.subjectId}</span>
                          <span aria-hidden="true">·</span>
                          <span>Due {task.deadline}</span>
                          <span aria-hidden="true">·</span>
                          <span
                            className={
                              task.priority === 'high'
                                ? 'text-rose-600 font-semibold'
                                : task.priority === 'medium'
                                ? 'text-amber-600 font-medium'
                                : 'text-slate-500'
                            }
                          >
                            {task.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0">
                      {task.estimatedHours}h
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Interactive Pomodoro Focus Timer */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Pomodoro Focus Timer</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium capitalize">
                {timerMode} Mode
              </span>
            </div>

            {/* Subject selector for the timer */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Study Target
              </label>
              <select
                value={timerSubject}
                onChange={e => setTimerSubject(e.target.value as SubjectId)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Display */}
            <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                {formatTimerTime(timerSeconds)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {timerRunning ? 'Session active...' : 'Ready to start'}
              </p>
            </div>

            {/* Timer Controls */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {timerRunning ? (
                <button
                  onClick={handlePauseTimer}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleStartTimer}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Focus</span>
                </button>
              )}

              <button
                onClick={() => handleResetTimer(25, 'focus')}
                title="Reset to 25 mins"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleManualLogTimer}
                title="Log this study session to history"
                className="px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              >
                Log Session
              </button>
            </div>

            {/* Presets */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <button
                onClick={() => handleResetTimer(25, 'focus')}
                className="hover:text-indigo-600 font-medium cursor-pointer"
              >
                25m Focus
              </button>
              <button
                onClick={() => handleResetTimer(5, 'break')}
                className="hover:text-indigo-600 font-medium cursor-pointer"
              >
                5m Break
              </button>
              <button
                onClick={() => handleResetTimer(15, 'break')}
                className="hover:text-indigo-600 font-medium cursor-pointer"
              >
                15m Long Break
              </button>
            </div>
          </div>

          {/* Quick Quiz launcher */}
          <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold">Quick Exam Readiness Quiz</h3>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Test your knowledge with authentic B.Tech CSE multiple-choice questions
              complete with instant scoring and detailed answer explanations.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onStartQuiz()}
                className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                Start Comprehensive Quiz
              </button>
              <button
                onClick={() => setActiveTab('quizzes')}
                className="px-3 py-1.5 text-xs font-medium text-indigo-200 hover:text-white transition-colors cursor-pointer"
              >
                Browse Question Bank
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Subjects Mastery Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Curriculum & Subject Mastery Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Covers all 7 B.Tech Computer Science & Placement core subjects
            </p>
          </div>
          <button
            onClick={() => setActiveTab('subjects')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(subj => {
            const completed = subj.units.filter(u => u.completed).length;
            const total = subj.units.length;
            const pct = Math.round((completed / total) * 100);

            return (
              <div
                key={subj.id}
                onClick={() => onSelectSubject(subj.id)}
                className="p-4 rounded-lg border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all bg-white cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {subj.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {subj.code} · {subj.category}
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-slate-700">
                    {pct}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {completed}/{total} units done
                  </span>
                  <span className="text-indigo-600 group-hover:underline">
                    View syllabus →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
