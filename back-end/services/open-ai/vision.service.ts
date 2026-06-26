import OpenAI from "openai";
import fs from "fs/promises";
import Key from "../../config/connectOpenAi";

export class VisionService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: Key.apiKey,
    });
  }
 
  async analyzePage(imagePath: string) {
    const base64 = await fs.readFile(imagePath, "base64");

    const response = await this.client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Analise esta página de mangá:

- extraia diálogos
- identifique ordem de leitura
- ignore ruído
- retorne texto limpo
`,
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64}`,
              detail: "auto"
            },
          ],
        },
      ],
    });

    return response.output_text;
  }
}