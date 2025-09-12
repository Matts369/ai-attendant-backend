import twilio from 'twilio';

export default function handler(request, response) {
  // This is a more direct way to get VoiceResponse, which is safer.
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  twiml.say('Hello from the fixed Vercel function!');

  response.setHeader('Content-Type', 'text/xml');
  response.status(200).send(twiml.toString());
}
