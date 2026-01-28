import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDeleteInsight } from "./use-delete-insight.ts";
import { mockFetch } from "../testing.ts";

describe("useDeleteInsight test suite", () => {
  const mockOnInsightDeleted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete insight successfully", async () => {
    mockFetch({ ok: true });

    const { result } = renderHook(() =>
      useDeleteInsight({ onInsightDeleted: mockOnInsightDeleted }),
    );

    act(() => {
      result.current.handleDeleteClick(123);
    });

    await act(async () => {
      result.current.handleConfirmDelete();
    });

    await waitFor(() => {
      expect(mockOnInsightDeleted).toHaveBeenCalled();
      expect(result.current.pendingDeleteId).toBeNull();
    });
  });
});
