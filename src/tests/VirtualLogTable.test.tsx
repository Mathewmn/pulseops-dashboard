import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualLogTable } from '../features/telemetry/components/VirtualLogTable';
import { useTelemetryStore } from '../store/useTelemetryStore';

describe('VirtualLogTable', () => {
  it('renders correctly with empty buffer', () => {
    useTelemetryStore.setState({ logs: [] });
    render(<VirtualLogTable />);
    expect(screen.getByText(/TIMESTAMP/i)).toBeInTheDocument();
  });
});
