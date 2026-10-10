import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Edit2,
  Trash2,
  ArrowUpDown,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { StudyTask, SubjectId, Priority, TaskStatus } from '../types';

interface TasksViewProps {
  onOpenNewTask: () => void;
  onEditTask: (task: StudyTask) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  onOpenNewTask,
  onEditTask,
}) => {
  const { tasks, subjects, toggleTaskStatus, deleteTask } = useStudy();

  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'priority'>('deadline');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSubject =
        subjectFilter === 'all' || task.subjectId === subjectFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesSubject && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        const priorityOrder: Record<Priority, number> = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

  const pendingCount = tasks.filter(t => t.status !== 'completed').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalEstHoursRemaining = tasks
    .filter(t => t.status !== 'completed')
    .reduce((sum, t) => sum + t.estimatedHours, 0);

  const getSubjectName = (id: SubjectId) => {
    return subjects.find(s => s.id === id)?.name || id;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Study Tasks & Goal Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize coursework, revision milestones, and problem practice sets with deadlines
          </p>
        </div>

        <button
          onClick={onOpenNewTask}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Pending Tasks</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {pendingCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Completed Tasks</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 mt-1">
            {completedCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Estimated Hours Left</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-indigo-600 mt-1">
            {totalEstHoursRemaining} <span className="text-xs font-sans font-normal text-slate-500">hours</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value as SubjectId | 'all')}
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

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value as Priority | 'all')}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as TaskStatus | 'all')}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <span className="font-mono tabular-nums">{filteredTasks.length}</span> of{' '}
            <span className="font-mono tabular-nums">{tasks.length}</span> tasks
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Sort by:</span>
            <button
              onClick={() => setSortBy('deadline')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                sortBy === 'deadline'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Deadline
            </button>
            <button
              onClick={() => setSortBy('priority')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                sortBy === 'priority'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Priority
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table / Card List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500 text-xs">
          No tasks matching your current filters. Click "Add New Task" to schedule a study goal.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          {filteredTasks.map(task => {
            const isCompleted = task.status === 'completed';
            const isOverdue =
              !isCompleted &&
              new Date(task.deadline).getTime() < new Date(todayStr).getTime();

            return (
              <div
                key={task.id}
                className="p-4 sm:px-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-xs font-bold ${
                          isCompleted
                            ? 'line-through text-slate-400'
                            : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      {isOverdue && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          OVERDUE
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-700">
                        {getSubjectName(task.subjectId)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Due {task.deadline}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {task.estimatedHours}h est.
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`font-semibold uppercase text-[10px] ${
                          task.priority === 'high'
                            ? 'text-rose-600'
                            : task.priority === 'medium'
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: Edit & Delete */}
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Edit task"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this task?')) {
                        deleteTask(task.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
