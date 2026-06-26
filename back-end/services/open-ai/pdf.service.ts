import fs from "fs/promises";
import path from "path";
import { fromPath } from "pdf2pic";

export class PdfService {
  async convertPdfToImages(pdfPath: string): Promise<string[]> {
    const outputDir = path.join(process.cwd(), "pages");

    await fs.mkdir(outputDir, { recursive: true });

    const converter = fromPath(pdfPath, {
      density: 200,
      saveFilename: "page",
      savePath: outputDir,
      format: "png",
      width: 2000,
      height: 3000,
    });

    const results = await converter.bulk(-1);
 
    return results
      .map((r) => r.path)
      .filter((p): p is string => typeof p === "string")
      .map((p) => path.basename(p));
  }
}