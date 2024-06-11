// src/config/config.js
export const pollutionLimits = {
  airQuality: 100, // Example limit
  waterQuality: 50, // Example limit
  noiseLevel: 70, // Example limit
};

export const emailConfig = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
};
