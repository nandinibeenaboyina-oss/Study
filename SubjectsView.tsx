import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Circle,
  HelpCircle,
  FileText,
  Plus,
  Briefcase,
  Search,
  Sparkles,
  ChevronRight,
  Calculator,
  Brain,
  Code2,
  Database,
  Cpu,
  Network,
  Clock,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { SubjectId, Subject } from '../types';

interface SubjectsViewProps {
  selectedSubjectId?: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  onStartQuiz: (id: SubjectId) => void;
  onOpenNewTask: (defaultSubjectId: SubjectId) => void;
  onOpenNewNote: (defaultSubjectId: SubjectId) => void;
  onNavigateToPlacement: (subjectId: SubjectId) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  selectedSubjectId = 'dbms',
  onSelectSubject,
  onStartQuiz,
  onOpenNewTask,
  onOpenNewNote,
  onNavigateToPlacement,
}) => {
  const { subjects, toggleUnitCompletion, tasks, notes, quizQuestions } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'Core CS' | 'Placement & Aptitude' | 'Advanced CS'>('all');

  const currentSubject =
    subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const filteredSubjects = subjects.filter(s => {
    const matchesCategory =
      activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.units.some(u =>
        u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  });

  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'aptitude':
        return Calculator;
      case 'reasoning':
        return Brain;
      case 'english':
        return BookOpen;
      case 'programming':
        return Code2;
      case 'dbms':
        return Database;
      case 'os':
        return Cpu;
      case 'data-mining':
        return Network;
      default:
        return BookOpen;
    }
  };

  const completedUnits = currentSubject.units.filter(u => u.completed).length;
  const progressPercent = Math.round(
    (completedUnits / currentSubject.units.length) * 100
  );

  const subjectTasks = tasks.filter(t => t.subjectId === currentSubject.id);
  const subjectNotes = notes.filter(n => n.subjectId === currentSubject.id);
  const subjectQuestions = quizQuestions.filter(
    q => q.subjectId === currentSubject.id
  );

  const CurrentIcon = getSubjectIcon(currentSubject.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Subject & Curriculum Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed syllabus tracking, unit checklists, and formula cheat sheets for all 7 B.Tech CSE subjects
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search subjects or topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit text-xs font-medium">
        {(['all', 'Core CS', 'Placement & Aptitude', 'Advanced CS'] as const).map(
          cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All 7 Subjects' : cat}
            </button>
          )
        )}
      </div>

      {/* Main 2-Column Layout: Subject Selector List & Detailed Syllabus Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 7 Subjects List (5 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          {filteredSubjects.map(subj => {
            const IconComponent = getSubjectIcon(subj.id);
            const isSelected = subj.id === currentSubject.id;
            const completedCount = subj.units.filter(u => u.completed).length;
            const pct = Math.round((completedCount / subj.units.length) * 100);

            return (
              <div
                key={subj.id}
                onClick={() => onSelectSubject(subj.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3
                        className={`text-xs font-bold ${
                          isSelected ? 'text-indigo-900' : 'text-slate-900'
                        }`}
                      >
                        {subj.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {subj.code} · {subj.credits} Credits
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono tabular-nums text-slate-700">
                      {pct}%
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {completedCount}/{subj.units.length}
                    </div>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div
                    className={`h-1 rounded-full ${
                      isSelected ? 'bg-indigo-600' : 'bg-slate-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Subject Detailed Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Subject Title Banner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {currentSubject.name}
                    </h2>
                    <span className="text-xs font-mono text-slate-500">
                      ({currentSubject.code})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{currentSubject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentSubject.credits} Academic Credits</span>
                    {currentSubject.targetExamDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Target: {currentSubject.targetExamDate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Dial */}
              <div className="text-right sm:self-center">
                <div className="text-2xl font-bold font-mono tabular-nums text-indigo-600">
                  {progressPercent}%
                </div>
                <div className="text-[11px] text-slate-500">
                  {completedUnits} of {currentSubject.units.length} units mastered
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentSubject.description}
            </p>

            {/* Quick Actions Row */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onStartQuiz(currentSubject.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Practice MCQs ({subjectQuestions.length})</span>
              </button>

              <button
                onClick={() => onOpenNewTask(currentSubject.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task ({subjectTasks.length})</span>
              </button>

              <button
                onClick={() => onOpenNewNote(currentSubject.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>New Note ({subjectNotes.length})</span>
              </button>

              <button
                onClick={() => onNavigateToPlacement(currentSubject.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Interview Q&A</span>
              </button>
            </div>
          </div>

          {/* Unit Syllabus Breakdown (Toggleable checklist) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Unit-by-Unit Syllabus Checklist
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check off units as you complete classroom lectures and revision
              </p>
            </div>

            <div className="space-y-3">
              {currentSubject.units.map((unit, index) => (
                <div
                  key={unit.id}
                  className={`p-4 rounded-lg border transition-all ${
                    unit.completed
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() =>
                          toggleUnitCompletion(currentSubject.id, unit.id)
                        }
                        className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        title={
                          unit.completed
                            ? 'Mark unit as incomplete'
                            : 'Mark unit as completed'
                        }
                      >
                        {unit.completed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            unit.completed
                              ? 'line-through text-slate-500'
                              : 'text-slate-900'
                          }`}
                        >
                          {unit.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {unit.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0">
                      Unit 0{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Cheat Sheet & High-Yield Concept Cards */}
          {currentSubject.keyCheatSheet && currentSubject.keyCheatSheet.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Key Formulas & Exam Cheat Sheet
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.keyCheatSheet.map((sheet, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <h4 className="text-xs font-bold text-slate-900">
                      {sheet.title}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                      {sheet.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
