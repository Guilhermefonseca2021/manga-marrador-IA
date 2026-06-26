import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

export class OcrGoogleService {
  static async extractText(imageBuffer: Buffer): Promise<string> {
    const [result] = await client.textDetection({ image: { content: imageBuffer } });
    return result.textAnnotations?.[0]?.description || '';
  }
}