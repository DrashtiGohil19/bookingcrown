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
        const { customerName, mobilenu, date, time, totalHours, amount, advance, pending, session, item, description, note, paymentType, installment } = req.body;

        let query
        let bookingData = {
            userId,
            customerName,
            mobilenu,
            item,
            paymentType
        };
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
            bookingData.date = date;
        } else {
            const startDate = date[0];
            const endDate = date[1] || date[0];

            if (session === "Full Day") {
                query = {
                    item: { $in: item },
                    $and: [
                        { "dateRange.0": { $lte: endDate } },
                        { "dateRange.1": { $gte: startDate } },
                    ],
                    session: { $ne: "Full Day" }
                };
            } else {
                query = {
                    item: { $in: item },
                    $and: [
                        { "dateRange.0": { $lte: endDate } },
                        { "dateRange.1": { $gte: startDate } },
                        { session: session }
                    ]
                };
            }
            bookingData.dateRange = date
        }
        const existingBooking = await Bookings.findOne(query);
        if (existingBooking) {
            return res.status(400).json({ message: "Unable to add booking, Booking already exists for the specified time and date.", success: false });
        }

        if (paymentType === "one-time") {
            bookingData.amount = amount;
            bookingData.advance = advance;
            bookingData.pending = pending;
            bookingData.payment = pending === 0 ? "paid" : "pending";
        } else if (paymentType === "installment" && Array.isArray(installment)) {
            bookingData.installment = installment.map(inst => ({
                amount: inst.amount,
                date: inst.date,
                status: inst.status || "pending"
            }));
            const allComplete = installment.every(inst => inst.status === "complete");
            bookingData.payment = allComplete ? "paid" : "pending";
        }

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

        if (description) {
            bookingData.description = description
        }

        if (note) {
            bookingData.note = note
        }

        const booking = new Bookings(bookingData);
        await booking.save();
        res.status(200).json({ booking, message: "Booking created succesfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the booking", error: error.message });
    }
};

// exports.updateBookingDetails = async (req, res) => {
//     try {
//         const {
//             customerName,
//             mobilenu,
//             date,
//             time,
//             totalHours,
//             amount,
//             advance,
//             pending,
//             session,
//             item,
//             fullyPaid
//         } = req.body;

//         let booking = await Bookings.findById(req.params.id);
//         if (!booking) return res.status(404).json({ error: 'Booking not found' });

//         let checkForConflict = false
//         let query

//         const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
//         const bookingFormattedDate = dayjs(booking.date).format('YYYY-MM-DD');
//         const isDateDifferent = formattedDate && !dayjs(formattedDate).isSame(bookingFormattedDate, 'day');
//         const isTimeDifferent = time && (time.start !== booking.time.start || time.end !== booking.time.end);
//         const isSessionDifferent = session && session !== booking.session;
//         const isItemDifferent = item && item !== booking.item;

//         if (isDateDifferent || isTimeDifferent || isSessionDifferent || isItemDifferent) {
//             checkForConflict = true;

//             if (time) {
//                 const parsedStartTime = dayjs(time.start, "h:mm A");
//                 const parsedEndTime = dayjs(time.end, "h:mm A");

//                 query = {
//                     item: item || booking.item,
//                     date: date || booking.date,
//                     $or: [
//                         {
//                             $and: [
//                                 { "time.start": { $lt: parsedEndTime } },
//                                 { "time.end": { $gt: parsedStartTime } }
//                             ]
//                         },
//                         {
//                             $and: [
//                                 { "time.start": { $gte: parsedStartTime } },
//                                 { "time.end": { $lte: parsedEndTime } }
//                             ]
//                         }
//                     ]
//                 };
//             } else {
//                 // if (session === "Full Day") {
//                 //     query = {
//                 //         item: item || booking.item,
//                 //         date: date || booking.date,
//                 //         $or: [
//                 //             { session: "Morning Session" },
//                 //             { session: "Afternoon Session" }
//                 //         ],
//                 //         _id: { $ne: req.params.id }
//                 //     }
//                 // } else {
//                 //     query = {
//                 //         item: item || booking.item,
//                 //         date: date || booking.date,
//                 //         session: session || booking.session
//                 //     };
//                 // }
//                 if (session === "Full Day") {
//                     query = {
//                         item: item || booking.item,
//                         date: date || booking.date,
//                         $or: [
//                             { session: "Morning Session" },
//                             { session: "Evening Session" },
//                             { session: "Full Day" }
//                         ],
//                         _id: { $ne: req.params.id }
//                     };
//                 } else if (session === "Morning Session" || session === "Evening Session") {
//                     query = {
//                         item: item || booking.item,
//                         date: date || booking.date,
//                         $or: [
//                             { session: "Full Day" },
//                             { session: session }
//                         ],
//                         _id: { $ne: req.params.id }
//                     };
//                 } else {
//                     query = {
//                         item: item,
//                         date: date,
//                         session: session
//                     };
//                 }
//             }

//             const existingBooking = await Bookings.findOne(query);

//             if (existingBooking) {
//                 return res.status(400).json({ message: "Unable to update booking, Booking already exists for the specified time and date.", success: false });
//             }
//         }

