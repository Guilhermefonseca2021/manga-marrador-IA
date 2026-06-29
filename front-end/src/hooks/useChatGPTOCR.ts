import { useState } from "react";
import { chatGPTOCR } from "../services/chatGPTOCR";

export function useChatGPTOCR() {
  const [loading, setLoading] = useState(false);

  async function process(imagePath: string) {
    setLoading(true);

    try {
      const res = await chatGPTOCR(imagePath);

      return res.text;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    process,
  };
}
