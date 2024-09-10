exports.generateStrongPassword = (length = 8) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    // const special = '!@#$%^&*()_+[]{}|;:,.<>?';
    // const allCharacters = uppercase + lowercase + numbers + special;
    const allCharacters = uppercase + lowercase + numbers

    let password = '';
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    // password += special.charAt(Math.floor(Math.random() * special.length));

    for (let i = password.length; i < length; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    return password.split('').sort(() => 0.5 - Math.random()).join('');
};

exports.getEmailText = async (user, plan, password = null) => {
    if (password) {
        return `
Dear ${user.name},

We are delighted to welcome you to BookingCrown. Your registration has been completed successfully, and you can now access all the features our platform offers to streamline your business operations.

Your account has been created with the following password: ${password}
Please keep this information secure and use it to log in to your account. You can log in with your email and the provided password.

You now have access to our ${plan.planType} plan, which will be active from ${new Date(plan.startDate).toLocaleDateString("en-GB")} to ${new Date(plan.endDate).toLocaleDateString("en-GB")}.

If you have any questions or need assistance, please contact our support team at +91 99988 83603. We are here to help!

Best regards,
The BookingCrown Team`
    } else {
        return `
Dear ${user.name},

We are pleased to inform you that your plan has been successfully assigned. Here are the details of your plan:

Plan Type: ${plan.planType}
Start Date: ${new Date(plan.startDate).toLocaleDateString("en-GB")}
End Date: ${new Date(plan.endDate).toLocaleDateString("en-GB")}

You can now enjoy the benefits of your assigned plan and access all the features our platform offers.

If you have any questions or need further assistance, please contact our support team at +91 99988 83603.

Best regards,
The BookingCrown Team`
    }
}

exports.generateNewPasswordText = (userName, newPassword) => {
    return `
Dear ${userName},

We have received a request to reset your password. Your new password is:

${newPassword}

Please use this password to log in to your account.

If you encounter any issues or have any questions, please do not hesitate to contact our support team at +91 99988 83603.

Thank you for choosing Booking Crown!

Best regards,
The Booking Crown Team
    `;
};