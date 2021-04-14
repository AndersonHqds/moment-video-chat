import dotenv from "dotenv";
dotenv.config();

export default {
  accountSid: process.env.TWILIO_ACCOUNT_SID || "",
  apiKey: process.env.TWILIO_API_KEY || "",
  apiSecret: process.env.TWILIO_API_SECRET || "",
};
