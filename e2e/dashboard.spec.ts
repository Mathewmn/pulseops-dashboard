import { expect, test } from '@playwright/test';
test('stream, filter and failed settings update', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'PulseOps Telemetry Dashboard' })).toBeVisible();
  await expect(page.getByText('Synthetic telemetry event for portfolio demonstration').first()).toBeVisible();
  await page.getByRole('textbox', { name: 'Search logs' }).fill('no-such-service');
  await expect(page.getByText('No matching log records in the active stream buffer.')).toBeVisible();
  await page.getByLabel('Simulate save failure').check();
  await page.getByLabel('Latency threshold (ms)').fill('500');
  await page.getByRole('button', { name: 'Save threshold' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByText('Active threshold: 100 ms')).toBeVisible();
});
