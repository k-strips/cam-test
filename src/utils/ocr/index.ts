import { createWorker } from "tesseract.js";

export const extractText = async (imageData: string) => {
  const worker = await createWorker("eng", 1);
  if (!imageData) return;
  const ret = await worker.recognize(imageData);
  return ret.data.text;
};
