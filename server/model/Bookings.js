const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String },
    mobilenu: { type: Number },
    date: { type: Date },
    time: {
        start: { type: String },
        end: { type: String }
    },
    totalHours: { type: String },
    item: { type: String, },
    amount: { type: Number, required: true },
    advance: { type: Number, default: 0 },
    pending: { type: Number, default: function () { return this.amount - (this.advance || 0); } },
    payment: { type: String, required: true, default: "pending", enum: ["paid", "partial", "pending"] },
    session: {
        type: String
    }
}, { timestamps: true });

bookingSchema.pre('save', function (next) {
    if (this.advance === this.amount || this.pending === 0) {
        this.payment = 'paid';
    } else if (this.advance > 0) {
        this.payment = 'partial';
    } else {
        this.payment = 'pending';
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
