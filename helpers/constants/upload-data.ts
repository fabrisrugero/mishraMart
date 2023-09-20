import { createWorker } from "tesseract.js";

export const uploadData = async (url: string | undefined) => {
  const worker = await createWorker({
    // logger: (m) => console.log(m),
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(`${url}`);

  await worker.terminate();
  return text;
};