//         if (customerName !== undefined) booking.customerName = customerName;
//         if (mobilenu !== undefined) booking.mobilenu = mobilenu;
//         if (totalHours !== undefined) booking.totalHours = totalHours;
//         if (amount !== undefined) booking.amount = amount;
//         if (advance !== undefined) booking.advance = advance;
//         if (pending !== undefined) booking.pending = pending;

//         if (checkForConflict) {
//             if (time) {
//                 booking.time = {
//                     start: dayjs(time.start, "h:mm A"),
//                     end: dayjs(time.end, "h:mm A")
//                 };
//             }
//             if (date !== undefined) booking.date = date;
//             if (session !== undefined) booking.session = session;
//             if (item !== undefined) booking.item = item;
//         }

//         if (fullyPaid) {
//             booking.payment = 'paid';
//             booking.pending = 0;
//         } else {
//             if (booking.advance === booking.amount || booking.pending === 0) {
//                 booking.payment = 'paid';
//             } else if (booking.advance > 0) {
//                 booking.payment = 'partial';
//             } else {
//                 booking.payment = 'pending';
//             }
//         }

//         await booking.save();

//         res.status(200).json({ booking, message: "Booking updated successfully", success: true });
//     } catch (error) {
//         res.status(400).json({ error: error.message, message: "An error occurred while updating the booking" });
//     }
// };

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
            fullyPaid,
            paymentType,
            installment,
            description,
            note
        } = req.body;


        const booking = await Bookings.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found', success: false });

        let checkForConflict = false;
        let query;

        const formattedDate = date ? [dayjs(date[0]), dayjs(date[1] || date[0])] : null;
        const bookingDateRange = booking.dateRange || [];
        const isDateDifferent = formattedDate &&
            (!dayjs(bookingDateRange[0]).isSame(formattedDate[0], 'day') ||
                !dayjs(bookingDateRange[1]).isSame(formattedDate[1], 'day'));

        const isTimeDifferent = time &&
            (time.start !== booking.time.start || time.end !== booking.time.end);
        const isSessionDifferent = session && session !== booking.session;
        const isItemDifferent = item && !booking.item.includes(item);

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
                    ],
                    _id: { $ne: req.params.id }
                };
            } else if (session === "Full Day") {
                query = {
                    item: item || booking.item,
                    date: date || booking.dateRange,
                    $or: [
                        { session: "Morning Session" },
                        { session: "Evening Session" },
                        { session: "Full Day" }
                    ],
                    _id: { $ne: req.params.id }
                };
            } else {
                query = {
                    item: item || booking.item,
                    date: date || booking.dateRange,
                    session: session || booking.session,
                    _id: { $ne: req.params.id }
                };
            }

            const existingBooking = await Bookings.findOne(query);
            if (existingBooking) {
                return res.status(400).json({
                    message: "Unable to update booking, conflict exists with specified date and time.",
                    success: false
                });
            }
        }

        if (customerName !== undefined) booking.customerName = customerName;
        if (mobilenu !== undefined) booking.mobilenu = mobilenu;
        if (totalHours !== undefined) booking.totalHours = totalHours;
        if (amount !== undefined) booking.amount = amount;
        if (advance !== undefined) booking.advance = advance;
        if (pending !== undefined) booking.pending = pending;
        if (description !== undefined) booking.description = description;
        if (note !== undefined) booking.note = note;

        if (paymentType === "installment" && Array.isArray(installment)) {
            booking.installment = installment.map(inst => {
                const parsedDate = dayjs(inst.date);

                if (!parsedDate.isValid()) {
                    throw new Error(`Invalid date format for installment date: ${inst.date}`);
                }

                return {
                    amount: inst.amount,
                    date: parsedDate.toDate(),
                    status: inst.status || "pending"
                };
            });
        }
        else if (paymentType === "one-time") {
            booking.amount = amount;
            booking.advance = advance;
            booking.pending = pending;
        }
        booking.paymentType = paymentType;

        if (checkForConflict) {
            if (time && time.start && time.end) {
                booking.time = {
                    start: dayjs(time.start, "h:mm A"),
                    end: dayjs(time.end, "h:mm A")
                };
            }
            // if (date) booking.dateRange = formattedDate;
            if (session) booking.session = session;
            if (item) booking.item = Array.isArray(item) ? item : [item];
        }

        // if (fullyPaid) {
        //     booking.payment = 'paid';
        //     booking.pending = 0;
        // } else {
        //     booking.payment = booking.advance >= booking.amount ? 'paid' : (booking.advance > 0 ? 'partial' : 'pending');
        // }
        if (fullyPaid) {
            booking.payment = 'paid';

            if (paymentType === "installment" && Array.isArray(booking.installment)) {
                booking.installment = booking.installment.map(inst => ({
                    ...inst,
                    status: "complete"
                }));
            } else if (paymentType === "one-time") {
                if (fullyPaid) {
                    booking.pending = 0;
                } else {
                    booking.payment = booking.advance >= booking.amount ? 'paid' : (booking.advance > 0 ? 'partial' : 'pending');
                }
            }
        }

        await booking.save();
        res.status(200).json({ booking, message: "Booking updated successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the booking", error: error.message });
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