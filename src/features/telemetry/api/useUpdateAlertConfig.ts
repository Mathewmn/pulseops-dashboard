import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertThresholdConfig } from '../types/log.types';
import { saveAlertConfig } from './alertConfigApi';
export function useUpdateAlertConfig(simulateFailure = false) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (config: AlertThresholdConfig) => saveAlertConfig(config, simulateFailure),
    onMutate: async (config) => {
      await queryClient.cancelQueries({ queryKey: ['alert-configs'] });
      const previous = queryClient.getQueryData<AlertThresholdConfig[]>(['alert-configs']);
      queryClient.setQueryData<AlertThresholdConfig[]>(['alert-configs'], (old) =>
        old?.length ? old.map(c => c.id === config.id ? config : c) : [config]);
      return { previous };
    },
    onError: (_error, _config, context) => {
      if (context?.previous !== undefined) queryClient.setQueryData(['alert-configs'], context.previous);
      else queryClient.removeQueries({ queryKey: ['alert-configs'], exact: true });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['alert-configs'] }),
  });
}
