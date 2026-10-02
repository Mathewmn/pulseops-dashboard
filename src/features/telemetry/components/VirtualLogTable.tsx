import React, { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTelemetryStore } from '../../../store/useTelemetryStore';

export const VirtualLogTable: React.FC = () => {
  const { logs, selectedLevel, searchTerm } = useTelemetryStore();
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesLevel = selectedLevel === 'ALL' || log.level === selectedLevel;
      const matchesSearch =
        searchTerm === '' ||
        log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [logs, selectedLevel, searchTerm]);

  const rowVirtualizer = useVirtualizer({
    count: filteredLogs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 15,
  });

  return (
    <div className="flex flex-col h-[600px] w-full border border-slate-800 rounded-lg bg-slate-950 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-12 bg-slate-900 p-3 font-semibold text-xs text-slate-400 border-b border-slate-800 select-none">
        <span className="col-span-2">TIMESTAMP</span>
        <span className="col-span-1">LEVEL</span>
        <span className="col-span-3">SERVICE</span>
        <span className="col-span-5">MESSAGE</span>
        <span className="col-span-1 text-right">LATENCY</span>
      </div>

      <div ref={parentRef} className="overflow-auto flex-1 relative font-mono text-xs">
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            No matching log records in the active stream buffer.
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const log = filteredLogs[virtualRow.index];
              const levelStyles = {
                INFO: 'text-emerald-400 bg-emerald-950/40 border-emerald-900',
                WARN: 'text-amber-400 bg-amber-950/40 border-amber-900',
                ERROR: 'text-rose-400 bg-rose-950/40 border-rose-900',
                FATAL: 'text-purple-400 bg-purple-950/40 border-purple-900 font-extrabold',
              }[log.level];

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="grid grid-cols-12 items-center px-3 border-b border-slate-900 hover:bg-slate-900/60 transition-colors"
                >
                  <span className="col-span-2 text-slate-500 truncate">
                    {new Date(log.timestamp).toISOString().substring(11, 23)}
                  </span>
                  <span className="col-span-1">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${levelStyles}`}>
                      {log.level}
                    </span>
                  </span>
                  <span className="col-span-3 text-cyan-400 truncate">{log.service}</span>
                  <span className="col-span-5 text-slate-300 truncate">{log.message}</span>
                  <span className="col-span-1 text-right text-slate-400">{log.durationMs}ms</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
