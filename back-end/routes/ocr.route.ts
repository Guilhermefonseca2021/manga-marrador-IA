import { Router } from "express";
import path from "path";
import fs from "fs/promises";
import { OcrService } from "../services/open-ai/ocr.service";

const router = Router();
const ocrService = new OcrService();

router.post("/ocr", async (req, res) => {
  try {
    const { imagePath } = req.body;
    if (!imagePath) return res.status(400).json({ error: "imagePath obrigatório" });

    const fileName = imagePath.split('/').pop();
    
    const fullPath = path.resolve(process.cwd(), "pages", fileName);

    console.log("Tentando acessar arquivo em:", fullPath);

    await fs.access(fullPath); 

    const text = await ocrService.extractTextFromPage(fullPath);
    return res.json({ success: true, text });
  } catch (error: any) {
    console.error("ERRO OCR:", error);
    return res.status(500).json({ error: `Arquivo não encontrado no servidor: ${error.message}` });
  }
});

export default router;