import 'dotenv/config';

export default {
    apiGPTKey: process.env.OPENAI_API_KEY || '',
    apiGoogleKey: process.env.GEMINI_API_KEY || '',
    PORT: process.env.PORT
};