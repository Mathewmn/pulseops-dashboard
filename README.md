# PulseOps telemetry dashboard

A React 18 / TypeScript portfolio demonstration of worker batching, bounded telemetry history, virtualized rendering and optimistic configuration updates.

## Run

Requires Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To create a production bundle, run `npm run build`. To serve that bundle, run `npm run preview`.

## Demonstration walkthrough

1. Watch synthetic events populate the dashboard.
2. Choose a severity and search by service or message.
3. Clear the retained log buffer. New records continue to arrive.
4. Save a positive latency threshold. The active value changes optimistically.
5. Enable **Simulate save failure**, save a different value and observe the rollback and error message.

## Architecture

`src/workers/logIngestion.worker.ts` generates demonstration events every 20 ms and flushes batches every 150 ms. Its incoming-message boundary validates optional raw JSON or objects using `parseLog`. The hook receives batches and terminates the worker during cleanup. Zustand retains up to 60,000 records in newest-first order. This uses a bounded array, not a circular buffer.

TanStack Virtual renders the viewport and overscan range. Filtering runs on the main thread and scans the retained history. TanStack Query manages a local asynchronous configuration adapter with snapshots, rollback and refetch after mutation. Configuration persists only in module memory until reload.

## Tests

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

Vitest covers input parsing, retention/order, clear, empty table rendering and configuration save/rollback. Playwright contains a browser scenario for streaming, filtering and failed mutation. A GitHub Actions workflow is included for future runs.

## Scope and limitations

- This is a portfolio demo with generated logs and explicitly labeled example metrics.
- No live WebSocket, remote configuration API or notification delivery is implemented.
- No FPS, memory, Lighthouse, type-coverage or WCAG certification claims are made.
- Accessible labels, pressed-state buttons and status/error announcements are included. A complete audit is still needed.
- Future work: reconnect/backpressure handling, persistent API, authentication, filtering benchmarks, mobile and screen-reader testing.

See `VERIFICATION.md` for the checks actually executed in the revision environment. Run the supplied CI workflow on your own repository before reporting JavaScript/browser CI success.
