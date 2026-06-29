import { api } from "../hooks/api";

export async function chatGPTTS(text: string) {
  const { data } = await api.post("/tts", {
    text,
  });

  return data;
}
