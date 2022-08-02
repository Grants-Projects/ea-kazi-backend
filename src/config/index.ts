require('dotenv').config();

export const config = {
    appname: "eakazi",
    web: {
        port: process.env.PORT || '8082',
        jwt_secrete:process.env.JWT_SECRET || 'my@50381.C03'
    },
    sendgrid: {
        email_from: process.env.EMAIL_FROM,
        client_url: process.env.CLIENT_URL,
        sendgrid_api_key: process.env.SENDGRID_API_KEY
    }
}