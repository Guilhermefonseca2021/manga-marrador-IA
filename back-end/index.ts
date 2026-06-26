import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import ocrRouter from "./routes/ocr.route";
import ocrGoogleRouter from "./routes/ocr-google.route";
import { PdfService } from "./services/open-ai/pdf.service";
import { VisionService } from "./services/open-ai/vision.service";
import { TtsService } from "./services/open-ai/tts.service";
import { TtsGoogleService } from "./services/google/tts-google.service";

const ttsService = new TtsService();
const pdfService = new PdfService();

dotenv.config();
console.log("API KEY:", process.env.OPENAI_API_KEY);

const app = express();
const visionService = new VisionService();

app.use(express.json());
app.use(cors());

const pagesDir = path.resolve(process.cwd(), "pages");

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

app.use("/pages", express.static(path.join(pagesDir))); 
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (_, res) => {
  res.json({
    TESTE: "Manga narrator AI",
  });
});

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "PDF não enviado",
      });
    }

    return res.json({
      success: true,
      file: req.file.filename,
      path: req.file.path,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno",
    });
  }
});

app.post("/process", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const pages = await pdfService.convertPdfToImages(req.file.path);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const pagesWithUrl = pages.map((file: string) => ({
      file,
      url: `${baseUrl}/pages/${file}`,
    }));

    return res.json({
      totalPages: pagesWithUrl.length,
      pages: pagesWithUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar PDF" });
  }
});

app.post("/vision", async (req, res) => {
  console.log("===== VISION =====");

  try {
    const { image } = req.body;

    console.log("Imagem:", image);

    const imagePath = path.join(__dirname, "pages", image);

    console.log("Path:", imagePath);

    console.log("Existe:", fs.existsSync(imagePath));

    const result = await visionService.analyzePage(imagePath);

    console.log("Sucesso!");

    return res.json({
      result,
    });
  } catch (error: any) {
    console.error("ERRO COMPLETO:");
    console.error(error);

    return res.status(500).json({
      error: error?.message,
      stack: error?.stack,
    });
  }
});

app.use(ocrRouter);
app.use("/google/ocr", ocrGoogleRouter);

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    const audioUrls = await ttsService.generateAudioFiles(text);

    return res.json({
      audioUrls,
    });
  } catch (error: any) {
    console.error("ERRO TTS:");
    console.error(error);

    return res.status(500).json({
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// Adicione isto perto das outras rotas de TTS
app.post("/google/tts", async (req, res) => {
  try {
    const { text } = req.body;
    
    // Supondo que você tenha um GoogleTtsService ou similar
    // Ajuste conforme o nome da sua classe/serviço
    const audioUrls = await TtsGoogleService.synthesize(text)

    return res.json({
      audioUrls,
    });
  } catch (error: any) { 
    console.error("ERRO GOOGLE TTS:", error);
    return res.status(500).json({
      error: error?.message || "Erro ao gerar áudio com Google",
    });
  }
});

const audioDir = path.join(__dirname, "audios");

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

app.use("/audios", express.static(audioDir));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado em http://localhost:${PORT}`);
});
