import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Ensure this model ID is correct
    });

    const generationConfig = {
      temperature: 0.3,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 200,
      responseMimeType: 'text/plain',
    };

    console.log("Starting chat session with message:", userMessage);

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            { text: userMessage }
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(userMessage);
    console.log("Received response:", result.response.text());

    return NextResponse.json({ content: result.response.text() });
  } catch (error) {
    console.error('Error from Gemini API:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request.' },
      { status: 500 }
    );
  }
}
