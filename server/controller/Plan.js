const nodemailer = require('nodemailer');
const User = require('../model/User');
const { generateStrongPassword, getEmailText } = require('../utils/helper');
const Plan = require('../model/Plan');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

exports.createPlan = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { planType, startDate, endDate, amount } = req.body;

        const plan = new Plan({
            userId,
            planType,
            startDate,
            endDate,
            amount
        });
        await plan.save();

        let password = null;
        if (!user.password) {
            password = generateStrongPassword();
            user.password = password
            user.save()
        }

        const emailText = await getEmailText(user, plan, password);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: password ? 'Welcome to BookingCrown!' : 'Plan Assignment Details',
            text: emailText
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ plan, message: `Plan added successfully for ${user.name}`, success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}