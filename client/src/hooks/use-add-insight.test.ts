import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAddInsight } from "./use-add-insight.ts";
import { mockFetch } from "../testing.ts";

describe("useAddInsight test suite", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate and submit successfully", async () => {
    mockFetch({ ok: true });

    const { result } = renderHook(() =>
      useAddInsight({ onClose: mockOnClose }),
    );

    act(() => {
      result.current.setBrand(1);
      result.current.setText("Valid insight text");
    });

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("should validate required fields", () => {
    const { result } = renderHook(() =>
      useAddInsight({ onClose: mockOnClose }),
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors.brand).toBeDefined();
    expect(result.current.errors.text).toBeDefined();
  });
});
