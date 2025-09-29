import twilio from 'twilio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get ready to use the super-brain by showing it your library card.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {

  // Get ready to give an answer to the phone.
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  try {
    // We are now asking for the super-reliable "gemini-pro" book!
    console.log("Asking the super-brain a question using the gemini-pro model...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent("Tell me a fun fact about the ocean.");
    const textResponse = result.response.text();
    
    console.log("The super-brain answered:", textResponse);

    // If it works, we'll hear the real answer!
    twiml.say(textResponse);

  } catch (error) {
    // If something goes wrong, we'll write down the reason.
    console.error("The Gemini Api call failed!", error);
    twiml.say('Sorry, I ran into an issue trying to contact the Ai model.');
  }

  // This sends our final answer back to the phone.
  response.setHeader('Content-Type', 'text/xml');
  response.status(200).send(twiml.toString());
}
