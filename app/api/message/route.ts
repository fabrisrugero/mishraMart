import { MessageArraySchema } from "@/lib/validators/message";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/validators/openai-stream";

export async function POST(req: Request) {
  const { messages, cartItems, Products } = await req.json();
  const jsonData = JSON.stringify(cartItems);
  const ProductsjsonData = JSON.stringify(Products);

  const chatbotPrompt = `
  'role':'system', 'content':"""
You are OrderBot, an automated service to collect orders for a supermarket store. \
You first greet the customer, then collects the order, \
and then asks if it's a pickup or delivery. \
You wait to collect the entire order, then summarize it and check for a final \
time if the customer wants to add anything else. \
If it's a delivery, you ask for an address. \
Finally you collect the payment.\
Make sure to clarify all options, extras and sizes to uniquely \
identify the item from the menu.\
You respond in a short, very conversational friendly style. \
The menu includes \
${ProductsjsonData} \ 
and don't respond directly first check in menu that I have given you \
and then respond to user \
these are the items that user have order till now \
${jsonData} 
"""
  `;

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
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
