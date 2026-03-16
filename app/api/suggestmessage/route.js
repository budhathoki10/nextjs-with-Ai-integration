import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const runtime = "edge";

export async function POST(req) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string.
    Each question should be separated by '||'. These questions are for
    an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience.
    Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.`;


    const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return new StreamingTextResponse(result.stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}