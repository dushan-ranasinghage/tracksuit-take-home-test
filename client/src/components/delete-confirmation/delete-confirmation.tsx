import React from "react";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./delete-confirmation.module.css";

type DeleteConfirmationProps = ModalProps & {
  onConfirm(): void;
};

export const DeleteConfirmation = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationProps) => {
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Delete Insight</h2>
        <p className={styles.message}>
          Are you sure you want to delete this insight? This action can not be undone.
        </p>
        <div className={styles.actions}>
          <Button
            label="Cancel"
            theme="secondary"
            onClick={onClose}
          />
          <Button
            label="Delete"
            theme="primary"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};
