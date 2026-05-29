const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planType: { type: String, required: true, enum: ["Basic", "Premium"] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
