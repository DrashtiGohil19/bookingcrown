const User = require('../model/User');
const { generateStrongPassword, getEmailText } = require('../utils/helper');
const Plan = require('../model/Plan');
const { sendEmail } = require('../utils/emailTranspoter');

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

        let password = null;
        if (!user.password) {
            password = generateStrongPassword();
        }

        if (password) {
            user.password = password;
            await user.save();
        }
        await plan.save();

        sendEmail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: password ? 'Welcome to BookingCrown!' : 'Plan Assignment Details',
            text: await getEmailText(user, plan, password)
        });

        res.status(200).json({ plan, message: `Plan added successfully for ${user.name}`, success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}