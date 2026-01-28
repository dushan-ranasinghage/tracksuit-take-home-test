import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

export const mockFetch = (response: { ok?: boolean; json?: unknown } = {}) => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: response.ok ?? true,
    json: async () => response.json ?? {},
  });
  return globalThis.fetch as ReturnType<typeof vi.fn>;
};
