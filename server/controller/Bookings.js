const Bookings = require("../model/Bookings");
const User = require("../model/User");
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

exports.createBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { customerName, mobilenu, date, time, totalHours, amount, advance, pending, session, item } = req.body;

        let query
        if (time) {
            const parsedStartTime = dayjs(time.start, "h:mm A")
            const parsedEndTime = dayjs(time.end, "h:mm A");
            query = {
                item,
                date,
                $or: [
                    {
                        $and: [
                            { "time.start": { $lt: parsedEndTime } },
                            { "time.end": { $gt: parsedStartTime } }
                        ]
                    },
                    {
                        $and: [
                            { "time.start": { $gte: parsedStartTime } },
                            { "time.end": { $lte: parsedEndTime } }
                        ]
                    }
                ]
            };
        } else {
            if (session === "Full Day") {
                query = {
                    item,
                    date,
                    $or: [
                        { session: "Morning Session" },
                        { session: "Evening Session" },
                        { session: "Full Day" }
                    ]
                };
            } else if (session === "Morning Session" || session === "Evening Session") {
                query = {
                    item,
                    date,
                    $or: [
                        { session: "Full Day" },
                        { session: session }
                    ]
                };
            } else {
                query = {
                    item: item,
                    date: date,
                    session: session
                };
            }
        }

        const existingBooking = await Bookings.findOne(query);

        if (existingBooking) {
            return res.status(400).json({ message: "Unable to add booking, Booking already exists for the specified time and date.", success: false });
        }

        const bookingData = {
            userId,
            customerName,
            mobilenu,
            date,
            item,
        };

        if (time && time.start && time.end) {
            bookingData.time = {
                start: dayjs(time.start, "h:mm A"),
                end: dayjs(time.end, "h:mm A")
            };
        }

        if (session) {
            bookingData.session = session;
        }

        if (totalHours) {
            bookingData.totalHours = totalHours;
        }

        if (amount) {
            bookingData.amount = amount;
        }

        if (advance) {
            bookingData.advance = advance;
        }

        if (pending) {
            bookingData.pending = pending;
        }

        const booking = new Bookings(bookingData);
        await booking.save();
        res.status(200).json({ booking, message: "Booking created succesfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the booking", error: error.message });
    }
};

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

        let checkForConflict = false
        let query

        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        const bookingFormattedDate = dayjs(booking.date).format('YYYY-MM-DD');
        const isDateDifferent = formattedDate && !dayjs(formattedDate).isSame(bookingFormattedDate, 'day');
        const isTimeDifferent = time && (time.start !== booking.time.start || time.end !== booking.time.end);
        const isSessionDifferent = session && session !== booking.session;
        const isItemDifferent = item && item !== booking.item;

        if (isDateDifferent || isTimeDifferent || isSessionDifferent || isItemDifferent) {
            checkForConflict = true;

            if (time) {
                const parsedStartTime = dayjs(time.start, "h:mm A");
                const parsedEndTime = dayjs(time.end, "h:mm A");

                query = {
                    item: item || booking.item,
                    date: date || booking.date,
                    $or: [
                        {
                            $and: [
                                { "time.start": { $lt: parsedEndTime } },
                                { "time.end": { $gt: parsedStartTime } }
                            ]
                        },
                        {
                            $and: [
                                { "time.start": { $gte: parsedStartTime } },
                                { "time.end": { $lte: parsedEndTime } }
                            ]
                        }
                    ]
                };
            } else {
                if (session === "Full Day") {
                    query = {
                        item: item || booking.item,
                        date: date || booking.date,
                        $or: [
                            { session: "Morning Session" },
                            { session: "Afternoon Session" }
                        ],
                        _id: { $ne: req.params.id }
                    }
                } else {
                    query = {
                        item: item || booking.item,
                        date: date || booking.date,
                        session: session || booking.session
                    };
                }
            }

            const existingBooking = await Bookings.findOne(query);

            if (existingBooking) {
                return res.status(400).json({ message: "Unable to update booking, Booking already exists for the specified time and date.", success: false });
            }
        }

        if (customerName !== undefined) booking.customerName = customerName;
        if (mobilenu !== undefined) booking.mobilenu = mobilenu;
        if (totalHours !== undefined) booking.totalHours = totalHours;
        if (amount !== undefined) booking.amount = amount;
        if (advance !== undefined) booking.advance = advance;
        if (pending !== undefined) booking.pending = pending;

        if (checkForConflict) {
            if (time) {
                booking.time = {
                    start: dayjs(time.start, "h:mm A"),
                    end: dayjs(time.end, "h:mm A")
                };
            }
            if (date !== undefined) booking.date = date;
            if (session !== undefined) booking.session = session;
            if (item !== undefined) booking.item = item;
        }

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
        res.status(400).json({ error: error.message, message: "An error occurred while updating the booking" });
    }
};

exports.deleteBookings = async (req, res) => {
    try {
        const booking = await Bookings.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully', success: true });
    } catch (error) {
        res.status(400).json({ error: error.message, message: "An error occurred while deleting the booking" });
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
        res.status(400).json({ error: error.message, message: "An error occurred while retriving the data" });
    }
}