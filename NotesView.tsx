import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Pin,
  Edit2,
  Trash2,
  Copy,
  Check,
  Tag,
  Calendar,
  Share2,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { StudyNote, SubjectId } from '../types';

interface NotesViewProps {
  onOpenNewNote: () => void;
  onEditNote: (note: StudyNote) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  onOpenNewNote,
  onEditNote,
}) => {
  const { notes, subjects, deleteNote, togglePinNote, showToast } = useStudy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => {
    return notes.length > 0 ? notes[0].id : null;
  });

  const filteredNotes = notes.filter(note => {
    const matchesSubject =
      selectedSubject === 'all' || note.subjectId === selectedSubject;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  // Sort: pinned first, then updated recently
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const activeNote =
    notes.find(n => n.id === selectedNoteId) || sortedNotes[0] || null;

  const handleCopyNote = (note: StudyNote) => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    setCopiedId(note.id);
    showToast('Note copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSubjectName = (id: SubjectId) => {
    return subjects.find(s => s.id === id)?.name || id;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Study Notes & Revision Cheatsheets
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, search, and pin high-yield B.Tech CSE formulas and exam notes
          </p>
        </div>

        <button
          onClick={onOpenNewNote}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Study Note</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes, tags (#normalization), or concepts..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value as SubjectId | 'all')}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All 7 Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Reader Layout: Notes List on Left, Active Note Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
          {sortedNotes.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl bg-white">
              No notes found. Create your first note with the "New Study Note" button.
            </div>
          ) : (
            sortedNotes.map(note => {
              const isSelected = activeNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/30 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {note.isPinned && (
                          <Pin className="w-3 h-3 text-indigo-600 fill-indigo-600 shrink-0" />
                        )}
                        <h3
                          className={`text-xs font-bold ${
                            isSelected ? 'text-indigo-950' : 'text-slate-900'
                          }`}
                        >
                          {note.title}
                        </h3>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {getSubjectName(note.subjectId)}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono tabular-nums text-slate-400 shrink-0">
                      {note.updatedAt}
                    </span>
                  </div>

                  {/* Snippet */}
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {note.content.replace(/^[#*-\s]+/gm, '')}
                  </p>

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {note.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Active Note Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {activeNote ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              {/* Note Header & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">
                      {activeNote.title}
                    </h2>
                    {activeNote.isPinned && (
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
                        PINNED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {getSubjectName(activeNote.subjectId)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      Updated {activeNote.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePinNote(activeNote.id)}
                    className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer ${
                      activeNote.isPinned
                        ? 'text-indigo-600'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title={activeNote.isPinned ? 'Unpin note' : 'Pin note'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyNote(activeNote)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Copy note text"
                  >
                    {copiedId === activeNote.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => onEditNote(activeNote)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Edit note"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this note permanently?')) {
                        deleteNote(activeNote.id);
                        setSelectedNoteId(null);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tags strip */}
              {activeNote.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {activeNote.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Note Content Render */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                {activeNote.content}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 text-xs">
              Select a note on the left or click "New Study Note" to start writing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
