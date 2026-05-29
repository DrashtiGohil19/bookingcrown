const nodemailer = require('nodemailer');

let transporter = null;

exports.emailTransporter = async () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    return transporter
}

exports.sendEmail = async (mailOptions) => {
    try {
        const transport = await exports.emailTransporter();
        await Promise.race([
            transport.sendMail(mailOptions),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Email send timeout')), 15000))
        ]);
    } catch (error) {
        console.error('Email send failed:', error.message);
    }
}