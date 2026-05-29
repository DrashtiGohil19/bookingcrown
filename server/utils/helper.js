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

