import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
import { TwilioConfig } from "../configs/types";

const generateToken = (config: TwilioConfig): AccessToken => {
  return new AccessToken(config.accountSid, config.apiKey, config.apiSecret);
};

const getToken = (
  identity: string,
  room: string,
  config: TwilioConfig
): AccessToken => {
  const videoGrant = new VideoGrant({ room });
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

export { getToken };
