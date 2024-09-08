const Bookings = require("../model/Bookings");
const User = require("../model/User");
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

exports.createBookings = async (req, res) => {
    try {
        const userId = req.user.id
        const { customerName, mobilenu, date, time, totalHours, amount, advance, pending, session, item } = req.body;

        let existingBooking
        if (time) {
            const parsedStartTime = dayjs(time.start, "h:mm A");
            const parsedEndTime = dayjs(time.end, "h:mm A");

            existingBooking = await Bookings.findOne({
                item: item,
                date: date,
                $or: [
                    {
                        $and: [
                            { "time.start": { $lt: parsedEndTime.format("HH:mm") } },
                            { "time.end": { $gt: parsedStartTime.format("HH:mm") } }
                        ]
                    },
                    {
                        "time.start": { $gte: parsedStartTime.format("HH:mm") },
                        "time.end": { $lte: parsedEndTime.format("HH:mm") }
                    }
                ]
            });

        } else {
            existingBooking = await Bookings.findOne({
                item: item,
                date: date
            });
        }

        if (existingBooking) {
            return res.status(400).json({ message: "Booking already exists for the given time and date", success: false });
        }

        const booking = new Bookings({
            userId,
            customerName,
            mobilenu,
            date,
            time,
            totalHours,
            amount,
            advance,
            pending,
            session,
            item
        });

        await booking.save();
        res.status(200).json({ booking, message: "Booking created succesfully", success: true });
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ error: error.message });
    }
}

exports.updateBookingDetails = async (req, res) => {
    try {
        const {
            customerName,
            mobilenu,
            date,
            time,
            totalHours,
            amount,
            advance,
            pending,
            session,
            item,
            fullyPaid
        } = req.body;

        let booking = await Bookings.findById(req.params.id);

        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        if (customerName !== undefined) booking.customerName = customerName;
        if (mobilenu !== undefined) booking.mobilenu = mobilenu;
        if (date !== undefined) booking.date = date;
        if (time !== undefined) booking.time = time;
        if (totalHours !== undefined) booking.totalHours = totalHours;
        if (amount !== undefined) booking.amount = amount;
        if (advance !== undefined) booking.advance = advance;
        if (pending !== undefined) booking.pending = pending;
        if (session !== undefined) booking.session = session;
        if (item !== undefined) booking.item = item;

        if (fullyPaid) {
            booking.payment = 'paid';
            booking.pending = 0;
        } else {
            if (booking.advance === booking.amount || booking.pending === 0) {
                booking.payment = 'paid';
            } else if (booking.advance > 0) {
                booking.payment = 'partial';
            } else {
                booking.payment = 'pending';
            }
        }

        await booking.save();

        res.status(200).json({ booking, message: "Booking updated successfully", success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBookings = async (req, res) => {
    try {
        const booking = await Bookings.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully', success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Bookings.find({ userId: userId })

        if (!bookings.length) return res.status(400).json({ message: 'No bookings found' });

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getSingleBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const bookingsData = await Bookings.findById(id)
        if (!bookingsData) return res.status(404).json({ error: 'No bookings found' });

        const ownerData = await User.findById(bookingsData.userId)
        const bookings = { ...bookingsData._doc, ownerData: ownerData }

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
