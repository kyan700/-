import Tesseract from 'tesseract.js';

export async function extractTextFromImage(file: File, lang: string = 'ara+eng'): Promise<string> {
  const worker = await Tesseract.createWorker(lang);
  try {
    const { data } = await worker.recognize(file);
    return data.text;
  } finally {
    await worker.terminate();
  }
}
