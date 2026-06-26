import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";
import Key from "../../config/connectOpenAi";

export type OcrMode = "ocr" | "vision";

export class OcrService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: Key.apiKey,
    });
  }

  async extractTextFromPage(
    imageName: string,
    mode: OcrMode = "vision",
  ): Promise<string> {
    const imagePath = path.resolve(process.cwd(), "pages", imageName);

    const base64 = await fs.readFile(imagePath, "base64");

    if (mode === "ocr") {
      // OCR simples via visão (mais barato)
      const res = await this.client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Extraia apenas texto da imagem (OCR puro).",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${base64}`,
                detail: "auto",
              },
            ],
          },
        ],
      });

      return res.output_text;
    }

    // modo vision (mais inteligente)
    const res = await this.client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Leia esta página de mangá:
- extraia falas
- mantenha ordem
- ignore ruído
`,
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    return res.output_text;
  }
}
