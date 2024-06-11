// src/services/notificationService.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { emailConfig, twilioConfig } from '../config/config.js';
// matiin firewall sama antivirus, biasanya port nya ke block mereka
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true, 
  auth: {
    type: 'login',
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
});
// transporter.verify((error, success) => {
// 	if (error) {
// 		console.log("Transporter Error", error);
// 	} else {
// 		console.log("Ready to send email", success);
// 	}
// });

const createTwilioClient = () => {
  return twilio(twilioConfig.accountSid, twilioConfig.authToken);
};

const sendEmail = async (recipient, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: emailConfig.user,
      to: recipient,
      subject,
      text,
    });
    console.log(`Email sent to ${recipient}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${recipient}: ${error.stack}`);
    throw error;
  }
};

const sendSMS = async (to, body) => {
  const client = createTwilioClient();
  
  try {
    const message = await client.messages.create({
      body,
      // from: twilioConfig.phoneNumber, // Ensure this is correctly set
      from: "+12058399032", // Ensure this is correctly set
      to: `+${to}`,
    });
    console.log(`SMS sent to ${to}: ${message.sid}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${to}: ${error.stack}`);
    throw error;
  }
};

const sendWhatsApp = async (to, body) => {
  const client = createTwilioClient();
  
  try {
    const message = await client.messages.create({
      body,
      from: `whatsapp:${twilioConfig.phoneNumber}`, // Ensure this is correctly set and prefixed
      to: `whatsapp:+${to}`,
    });
    console.log(`WhatsApp message sent to ${to}: ${message.sid}`);
  } catch (error) {
    console.error(`Failed to send WhatsApp message to ${to}: ${error.stack}`);
    throw error;
  }
};

export {
  sendEmail,
  sendSMS,
  sendWhatsApp,
};
