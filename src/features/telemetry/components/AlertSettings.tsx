import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { defaultAlert, readAlertConfig } from '../api/alertConfigApi';
import { useUpdateAlertConfig } from '../api/useUpdateAlertConfig';
export function AlertSettings() {
  const [threshold, setThreshold] = useState('100');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const query = useQuery({ queryKey: ['alert-configs'], queryFn: readAlertConfig });
  const mutation = useUpdateAlertConfig(simulateFailure);
  const active = query.data?.[0] ?? defaultAlert;
  return <section aria-label="Alert settings" className="mb-6 p-4 bg-slate-900 rounded border border-slate-800">
    <h2 className="font-semibold mb-2">Alert configuration demo</h2>
    <p className="text-sm text-slate-400 mb-3">In-memory persistence. No notifications are sent.</p>
    <form className="flex flex-wrap items-center gap-3" onSubmit={e => {
      e.preventDefault(); mutation.mutate({ ...active, thresholdValue: Number(threshold) });
    }}>
      <label>Latency threshold (ms) <input className="bg-slate-950 p-2 rounded w-24" type="number"
        min="1" required value={threshold} onChange={e => setThreshold(e.target.value)} /></label>
      <label><input type="checkbox" checked={simulateFailure} onChange={e => setSimulateFailure(e.target.checked)} /> Simulate save failure</label>
      <button className="bg-cyan-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={mutation.isPending || query.isPending}>Save threshold</button>
    </form>
    <p className="mt-3 text-sm" role="status">Active threshold: {active.thresholdValue} ms{mutation.isPending ? ' (saving)' : ''}</p>
    {mutation.isError && <p role="alert" className="text-rose-300">{mutation.error.message}</p>}
    {mutation.isSuccess && <p role="status" className="text-emerald-300">Threshold saved in demo memory.</p>}
  </section>;
}
