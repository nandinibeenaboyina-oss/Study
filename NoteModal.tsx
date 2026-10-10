import React, { useState, useEffect } from 'react';
import { X, Eye, Edit3 } from 'lucide-react';
import { StudyNote, SubjectId } from '../types';
import { useStudy } from '../context/StudyContext';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteToEdit?: StudyNote | null;
  defaultSubjectId?: SubjectId;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  noteToEdit,
  defaultSubjectId,
}) => {
  const { subjects, addNote, updateNote } = useStudy();

  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState<SubjectId>('dbms');
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [error, setError] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setSubjectId(noteToEdit.subjectId);
      setTagInput(noteToEdit.tags.join(', '));
      setContent(noteToEdit.content);
      setIsPinned(noteToEdit.isPinned);
      setError('');
    } else {
      setTitle('');
      setSubjectId(defaultSubjectId || 'dbms');
      setTagInput('cheatsheet, formula');
      setContent('');
      setIsPinned(false);
      setError('');
    }
  }, [noteToEdit, defaultSubjectId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a note title');
      return;
    }
    if (!content.trim()) {
      setError('Please write some content or code snippet');
      return;
    }

    const tags = tagInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    if (noteToEdit) {
      updateNote(noteToEdit.id, {
        title: title.trim(),
        subjectId,
        content: content.trim(),
        tags,
        isPinned,
      });
    } else {
      addNote({
        title: title.trim(),
        subjectId,
        content: content.trim(),
        tags,
        isPinned,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            {noteToEdit ? 'Edit Study Note' : 'Create Study Note'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Note Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. B+ Tree Node Capacity & Search Complexity"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subject *
              </label>
              <select
                value={subjectId}
                onChange={e => setSubjectId(e.target.value as SubjectId)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                {subjects.map(subj => (
                  <option key={subj.id} value={subj.id}>
                    {subj.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder="gate2026, formula, pyq"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={e => setIsPinned(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              Pin to top of notes list
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Note Content (supports Markdown & code blocks) *
              </label>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'write' ? 'bg-white text-slate-900 shadow-xs font-medium' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Write</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs font-medium' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {activeTab === 'write' ? (
              <textarea
                rows={10}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Use ### for headings, - for bullet points, `code` or ```blocks```..."
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 leading-relaxed"
              />
            ) : (
              <div className="min-h-[220px] max-h-[350px] overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-lg prose prose-slate text-sm">
                {content ? (
                  <div className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                    {content}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-xs">Nothing to preview yet</p>
                )}
              </div>
            )}
          </div>

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
              {noteToEdit ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
