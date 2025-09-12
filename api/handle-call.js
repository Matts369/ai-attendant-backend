const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default function handler(request, response) {
  const twiml = new VoiceResponse();
  twiml.say('Hello from my Vercel function!');

  response.setHeader('Content-Type', 'text/xml');
  response.status(200).send(twiml.toString());
}

