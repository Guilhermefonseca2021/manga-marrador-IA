import { Router } from "express";
import multer from "multer";
import { OcrGoogleService } from "../services/google/ocr-google.service";

const ocrGoogleRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

ocrGoogleRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Imagem não enviada.",
      });
    }

    const text = await OcrGoogleService.extractText(req.file.buffer);

    return res.json({ text });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Falha no processamento OCR",
    });
  }
});

export default ocrGoogleRouter;
