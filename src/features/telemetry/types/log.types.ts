export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

export interface LogMessage {
  id: string;
  timestamp: number;
  level: LogLevel;
  service: string;
  message: string;
  durationMs?: number;
}

export interface MetricSummary {
  cpuUsagePercent: number;
  memoryUsageMb: number;
  throughputRps: number;
  errorRatePercent: number;
  activeNodes: number;
}

export interface AlertThresholdConfig {
  id: string;
  metric: string;
  thresholdValue: number;
  notificationEmail: string;
  isEnabled: boolean;
}
