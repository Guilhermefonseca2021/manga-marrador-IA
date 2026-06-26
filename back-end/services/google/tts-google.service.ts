import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export class TtsGoogleService {
  static async synthesize(text: string): Promise<Uint8Array | null | undefined> {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'pt-BR', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    });
    const audioContent = response.audioContent;
    if (typeof audioContent === 'string') {
      return Buffer.from(audioContent, 'base64');
    }
    return audioContent;
  }
}