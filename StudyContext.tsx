import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Subject,
  SubjectId,
  Exam,
  StudyTask,
  StudyNote,
  QuizQuestion,
  QuizAttempt,
  InterviewQuestion,
  CodingProblem,
  StudySessionLog,
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_EXAMS,
  INITIAL_TASKS,
  INITIAL_NOTES,
  INITIAL_QUIZ_QUESTIONS,
  INITIAL_INTERVIEW_QUESTIONS,
  INITIAL_CODING_PROBLEMS,
  INITIAL_LOGS,
} from '../data/initialData';

interface StudyContextType {
  subjects: Subject[];
  exams: Exam[];
  tasks: StudyTask[];
  notes: StudyNote[];
  quizQuestions: QuizQuestion[];
  quizAttempts: QuizAttempt[];
  interviewQuestions: InterviewQuestion[];
  codingProblems: CodingProblem[];
  studyLogs: StudySessionLog[];
  
  // Subject operations
  toggleUnitCompletion: (subjectId: SubjectId, unitId: string) => void;
  
  // Exam operations
  addExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  
  // Task operations
  addTask: (task: Omit<StudyTask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<StudyTask>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  
  // Note operations
  addNote: (note: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<StudyNote>) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;
  
  // Quiz operations
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => void;
  addCustomQuestion: (question: Omit<QuizQuestion, 'id'>) => void;
  
  // Placement operations
  toggleInterviewMastered: (id: string) => void;
  toggleInterviewBookmarked: (id: string) => void;
  updateCodingProblemStatus: (id: string, status: 'unsolved' | 'solved') => void;
  
  // Study session logger
  logSession: (subjectId: SubjectId, minutes: number, notes?: string) => void;
  
  // Data backup / reset
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonData: string) => { success: boolean; error?: string };
  resetToDefaults: () => void;

