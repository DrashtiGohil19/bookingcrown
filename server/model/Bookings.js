const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
    amount: { type: Number },
    date: { type: Date },
    status: { type: String }
});

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String },
    mobilenu: { type: Number },
    date: { type: Date },
    dateRange: [{ type: Date }],
    time: {
        start: { type: String },
        end: { type: String }
    },
    totalHours: { type: String },
    item: [{ type: String, }],
    paymentType: { type: String },
    installment: [installmentSchema],
    amount: { type: Number },
    advance: { type: Number },
    pending: { type: Number },
    payment: { type: String, enum: ["paid", "partial", "pending"] },
    session: { type: String },
    description: { type: String },
    note: { type: String },
}, { timestamps: true });

// bookingSchema.pre('save', function (next) {
//     if (this.advance === this.amount || this.pending === 0) {
//         this.payment = 'paid';
//     } else if (this.advance > 0) {
//         this.payment = 'partial';
//     } else {
//         this.payment = 'pending';
//     }
//     next();
// });

module.exports = mongoose.model('Booking', bookingSchema);
