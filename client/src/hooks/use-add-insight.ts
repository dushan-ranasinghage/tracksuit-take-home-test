import { useState } from "react";

type UseAddInsightOptions = {
  onClose: () => void;
  onInsightAdded?: () => void;
};

type ValidationErrors = {
  brand?: string;
  text?: string;
};

const MIN_TEXT_LENGTH = 3;

const validate = (brand: number | undefined, text: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (brand === undefined) {
    errors.brand = "Please select a brand";
  }

  if (!text.trim()) {
    errors.text = "Insight is required";
  } else if (text.trim().length < MIN_TEXT_LENGTH) {
    errors.text = `Insight must be at least ${MIN_TEXT_LENGTH} characters long`;
  }

  return errors;
};

export const useAddInsight = ({ onClose, onInsightAdded }: UseAddInsightOptions) => {
  const [brand, setBrand] = useState<number | undefined>(undefined);
  const [text, setText] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(brand, text);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      addInsight(brand!, text.trim());
    }
  };

  const handleBrandChange = (newBrand: number | undefined) => {
    setBrand(newBrand);

    if (newBrand !== undefined && errors.brand) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.brand;
        return newErrors;
      });
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);

    if (newText.trim() && newText.trim().length >= MIN_TEXT_LENGTH && errors.text) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.text;
        return newErrors;
      });
    }
  };

  return {
    brand,
    text,
    errors,
    setBrand: handleBrandChange,
    setText: handleTextChange,
    handleSubmit,
  };
};
