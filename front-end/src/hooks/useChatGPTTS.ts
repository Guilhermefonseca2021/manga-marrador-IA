import { useState } from "react";
import { chatGPTTS } from "../services/chatGPTTS";

export function useChatGPTTS() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string) {
    setLoading(true);

    try {
      return await chatGPTTS(text);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    generate,
  };
}
