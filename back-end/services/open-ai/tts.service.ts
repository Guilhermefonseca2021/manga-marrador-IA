import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import Key from "../../config/connectOpenAi";


export class TtsService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: Key.apiKey,
    });
  }

  async generateAudioFiles(text: string): Promise<string[]> {
    const audiosDir = path.join(process.cwd(), "audios");

    await fs.mkdir(audiosDir, { recursive: true });

    const chunks = text.split("\n").filter(Boolean);

    const urls: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const speech = await this.client.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: chunks[i],
      });

      const fileName = `audio-${Date.now()}-${i}.mp3`;
      const filePath = path.join(audiosDir, fileName);

      const buffer = Buffer.from(await speech.arrayBuffer());

      await fs.writeFile(filePath, buffer);

      urls.push(`/audios/${fileName}`);
    }

    return urls;
  }
}