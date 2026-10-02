import { create } from 'zustand';
import { LogMessage, MetricSummary, LogLevel } from '../features/telemetry/types/log.types';

interface TelemetryState {
  logs: LogMessage[];
  selectedLevel: LogLevel | 'ALL';
  searchTerm: string;
  metrics: MetricSummary;
  addLogs: (newLogs: LogMessage[]) => void;
  setSelectedLevel: (level: LogLevel | 'ALL') => void;
  setSearchTerm: (term: string) => void;
  updateMetrics: (metrics: Partial<MetricSummary>) => void;
  clearLogs: () => void;
}

export const MAX_BUFFERED_LOGS = 60000;

export const useTelemetryStore = create<TelemetryState>((set) => ({
  logs: [],
  selectedLevel: 'ALL',
  searchTerm: '',
  metrics: {
    cpuUsagePercent: 34.2,
    memoryUsageMb: 1420,
    throughputRps: 4850,
    errorRatePercent: 0.04,
    activeNodes: 12,
  },
  addLogs: (newLogs) =>
    set((state) => {
      const combined = [...newLogs.slice().reverse(), ...state.logs];
      return {
        logs: combined.length > MAX_BUFFERED_LOGS ? combined.slice(0, MAX_BUFFERED_LOGS) : combined,
      };
    }),
  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  updateMetrics: (newMetrics) =>
    set((state) => ({ metrics: { ...state.metrics, ...newMetrics } })),
  clearLogs: () => set({ logs: [] }),
}));
