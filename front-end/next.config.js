/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAE_BUCKET: process.env.STORAE_BUCKET,
    MESSAGIN_SENDER_ID: process.env.MESSAGIN_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MESUREMENT_ID: process.env.MESUREMENT_ID
  }
}

module.exports = nextConfig
