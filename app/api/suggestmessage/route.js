import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const runtime = "edge";

export async function POST(req) {
  try {

    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string.
    Each question should be separated by '||'. These questions are for
    an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience.
    Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.`;

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    return Response.json({ output: text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}