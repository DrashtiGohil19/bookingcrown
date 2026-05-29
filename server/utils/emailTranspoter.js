const nodemailer = require('nodemailer');

let transporter = null;

exports.emailTransporter = async () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000
        });
    }
    return transporter
}

exports.sendEmail = async (mailOptions) => {
    try {
        const transport = await exports.emailTransporter();
        await Promise.race([
            transport.sendMail(mailOptions),
            new Promise((_, reject) => setTimeout(
                () => reject(new Error('Email send timeout after 30s')),
                30000
            ))
        ]);
    } catch (error) {
        console.error('Email send failed:', error.message);
    }
}
