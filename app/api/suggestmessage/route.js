import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAIStream, StreamingTextResponse } from "ai"; 

// Create a Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const runtime = "edge";

export async function POST(req) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. 
    Each question should be separated by '||'. These questions are for 
    an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. 
    Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.
    For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have 
    dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions 
    are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`; 

//     const models = await genAI.listModels();
// console.log("available models: ",models);

    // Ask Gemini for a streaming response
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContentStream(prompt);

    // Convert the response into a stream (same pattern as your OpenAI code)
    const stream = OpenAIStream(response);

    // Send the stream back as a response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Gemini error:", error);
    return Response.json(
      { error: "interxnal server error" },
      { status: 500 }
    );
  }
}