  // Active toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY_PREFIX = 'btech_cse_study_v2_';

const StudyContext = createContext<StudyContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const raw = window.localStorage ? window.localStorage.getItem(STORAGE_KEY_PREFIX + key) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) return defaultValue;
      return parsed;
    }
  } catch (err) {
    console.warn(`Storage load failed for ${key}:`, err);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Storage save failed for ${key}:`, err);
  }
}

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>(() =>
    loadFromStorage('subjects', INITIAL_SUBJECTS)
  );
  const [exams, setExams] = useState<Exam[]>(() =>
    loadFromStorage('exams', INITIAL_EXAMS)
  );
  const [tasks, setTasks] = useState<StudyTask[]>(() =>
    loadFromStorage('tasks', INITIAL_TASKS)
  );
  const [notes, setNotes] = useState<StudyNote[]>(() =>
    loadFromStorage('notes', INITIAL_NOTES)
  );
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    loadFromStorage('quiz_questions', INITIAL_QUIZ_QUESTIONS)
  );
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() =>
    loadFromStorage('quiz_attempts', [])
  );
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(() =>
    loadFromStorage('interview_questions', INITIAL_INTERVIEW_QUESTIONS)
  );
  const [codingProblems, setCodingProblems] = useState<CodingProblem[]>(() =>
    loadFromStorage('coding_problems', INITIAL_CODING_PROBLEMS)
  );
  const [studyLogs, setStudyLogs] = useState<StudySessionLog[]>(() =>
    loadFromStorage('study_logs', INITIAL_LOGS)
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // Sync state to LocalStorage
  useEffect(() => saveToStorage('subjects', subjects), [subjects]);
  useEffect(() => saveToStorage('exams', exams), [exams]);
  useEffect(() => saveToStorage('tasks', tasks), [tasks]);
  useEffect(() => saveToStorage('notes', notes), [notes]);
  useEffect(() => saveToStorage('quiz_questions', quizQuestions), [quizQuestions]);
  useEffect(() => saveToStorage('quiz_attempts', quizAttempts), [quizAttempts]);
  useEffect(() => saveToStorage('interview_questions', interviewQuestions), [interviewQuestions]);
  useEffect(() => saveToStorage('coding_problems', codingProblems), [codingProblems]);
  useEffect(() => saveToStorage('study_logs', studyLogs), [studyLogs]);

  // Subject operations
  const toggleUnitCompletion = useCallback((subjectId: SubjectId, unitId: string) => {
    setSubjects(prev =>
      prev.map(subj => {
        if (subj.id !== subjectId) return subj;
        return {
          ...subj,
          units: subj.units.map(unit =>
            unit.id === unitId ? { ...unit, completed: !unit.completed } : unit
          ),
        };
      })
    );
    showToast('Updated subject curriculum progress');
  }, [showToast]);

  // Exam operations
  const addExam = useCallback((newExam: Omit<Exam, 'id'>) => {
    const exam: Exam = {
      ...newExam,
      id: 'exam-' + Date.now(),
    };
    setExams(prev => [exam, ...prev]);
    showToast(`Exam "${exam.title}" scheduled`);
  }, [showToast]);

  const updateExam = useCallback((id: string, updates: Partial<Exam>) => {
    setExams(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
    showToast('Exam schedule updated');
  }, [showToast]);

  const deleteExam = useCallback((id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
    showToast('Exam removed');
  }, [showToast]);

  // Task operations
  const addTask = useCallback((newTask: Omit<StudyTask, 'id'>) => {
    const task: StudyTask = {
      ...newTask,
      id: 'task-' + Date.now(),
    };
    setTasks(prev => [task, ...prev]);
    showToast(`Task "${task.title}" added`);
  }, [showToast]);

  const updateTask = useCallback((id: string, updates: Partial<StudyTask>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Task details updated');
  }, [showToast]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Task deleted');
  }, [showToast]);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const isNowCompleted = t.status !== 'completed';
        return {
          ...t,
          status: isNowCompleted ? 'completed' : 'pending',
          completedAt: isNowCompleted ? new Date().toISOString().split('T')[0] : undefined,
        };
      })
    );
    showToast('Task status updated');
  }, [showToast]);

  // Note operations
  const addNote = useCallback((newNote: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const note: StudyNote = {
      ...newNote,
      id: 'note-' + Date.now(),
      createdAt: today,
      updatedAt: today,
    };
    setNotes(prev => [note, ...prev]);
    showToast(`Note "${note.title}" created`);
  }, [showToast]);

  const updateNote = useCallback((id: string, updates: Partial<StudyNote>) => {
    const today = new Date().toISOString().split('T')[0];
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updates, updatedAt: today } : n))
    );
    showToast('Note updated');
  }, [showToast]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('Note deleted');
  }, [showToast]);

  const togglePinNote = useCallback((id: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  }, []);

  // Quiz operations
  const recordQuizAttempt = useCallback((attempt: Omit<QuizAttempt, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: 'attempt-' + Date.now(),
      date: today,
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);
    showToast(`Quiz completed: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%)`);
  }, [showToast]);

  const addCustomQuestion = useCallback((newQ: Omit<QuizQuestion, 'id'>) => {
    const question: QuizQuestion = {
      ...newQ,
      id: 'q-' + Date.now(),
    };
    setQuizQuestions(prev => [question, ...prev]);
    showToast('Custom question added to bank');
  }, [showToast]);

  // Placement operations
  const toggleInterviewMastered = useCallback((id: string) => {
    setInterviewQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, mastered: !q.mastered } : q))
    );
  }, []);

  const toggleInterviewBookmarked = useCallback((id: string) => {
    setInterviewQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q))
    );
  }, []);

  const updateCodingProblemStatus = useCallback((id: string, status: 'unsolved' | 'solved') => {
    setCodingProblems(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
    showToast(status === 'solved' ? 'Problem marked as Solved!' : 'Problem reset to Unsolved');
  }, [showToast]);

  // Session logging
  const logSession = useCallback((subjectId: SubjectId, minutes: number, notes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newLog: StudySessionLog = {
      id: 'log-' + Date.now(),
      date: today,
      minutes,
      subjectId,
      notes,
    };
    setStudyLogs(prev => [newLog, ...prev]);
    showToast(`Logged ${minutes} minutes of study session`);
  }, [showToast]);

  // Export / Import
  const exportDataAsJSON = useCallback(() => {
    const backupData = {
      version: 2,
      exportedAt: new Date().toISOString(),
      subjects,
      exams,
      tasks,
      notes,
      quizQuestions,
      quizAttempts,
      interviewQuestions,
      codingProblems,
      studyLogs,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `btech_cse_study_planner_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Full study backup downloaded as JSON');
  }, [subjects, exams, tasks, notes, quizQuestions, quizAttempts, interviewQuestions, codingProblems, studyLogs, showToast]);

  const importDataFromJSON = useCallback((jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (!data.subjects || !data.tasks || !data.notes) {
        return { success: false, error: 'Invalid backup file format' };
      }
      if (Array.isArray(data.subjects)) setSubjects(data.subjects);
      if (Array.isArray(data.exams)) setExams(data.exams);
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      if (Array.isArray(data.notes)) setNotes(data.notes);
      if (Array.isArray(data.quizQuestions)) setQuizQuestions(data.quizQuestions);
      if (Array.isArray(data.quizAttempts)) setQuizAttempts(data.quizAttempts);
      if (Array.isArray(data.interviewQuestions)) setInterviewQuestions(data.interviewQuestions);
      if (Array.isArray(data.codingProblems)) setCodingProblems(data.codingProblems);
      if (Array.isArray(data.studyLogs)) setStudyLogs(data.studyLogs);
      showToast('Study planner data restored successfully');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Corrupted JSON file' };
    }
  }, [showToast]);

  const resetToDefaults = useCallback(() => {
    setSubjects(INITIAL_SUBJECTS);
    setExams(INITIAL_EXAMS);
    setTasks(INITIAL_TASKS);
    setNotes(INITIAL_NOTES);
    setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
    setQuizAttempts([]);
    setInterviewQuestions(INITIAL_INTERVIEW_QUESTIONS);
    setCodingProblems(INITIAL_CODING_PROBLEMS);
    setStudyLogs(INITIAL_LOGS);
    showToast('Reset to default B.Tech CSE curriculum data');
  }, [showToast]);

  return (
    <StudyContext.Provider
      value={{
        subjects,
        exams,
        tasks,
        notes,
        quizQuestions,
        quizAttempts,
        interviewQuestions,
        codingProblems,
        studyLogs,
        toggleUnitCompletion,
        addExam,
        updateExam,
        deleteExam,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        recordQuizAttempt,
        addCustomQuestion,
        toggleInterviewMastered,
        toggleInterviewBookmarked,
        updateCodingProblemStatus,
        logSession,
        exportDataAsJSON,
        importDataFromJSON,
        resetToDefaults,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
