const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const Plan = require("../model/Plan");
const dayjs = require('dayjs');
const { generateStrongPassword, generateNewPasswordText } = require("../utils/helper");
const { emailTransporter } = require("../utils/emailTranspoter");
const JWT_SECRET = process.env.JWT_SECRET

exports.createUser = async (req, res) => {
    const { name, email, mobilenu, businessType, businessName, address } = req.body;

    try {
        if (!name || !email || !mobilenu || !businessType || !businessName || !address) {
            return res.status(400).json({ message: 'name, email, business type, businessName, address all fields are required' });
        }

        const emailRegex = /^[a-z][^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: `User with the email ${email} already exists. Please provide another email` });
        }

        user = new User({
            name,
            email,
            mobilenu,
            businessType,
            businessName,
            address
        });

        await user.save()
        res.status(200).json({ success: true, message: 'Your account has been successfully created.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ err: err.message, message: "An error occurred while creating the user" });
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email, mobilenu, businessType, businessName, address, itemList, sessionList } = req.body;

    try {
        if (!name || !email || !mobilenu || !businessType || !businessName || !address || !itemList || !sessionList) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.mobilenu = mobilenu;
        user.businessType = businessType;
        user.businessName = businessName;
        user.address = address;
        user.itemList = itemList;
        user.sessionList = sessionList

        await user.save();

        res.status(200).json({ success: true, message: 'Your details updated successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const emailLowerFirst = email.charAt(0).toLowerCase() + email.slice(1);

        let user = await User.findOne({ email: emailLowerFirst });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later', success: false });
        }

        let planExpired = false;
        if (user.role === "user") {
            const plan = await Plan.findOne({ userId: user._id }).sort({ createdAt: -1 });
            if (!plan || dayjs(plan.endDate).isBefore(dayjs().startOf('day'))) {
                planExpired = true;
            }
        }

        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        jwt.sign(payload, JWT_SECRET, (err, token) => {
            if (err) throw err;

            if (planExpired) {
                return res.status(200).json({
                    token,
                    success: true,
                    message: 'Access Denied. Your plan has expired or you do not have any active plan.',
                    role: user.role,
                    access: false
                });
            }

            res.json({ token, success: true, message: "Login successful", role: user.role, access: true });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'Current password and new password should not be same' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // Separate regex for each validation
        const minLengthPattern = /.{6,}/;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const numberPattern = /\d/;
        // const specialCharPattern = /[@$!%*?&]/;

        if (!minLengthPattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        if (!uppercasePattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one uppercase letter'
            });
        }

        if (!lowercasePattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one lowercase letter'
            });
        }

        if (!numberPattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one number'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "An error occurred while changing password" });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newGeneratedPassword = generateStrongPassword()
        user.password = newGeneratedPassword
        await user.save()

        const transporter = await emailTransporter();

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Your new password',
            text: generateNewPasswordText(user.name, newGeneratedPassword)
        });

        res.status(200).json({ message: 'New password sent to your email address', success: true });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
}

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await User.findById(userId)
        if (!data) return res.status(304).json({ message: 'No User found' });
        const userPlan = await Plan.findOne({ userId: userId });

        res.status(200).json({
            message: 'User data retrieved successfully',
            success: true,
            data: data,
            plan: userPlan || {}
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const Users = await User.find({ role: "user" });

        if (!Users || Users.length === 0) {
            return res.status(400).json({ message: "No user data found" });
        }

        const allUsers = await Promise.all(Users.map(async (user) => {
            const plan = await Plan.findOne({ userId: user._id }).sort({ createdAt: -1 }).limit(1);
            return {
                ...user._doc,
                planData: plan || null
            };
        }));

        res.status(200).json({
            message: 'User data retrieved successfully',
            success: true,
            allUsers
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUserByAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const { bType } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID not provided!" });
        }

        if (!bType) {
            return res.status(400).json({ message: "Business type not provided!" });
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { businessType: bType },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ success: true, message: 'User details updated successfully!', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server error' });
    }
}

exports.checkUserAccess = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const plan = await Plan.findOne({ userId: user._id }).sort({ createdAt: -1 }).limit(1);
        const planEndDate = plan.endDate;

        const currentDate = dayjs().startOf('day');
        const planEnd = planEndDate ? dayjs(planEndDate).endOf('day') : null;


        const hasActivePlan = planEnd ? planEnd.isAfter(currentDate) : false;

        if (!hasActivePlan) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json({ message: 'Access granted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to authenticate token' });
    }
}