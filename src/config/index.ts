/** @format */

require("dotenv").config();

export const config = {
  appname: "eakazi",
  web: {
    port: process.env.PORT || "8082",
    header_name: process.env.HEADER_NAME || 'eakazi-auth-token',
    jwt_secret: process.env.JWT_SECRET || "myKXAXZXI902@@#@50381.C03",
    jwt_duration: process.env.JWT_DURATION || '1h',
    jwt_activation: process.env.JWT_ACCOUNT_ACTIVATION,
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 60,
  },
  sendgrid: {
    email_from: process.env.EMAIL_FROM,
    client_url: process.env.CLIENT_URL,
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379,
    db: parseInt(process.env.REDIS_DB) || 0,
    ttl:    parseInt(process.env.REDIS_DB) * 60 || 60 * 60,
  },
};
