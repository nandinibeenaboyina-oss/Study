import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Exam, SubjectId } from '../types';
import { useStudy } from '../context/StudyContext';

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examToEdit?: Exam | null;
}

export const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  examToEdit,
}) => {
  const { subjects, addExam, updateExam } = useStudy();

  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState<SubjectId | 'all'>('dbms');
  const [examDate, setExamDate] = useState('');
  const [time, setTime] = useState('10:00 AM - 1:00 PM');
  const [venueOrMode, setVenueOrMode] = useState('');
  const [syllabusCovered, setSyllabusCovered] = useState('');
  const [targetScore, setTargetScore] = useState(85);
  const [status, setStatus] = useState<'upcoming' | 'completed'>('upcoming');
  const [scoreAchieved, setScoreAchieved] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    if (examToEdit) {
      setTitle(examToEdit.title);
      setSubjectId(examToEdit.subjectId);
      setExamDate(examToEdit.examDate);
      setTime(examToEdit.time);
      setVenueOrMode(examToEdit.venueOrMode);
      setSyllabusCovered(examToEdit.syllabusCovered);
      setTargetScore(examToEdit.targetScore);
      setStatus(examToEdit.status);
      setScoreAchieved(examToEdit.scoreAchieved);
      setError('');
    } else {
      setTitle('');
      setSubjectId('dbms');
      const inTwoWeeks = new Date();
      inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);
      setExamDate(inTwoWeeks.toISOString().split('T')[0]);
      setTime('10:00 AM - 1:00 PM');
      setVenueOrMode('Department Examination Hall');
      setSyllabusCovered('Units 1 through 3');
      setTargetScore(85);
      setStatus('upcoming');
      setScoreAchieved(undefined);
      setError('');
    }
  }, [examToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an exam title');
      return;
    }
    if (!examDate) {
      setError('Please provide the exam date');
      return;
    }

    if (examToEdit) {
      updateExam(examToEdit.id, {
        title: title.trim(),
        subjectId,
        examDate,
        time: time.trim(),
        venueOrMode: venueOrMode.trim(),
        syllabusCovered: syllabusCovered.trim(),
        targetScore: Number(targetScore) || 80,
        status,
        scoreAchieved: scoreAchieved !== undefined ? Number(scoreAchieved) : undefined,
      });
    } else {
      addExam({
        title: title.trim(),
        subjectId,
        examDate,
        time: time.trim(),
        venueOrMode: venueOrMode.trim(),
        syllabusCovered: syllabusCovered.trim(),
        targetScore: Number(targetScore) || 80,
        status,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            {examToEdit ? 'Edit Exam Details' : 'Schedule Upcoming Exam'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Exam Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. DBMS Mid-Sem or TCS NQT Drive"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subject Focus *
              </label>
              <select
                value={subjectId}
                onChange={e => setSubjectId(e.target.value as SubjectId | 'all')}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="all">All / Comprehensive Placement Mock</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Exam Date *
              </label>
              <input
                type="date"
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="10:00 AM - 1:00 PM"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Score (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={targetScore}
                onChange={e => setTargetScore(parseInt(e.target.value) || 80)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Venue / Mode
            </label>
            <input
              type="text"
              value={venueOrMode}
              onChange={e => setVenueOrMode(e.target.value)}
              placeholder="e.g. Department Hall 302 or Online Assessment"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Syllabus Coverage / Notes
            </label>
            <textarea
              rows={2}
              value={syllabusCovered}
              onChange={e => setSyllabusCovered(e.target.value)}
              placeholder="e.g. Normalization, B-Trees, Transaction management"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {examToEdit && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exam Status
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as 'upcoming' | 'completed')}
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Actual Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreAchieved ?? ''}
                  onChange={e => setScoreAchieved(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Optional"
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md bg-white tabular-nums"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {examToEdit ? 'Save Changes' : 'Schedule Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
