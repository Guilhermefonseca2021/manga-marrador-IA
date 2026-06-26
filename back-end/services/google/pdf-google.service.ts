import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient();

export class PdfGoogleService {
  // Nota: PDFs grandes exigem processamento via GCS (Google Cloud Storage)
  static async extractFromPdf(gcsUri: string) {
    const request = {
      requests: [
        {
          inputConfig: {
            gcsSource: { uri: gcsUri },
            mimeType: "application/pdf",
          },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        },
      ],
    };
    const operationResponse = (await client.asyncBatchAnnotateFiles(
      request as any,
    )) as any;
    const operation = operationResponse[0];
    await operation.promise();
    return "Processamento assíncrono iniciado. Verifique o bucket de saída.";
  }
}
