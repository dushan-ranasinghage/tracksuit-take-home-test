import { useState } from "react";

type UseDeleteInsightOptions = {
  onInsightDeleted?: () => void;
};

export const useDeleteInsight = ({ onInsightDeleted }: UseDeleteInsightOptions) => {
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const deleteInsight = async (id: number) => {
    try {
      const res = await fetch(`/api/insights/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Failed to delete insight:", await res.json());
        return;
      }
      onInsightDeleted?.();
      setPendingDeleteId(null);
    } catch (err) {
      console.error("Failed to delete insight:", err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      deleteInsight(pendingDeleteId);
    }
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  return {
    pendingDeleteId,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
};
