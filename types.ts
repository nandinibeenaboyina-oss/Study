export type SubjectId =
  | 'aptitude'
  | 'reasoning'
  | 'english'
  | 'programming'
  | 'dbms'
  | 'os'
  | 'data-mining';

export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  category: 'Core CS' | 'Placement & Aptitude' | 'Advanced CS';
  icon: string;
  description: string;
  credits: number;
  targetExamDate?: string;
  accentColor: string;
  units: {
    id: string;
    title: string;
    topics: string[];
    completed: boolean;
  }[];
  keyCheatSheet: {
    title: string;
    items: string[];
  }[];
}

export interface Exam {
  id: string;
  title: string;
  subjectId: SubjectId | 'all';
  examDate: string; // YYYY-MM-DD
  time: string;
  venueOrMode: string;
  syllabusCovered: string;
  targetScore: number;
  status: 'upcoming' | 'completed';
  scoreAchieved?: number;
}

export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface StudyTask {
  id: string;
  title: string;
  subjectId: SubjectId;
  deadline: string; // YYYY-MM-DD
  priority: Priority;
  status: TaskStatus;
  estimatedHours: number;
  completedAt?: string;
  description?: string;
}

export interface StudyNote {
  id: string;
  title: string;
  subjectId: SubjectId;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  subjectId: SubjectId | 'all';
  subjectName: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  date: string;
  timeTakenSeconds: number;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

export interface InterviewQuestion {
  id: string;
  subjectId: SubjectId;
  topic: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  companies: string[];
  answerGuide: string;
  keyTakeaways: string[];
  mastered: boolean;
  bookmarked: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  companies: string[];
  problemStatement: string;
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
  };
  solutionCode: {
    javascript: string;
    python: string;
    cpp: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  timeComplexity: string;
  spaceComplexity: string;
  status: 'unsolved' | 'solved';
  userNotes?: string;
}

export interface StudySessionLog {
  id: string;
  date: string; // YYYY-MM-DD
  minutes: number;
  subjectId: SubjectId;
  notes?: string;
}
