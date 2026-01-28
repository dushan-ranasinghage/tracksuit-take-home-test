import React, { useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps & {
  onInsightAdded?: () => void;
};

export const AddInsight = (props: AddInsightProps) => {
  const [brand, setBrand] = useState<number | undefined>(undefined);
  const [text, setText] = useState<string>("");

  const addInsight = async (_brand: number, _text: string) => {
    const res = await fetch("/api/insights/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand: _brand, text: _text }),
    });
    if (!res.ok) {
      console.error("Failed to add insight", await res.json());
      return;
    }
    props.onClose();
    setBrand(undefined);
    setText("");
    props.onInsightAdded?.();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInsight(brand ?? 0, text);
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            value={brand ?? ""}
            onChange={(e) => setBrand(Number(e.target.value))}
          >
            {BRANDS.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
