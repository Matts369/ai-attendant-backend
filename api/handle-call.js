import twilio from 'twilio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This is our brain waking up the Gemini tool and showing its library card!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {

  // We are telling our brain to get ready to give an answer to the phone.
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  try {
    // This is our brain asking the super-brain its first question!
    console.log("Asking the super-brain a question...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    await model.generateContent("Tell me a fun fact about space.");
    console.log("The super-brain answered!");

    // For today, we will just say a simple message to prove it didn't crash.
    twiml.say('I just successfully asked the super brain a question!');

  } catch (error) {
    // If something goes wrong, we'll say an error message.
    console.error("The super-brain had a problem!", error);
    twiml.say('Oops! I had a little trouble talking to the super brain.');
  }

  // This sends our final answer back to the phone.
  response.setHeader('Content-Type', 'text/xml');
  response.status(200).send(twiml.toString());
}
