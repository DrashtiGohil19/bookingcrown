const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'converted', 'rejected'],
        default: 'pending',
    },
    notes: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;

