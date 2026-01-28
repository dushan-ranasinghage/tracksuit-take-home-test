import React from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import { useAddInsight } from "../../hooks/use-add-insight.ts";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps & {
  onInsightAdded?: () => void;
};

export const AddInsight = (props: AddInsightProps) => {
  const { brand, text, errors, setBrand, setText, handleSubmit } = useAddInsight({
    onClose: props.onClose,
    onInsightAdded: props.onInsightAdded,
  });

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Brand
          <select
            className={`${styles["field-input"]} ${errors.brand ? styles["field-input-error"] : ""}`}
            value={brand ?? ""}
            onChange={(e) => setBrand(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Select a brand</option>
            {BRANDS.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
          {errors.brand && <span className={styles["field-error"]}>{errors.brand}</span>}
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={`${styles["field-input"]} ${errors.text ? styles["field-input-error"] : ""}`}
            rows={5}
            placeholder="Something insightful..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {errors.text && <span className={styles["field-error"]}>{errors.text}</span>}
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
