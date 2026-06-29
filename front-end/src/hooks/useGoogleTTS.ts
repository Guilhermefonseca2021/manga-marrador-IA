import { useState } from "react";
import { googleTTS } from "../services/googleTTS";

export function useGoogleTTS() {
  const [loading, setLoading] = useState(false);

  async function generate(text: string) {
    setLoading(true);

    try {
      const res = await googleTTS(text);
      return res.audioUrls;
    } finally {
      setLoading(false);
    }
  }

  return { loading, generate };
}
