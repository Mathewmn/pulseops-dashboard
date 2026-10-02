import { AlertThresholdConfig } from '../types/log.types';
export const defaultAlert: AlertThresholdConfig = {
  id: 'latency', metric: 'Latency (ms)', thresholdValue: 100,
  notificationEmail: '', isEnabled: true,
};
let savedConfig = { ...defaultAlert };
export async function readAlertConfig() { return [{ ...savedConfig }]; }
export async function saveAlertConfig(config: AlertThresholdConfig, simulateFailure = false) {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (simulateFailure) throw new Error('Simulated save failure. Previous configuration restored.');
  if (!Number.isFinite(config.thresholdValue) || config.thresholdValue <= 0)
    throw new Error('Threshold must be a positive number.');
  savedConfig = { ...config };
  return { ...savedConfig };
}
