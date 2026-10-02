import { beforeEach, describe, expect, it } from 'vitest';
import { parseLog } from '../features/telemetry/types/parseLog';
import { MAX_BUFFERED_LOGS, useTelemetryStore } from '../store/useTelemetryStore';
const log = { id: 'a', timestamp: 100, level: 'INFO' as const, service: 'api', message: 'test' };
beforeEach(() => useTelemetryStore.setState({ logs: [], selectedLevel: 'ALL', searchTerm: '' }));
describe('ingestion boundary', () => {
  it('accepts valid JSON and rejects malformed data', () => {
    expect(parseLog(JSON.stringify(log))).toEqual(log);
    for (const value of ['{', null, { ...log, level: 'BOGUS' }, { ...log, timestamp: Infinity }, { ...log, durationMs: -1 }])
      expect(parseLog(value)).toBeNull();
  });
  it('retains newest records within the configured bound', () => {
    const logs = Array.from({ length: MAX_BUFFERED_LOGS + 2 }, (_, i) => ({ ...log, id: String(i) }));
    useTelemetryStore.getState().addLogs(logs);
    expect(useTelemetryStore.getState().logs).toHaveLength(MAX_BUFFERED_LOGS);
    expect(useTelemetryStore.getState().logs[0].id).toBe(String(MAX_BUFFERED_LOGS + 1));
    useTelemetryStore.getState().clearLogs();
    expect(useTelemetryStore.getState().logs).toEqual([]);
  });
});
