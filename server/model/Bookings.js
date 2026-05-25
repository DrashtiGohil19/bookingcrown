const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String },
    mobilenu: { type: Number },
    date: { type: Date },
    time: {
        start: { 
            type: String,
            validate: {
                validator: function(v) {
                    // Validate that time is in format like "06:00 PM" or "6:00 PM"
                    return !v || /^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(v);
                },
                message: 'Time must be in format "hh:mm AM/PM" (e.g., "06:00 PM")'
            }
        },
        end: { 
            type: String,
            validate: {
                validator: function(v) {
                    // Validate that time is in format like "06:00 PM" or "6:00 PM"
                    return !v || /^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(v);
                },
                message: 'Time must be in format "hh:mm AM/PM" (e.g., "06:00 PM")'
            }
        }
    },
    totalHours: { type: String },
    item: { type: String, },
    amount: { type: Number, required: true },
    advance: { type: Number, default: 0 },
    pending: { type: Number, default: function () { return this.amount - (this.advance || 0); } },
    payment: { type: String, required: true, default: "pending", enum: ["paid", "partial", "pending"] },
    paymentMethod: { type: String, default: "not_specified", enum: ["cash", "online_transfer", "not_specified"] },
    session: {
        type: String
    }
}, { timestamps: true });

// Helper function to normalize time to simple string format
const normalizeTimeString = (timeValue) => {
    if (!timeValue) return null;
    
    // If it's already a simple time string (e.g., "06:00 PM"), normalize it
    if (typeof timeValue === 'string') {
        // Check if it's a GMT/UTC date string (e.g., "Sun, 23 Nov 2025 18:00:00 GMT")
        if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
            // Extract time from GMT date string and convert to simple time format
            const parsed = dayjs.utc(timeValue);
            if (parsed.isValid()) {
                const hours = parsed.hour();
                const minutes = parsed.minute();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const displayHours = hours % 12 || 12;
                // Return in hh:mm A format (e.g., "06:00 PM")
                return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
            }
            console.error(`[MODEL] Failed to parse GMT date string: ${timeValue}`);
            return null;
        }
        // If it's already a simple time string, normalize it
        if (timeValue.match(/^\d{1,2}:\d{2}\s*(AM|PM)$/i)) {
            // Normalize: ensure uppercase and proper spacing
            return timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
        }
        console.error(`[MODEL] Invalid time string format: ${timeValue}`);
        return null;
    }
    
    // If it's a Date object, extract time
    if (timeValue instanceof Date) {
        const parsed = dayjs.utc(timeValue);
        const hours = parsed.hour();
        const minutes = parsed.minute();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
    }
    
    return null;
};

bookingSchema.pre('save', function (next) {
    // Normalize payment status
    if (this.advance === this.amount || this.pending === 0) {
        this.payment = 'paid';
    } else if (this.advance > 0) {
        this.payment = 'partial';
    } else {
        this.payment = 'pending';
    }
    
    // Normalize time fields - ensure they are simple time strings (e.g., "06:00 PM")
    if (this.time && this.time.start) {
        const normalizedStart = normalizeTimeString(this.time.start);
        if (normalizedStart) {
            this.time.start = normalizedStart;
        } else {
            console.error(`[MODEL] Invalid start time format: ${this.time.start}`);
            return next(new Error(`Invalid start time format. Expected format: "hh:mm AM/PM" (e.g., "06:00 PM")`));
        }
    }
    
    if (this.time && this.time.end) {
        const normalizedEnd = normalizeTimeString(this.time.end);
        if (normalizedEnd) {
            this.time.end = normalizedEnd;
        } else {
            console.error(`[MODEL] Invalid end time format: ${this.time.end}`);
            return next(new Error(`Invalid end time format. Expected format: "hh:mm AM/PM" (e.g., "08:00 PM")`));
        }
    }
    
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
