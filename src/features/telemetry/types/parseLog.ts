import { LogMessage } from './log.types';
export function parseLog(value: unknown): LogMessage | null {
  try {
    const log = typeof value === 'string' ? JSON.parse(value) : value;
    if (!log || typeof log !== 'object' || typeof log.id !== 'string' || !log.id ||
        typeof log.timestamp !== 'number' || !Number.isFinite(log.timestamp) ||
        Math.abs(log.timestamp) > 8640000000000000 ||
        !['INFO', 'WARN', 'ERROR', 'FATAL'].includes(log.level) ||
        typeof log.service !== 'string' || typeof log.message !== 'string' ||
        (log.durationMs !== undefined && (typeof log.durationMs !== 'number' ||
          !Number.isFinite(log.durationMs) || log.durationMs < 0))) return null;
    return { id: log.id, timestamp: log.timestamp, level: log.level, service: log.service,
      message: log.message, durationMs: log.durationMs };
  } catch { return null; }
}
