import { useState } from "react";

type UseAddInsightOptions = {
  onClose: () => void;
  onInsightAdded?: () => void;
};

export const useAddInsight = ({ onClose, onInsightAdded }: UseAddInsightOptions) => {
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
    onClose();
    reset();
    onInsightAdded?.();
  };

  const reset = () => {
    setBrand(undefined);
    setText("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInsight(brand ?? 0, text);
  };

  return {
    brand,
    text,
    setBrand,
    setText,
    handleSubmit,
  };
};
