import { useEffect } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';
import { LogMessage } from '../features/telemetry/types/log.types';
export function useLogStream() {
  const addLogs = useTelemetryStore(state => state.addLogs);
  useEffect(() => {
    const worker = new Worker(new URL('../workers/logIngestion.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent<{ type: string; payload: LogMessage[] }>) => {
      if (event.data.type === 'BATCH_FLUSH') addLogs(event.data.payload);
    };
    return () => worker.terminate();
  }, [addLogs]);
}
