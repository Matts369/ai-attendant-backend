import twilio from 'twilio';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  try {
    // *** THIS IS THE NEW STEP! ***
    // Our brain listens for the question sent from Twilio.
    // It's inside the 'request.body'. We named it 'question' in our Twilio flow.
    const userQuestion = request.body.question || "Tell me a fun fact.";

    console.log("The user asked:", userQuestion);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Our brain sends the USER'S question to the super-brain!
    const result = await model.generateContent(userQuestion);
    const textFromTheSuperBrain = result.response.text();

    twiml.say(textFromTheSuperBrain);

  } catch (error) {
    console.error("The super-brain had a problem!", error);
    twiml.say('Oops! I had a little trouble talking to the super brain.');
  }

  response.setHeader('Content-Type', 'text/xml');
  response.status(200).send(twiml.toString());
}
gemini-2.5-flash
