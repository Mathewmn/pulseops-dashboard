import React from 'react';
import { useTelemetryStore } from '../../../store/useTelemetryStore';
import { Activity, Cpu, Database, AlertTriangle, Layers } from 'lucide-react';

export const MetricsOverview: React.FC = () => {
  const metrics = useTelemetryStore((state) => state.metrics);
  const totalLogsCount = useTelemetryStore((state) => state.logs.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-3 bg-cyan-950/60 border border-cyan-800 rounded-lg text-cyan-400">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">EXAMPLE THROUGHPUT</p>
          <p className="text-xl font-bold text-slate-100">{metrics.throughputRps.toLocaleString()} <span className="text-xs text-slate-400 font-normal">req/s</span></p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-emerald-400">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">EXAMPLE CPU</p>
          <p className="text-xl font-bold text-slate-100">{metrics.cpuUsagePercent}%</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-3 bg-indigo-950/60 border border-indigo-800 rounded-lg text-indigo-400">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">EXAMPLE MEMORY</p>
          <p className="text-xl font-bold text-slate-100">{metrics.memoryUsageMb} <span className="text-xs text-slate-400 font-normal">MB</span></p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-3 bg-amber-950/60 border border-amber-800 rounded-lg text-amber-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">EXAMPLE ERROR RATE</p>
          <p className="text-xl font-bold text-slate-100">{metrics.errorRatePercent}%</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-3 bg-purple-950/60 border border-purple-800 rounded-lg text-purple-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">BUFFERED LOGS</p>
          <p className="text-xl font-bold text-slate-100">{totalLogsCount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
