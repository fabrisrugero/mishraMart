import { z } from "zod";

export const formSchema = z.object({
  src: z.string().min(1, { message: "List is required." }),
});

export const fileDataSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  data: z.string(),
});

export const FileDataArraySchema = z.array(fileDataSchema);
export type FileDataMessage = z.infer<typeof fileDataSchema>;
