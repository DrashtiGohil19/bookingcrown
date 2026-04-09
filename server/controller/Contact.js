const { emailTransporter } = require('../utils/emailTranspoter');

exports.submitContactForm = async (req, res) => {
    const { name, email, phone, businessType, message } = req.body;

    try {
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }

        const transporter = await emailTransporter();

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `BookingCrown contact request from ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone || 'Not provided'}`,
                `Business type: ${businessType || 'Not provided'}`,
                '',
                'Message:',
                message,
            ].join('\n'),
        });

        res.status(200).json({
            success: true,
            message: 'Thanks for contacting BookingCrown. We will get back to you soon.',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'We could not send your message right now. Please try again later.' });
    }
};
