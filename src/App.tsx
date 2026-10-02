import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertSettings } from './features/telemetry/components/AlertSettings';
import { useLogStream } from './hooks/useLogStream';
import { MetricsOverview } from './features/telemetry/components/MetricsOverview';
import { FilterToolbar } from './features/telemetry/components/FilterToolbar';
import { VirtualLogTable } from './features/telemetry/components/VirtualLogTable';
import { Server, Globe } from 'lucide-react';

const queryClient = new QueryClient();

function DashboardContent() {
  useLogStream();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">PulseOps Telemetry Dashboard</h1>
            <span className="px-2 py-0.5 text-xs bg-cyan-950 border border-cyan-800 text-cyan-300 rounded font-mono font-medium">SIMULATED STREAM</span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Portfolio demo with generated logs, worker batching and a virtualized table
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Region: <strong>Demo environment</strong></span>
          </div>

        </div>
      </header>

      <MetricsOverview />
      <AlertSettings />
      <FilterToolbar />
      <VirtualLogTable />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}

export default App;
