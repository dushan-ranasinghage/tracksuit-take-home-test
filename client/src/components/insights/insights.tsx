import React from "react";
import { Trash2Icon } from "lucide-react";
import moment from "moment";
import { DeleteConfirmation } from "../delete-confirmation/delete-confirmation.tsx";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { getBrandName } from "../../lib/util.ts";
import { useDeleteInsight } from "../../hooks/use-delete-insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onInsightDeleted?: () => void;
};

export const Insights = ({ insights, className, onInsightDeleted }: InsightsProps) => {
  const {
    pendingDeleteId,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  } = useDeleteInsight({ onInsightDeleted });

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
                    <span>{getBrandName(brandId)}</span>
                    <div className={styles["insight-meta-details"]}>
                      <span>{date ? moment(date).format("MM/DD/YYYY h:mm A") : "No date"}</span>
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
