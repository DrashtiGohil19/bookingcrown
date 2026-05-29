const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    mobilenu: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    businessType: {
        type: String,
        // enum: ["Box Cricket", "Cafe/Restaurant", "Hotel management", "Farm"]
    },
    businessName: {
        type: String,
    },
    address: {
        type: String,
    },
    // sessionList: {
    //     type: [String]
    // },
    itemList: {
        type: [String]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('businessType')) {
        if (["Box Cricket", "Cafe/Restuarant", "Cafe/Restaurant"].includes(this.businessType)) {
            this.bookingType = 'hourly';
        } else {
            this.bookingType = 'daily';
        }
    }
    next();
});


// Compare entered password with hashed password
// UserSchema.methods.matchPassword = function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', UserSchema);

module.exports = User;
