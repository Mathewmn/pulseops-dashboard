import React from 'react';
import { useTelemetryStore } from '../../../store/useTelemetryStore';
import { LogLevel } from '../types/log.types';
import { Search, Trash2 } from 'lucide-react';

const LEVELS: (LogLevel | 'ALL')[] = ['ALL', 'INFO', 'WARN', 'ERROR', 'FATAL'];

export const FilterToolbar: React.FC = () => {
  const { selectedLevel, setSelectedLevel, searchTerm, setSearchTerm, clearLogs } = useTelemetryStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-2">Severity:</span>
        {LEVELS.map((level) => {
          const isActive = selectedLevel === level;
          return (
            <button
              key={level}
              aria-pressed={isActive}
              onClick={() => setSelectedLevel(level)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {level}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            aria-label="Search logs"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search service or message..."
            className="pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
          />
        </div>
        <button
          onClick={clearLogs}
          aria-label="Clear log buffer"
          title="Clear active log buffer"
          className="p-2 bg-slate-800 hover:bg-red-950/50 hover:text-red-400 border border-slate-700 rounded text-slate-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
