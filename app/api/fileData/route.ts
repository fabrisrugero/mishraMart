import { FileDataArraySchema } from "@/lib/validators/file";
import {
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/validators/openai-stream";

export async function POST(req: Request) {
  const { messages, Products } = await req.json();
  console.log("Products->", Products);
  console.log("MESSSSSSSSSSSSSSSSSSSSS", messages);
  const jsonData = JSON.stringify(Products);

  const parsedMessages = FileDataArraySchema.parse(messages);
  const Prompt = `f"""
  You will be provided with a string of items data that user want to order form online superMarket store \
  user may give wrong spelling of items and even the wrong dimensions \
  items should be related to everyday food items. \
  Now let me clear you the task with the help of example -> \
  Suppose user give this input -> "Su gon 2 Mnion 3  Chete 6" \
  as we can see that user has given wrong spelling of sugon and chese and Mnion and wrong dimensions of chese \
  so we can see that user is trying to order -> \
  1. sugar 1 \
  2. onions 3 \
  3. cheese 6 \
  as we know that cheese cannot be in liquid form the user is trying to order 2 pieces \
  so your task is to predict the items that user is trying to order as illustrated in above example \  
  return them in JSON format with name , quantity as key \
  eg-> you will return this way \
  [{"name" :"sugar","quantity":"1"},{"name":"onions","quantity":"2"},{"name":"cheese", "quantity":"6"}]
  """
`;

  const outboundMessages: any = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.data,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: Prompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
