import { Router } from 'express';
import multer from 'multer';
import { OcrGoogleService } from '../services/google/ocr-google.service';

const ocrGoogleRouter = Router();
const upload = multer();

ocrGoogleRouter.post('/google/ocr', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Imagem não enviada.');
    const text = await OcrGoogleService.extractText(req.file.buffer);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Falha no processamento OCR' });
  }
});

export default ocrGoogleRouter;