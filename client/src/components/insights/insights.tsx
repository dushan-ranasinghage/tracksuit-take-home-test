import React, { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { DeleteConfirmation } from "../delete-confirmation/delete-confirmation.tsx";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { BRANDS } from "../../lib/consts.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onInsightDeleted?: () => void;
};

export const Insights = ({ insights, className, onInsightDeleted }: InsightsProps) => {
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

  return (
    <>
      <div className={cx(className)}>
        <h1 className={styles.heading}>Insights</h1>
        <div className={styles.list}>
          {insights?.length
            ? (
              insights.map(({ id, text, date, brandId }) => (
                <div className={styles.insight} key={id}>
                  <div className={styles["insight-meta"]}>
                    <span>{BRANDS.find((brand) => brand.id === brandId)?.name || "Unknown brand"}</span>
                    <div className={styles["insight-meta-details"]}>
                      <span>{date || "No date"}</span>
                      <Trash2Icon
                        className={styles["insight-delete"]}
                        onClick={() => handleDeleteClick(id)}
                      />
                    </div>
                  </div>
                  <p className={styles["insight-content"]}>{text}</p>
                </div>
              ))
            )
            : <p>We have no insight!</p>}
        </div>
      </div>
      <DeleteConfirmation
        open={pendingDeleteId !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
