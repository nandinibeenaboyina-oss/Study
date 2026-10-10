/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SubjectsView } from './components/SubjectsView';
import { TasksView } from './components/TasksView';
import { NotesView } from './components/NotesView';
import { QuizView } from './components/QuizView';
import { PlacementView } from './components/PlacementView';
import { TaskModal } from './components/TaskModal';
import { ExamModal } from './components/ExamModal';
import { NoteModal } from './components/NoteModal';
import { ExportImportModal } from './components/ExportImportModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { StudyTask, StudyNote, Exam, SubjectId } from './types';
import { CheckCircle2, Github, BookOpen } from 'lucide-react';

function AppContent() {
  const { toastMessage } = useStudy();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('dbms');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<StudyTask | null>(null);
  const [taskDefaultSubject, setTaskDefaultSubject] = useState<SubjectId>('dbms');

  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<Exam | null>(null);

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<StudyNote | null>(null);
  const [noteDefaultSubject, setNoteDefaultSubject] = useState<SubjectId>('dbms');

  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Handlers
  const handleOpenNewTask = (defaultSubj?: SubjectId) => {
    setTaskToEdit(null);
    setTaskDefaultSubject(defaultSubj || 'dbms');
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: StudyTask) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenNewExam = () => {
    setExamToEdit(null);
    setIsExamModalOpen(true);
  };

  const handleOpenNewNote = (defaultSubj?: SubjectId) => {
    setNoteToEdit(null);
    setNoteDefaultSubject(defaultSubj || 'dbms');
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (note: StudyNote) => {
    setNoteToEdit(note);
    setIsNoteModalOpen(true);
  };

  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setActiveTab('subjects');
  };

  const handleStartQuiz = (subjectId?: SubjectId) => {
    if (subjectId) setSelectedSubjectId(subjectId);
    setActiveTab('quizzes');
  };

  const handleNavigateToPlacement = (subjectId?: SubjectId) => {
    if (subjectId) setSelectedSubjectId(subjectId);
    setActiveTab('placement');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Navbar with 3-Zone top bar contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTask={() => handleOpenNewTask()}
        onOpenDeployGuide={() => setIsDeployModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onOpenNewTask={() => handleOpenNewTask()}
            onOpenNewExam={handleOpenNewExam}
            onSelectSubject={handleSelectSubject}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectsView
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={id => setSelectedSubjectId(id)}
            onStartQuiz={handleStartQuiz}
            onOpenNewTask={handleOpenNewTask}
            onOpenNewNote={handleOpenNewNote}
            onNavigateToPlacement={handleNavigateToPlacement}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView
            onOpenNewTask={() => handleOpenNewTask()}
            onEditTask={handleEditTask}
          />
        )}

        {activeTab === 'notes' && (
          <NotesView
            onOpenNewNote={() => handleOpenNewNote()}
            onEditNote={handleEditNote}
          />
        )}

        {activeTab === 'quizzes' && (
          <QuizView initialSubjectId={selectedSubjectId} />
        )}

        {activeTab === 'placement' && (
          <PlacementView initialSubjectId={selectedSubjectId} />
        )}
      </main>

      {/* Modern, Clean Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              B.Tech CSE Study Planner & Exam Prep
            </span>
            <span aria-hidden="true">·</span>
            <span>All 7 Subjects & Placement Engine</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              How to Run & Deploy
            </button>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Backup & Restore
            </button>
            <span>LocalStorage Persistence Enabled</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
        defaultSubjectId={taskDefaultSubject}
      />

      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        examToEdit={examToEdit}
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        noteToEdit={noteToEdit}
        defaultSubjectId={noteDefaultSubject}
      />

      <ExportImportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

      <DeployGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              !
            </div>
            <h1 className="text-lg font-bold text-slate-900">
              Something went wrong loading the study planner
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              An unexpected display issue occurred. You can reload the application to restore your study data.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Session & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <StudyProvider>
        <AppContent />
      </StudyProvider>
    </ErrorBoundary>
  );
}
