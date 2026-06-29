import { api } from "../hooks/api";

export async function googleOCR(formData: FormData) {
  const { data } = await api.post("/google/ocr", formData);

  return data;
}
