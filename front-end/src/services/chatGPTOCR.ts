import { api } from "../hooks/api";

export async function chatGPTOCR(imagePath: string) {
    const { data } = await api.post("/ocr", {
        imagePath,
    });

    return data;
}