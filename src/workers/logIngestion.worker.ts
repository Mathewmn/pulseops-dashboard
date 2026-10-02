import { LogMessage } from '../features/telemetry/types/log.types';
import { parseLog } from '../features/telemetry/types/parseLog';
let buffer: LogMessage[] = [];
const services = ['auth-service', 'settlement-engine', 'api-gateway'];
const levels = ['INFO', 'WARN', 'ERROR', 'FATAL'] as const;
// Generate demonstration records inside the worker, away from React's main thread.
setInterval(() => {
  buffer.push({ id: crypto.randomUUID(), timestamp: Date.now(),
    level: levels[Math.floor(Math.random() * levels.length)],
    service: services[Math.floor(Math.random() * services.length)],
    message: 'Synthetic telemetry event for portfolio demonstration',
    durationMs: Math.floor(Math.random() * 90) + 5 });
}, 20);
self.onmessage = (event: MessageEvent<{ type: string; payload: unknown }>) => {
  if (event.data.type !== 'INCOMING_LOG') return;
  const log = parseLog(event.data.payload);
  if (log && buffer.length < 10000) buffer.push(log);
};
setInterval(() => {
  if (buffer.length) { self.postMessage({ type: 'BATCH_FLUSH', payload: buffer }); buffer = []; }
}, 150);
