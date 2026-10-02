# Rendering and state decisions

## Worker boundary

The worker generates synthetic records and accepts optional raw objects or JSON through a validation boundary. It sends record batches every 150 ms. The hook creates and terminates the worker with the component lifecycle. Filtering and React rendering remain on the main thread.

## Bounded history and virtualization

Zustand retains the newest 60,000 records using a bounded array. TanStack Virtual renders the visible range plus overscan inside a fixed scroll container. The cap bounds retained records, not total memory, and does not demonstrate a particular FPS.

The current search scans retained records and uses memoization. Profiling should determine whether a larger workload needs worker filtering, indexes or reduced retention. A ring buffer could reduce copying if measurements justify it.

## Configuration state

TanStack Query owns the configuration cache. The mutation cancels competing refetches, snapshots cached state and applies an optimistic value. Failure restores the snapshot, and completion invalidates the query. The supplied adapter stores configuration in memory, with an intentional failure mode for demonstration.

## Extension points

A live source needs authentication, reconnect handling and a backpressure policy. A persistent configuration API needs server validation and careful handling of concurrent edits. Browser/mobile and complete accessibility testing remain unverified in the revision environment.
