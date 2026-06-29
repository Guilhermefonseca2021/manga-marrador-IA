// services/googleTTS.ts
import { api } from "../hooks/api";

export async function googleTTS(text: string) {
  const { data } = await api.post("/google/tts", {
    text,
  });

  return data;
}
