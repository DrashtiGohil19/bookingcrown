const Bookings = require("../model/Bookings");
const User = require("../model/User");
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

exports.createBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { customerName, mobilenu, date, time, totalHours, amount, advance, pending, session, item } = req.body;

        let query
        if (time) {
            // Helper function to convert time to minutes for comparison
            // Handles both IST string format ("06:30 PM") and legacy Date objects
            const timeToMinutes = (timeValue) => {
                if (!timeValue) return null;
                
                // If it's a string (IST format), parse it
                if (typeof timeValue === 'string') {
                    // Normalize the string: remove extra spaces and ensure proper format
                    const normalizedTime = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                    
                    // Try parsing with different formats
                    let parsed = dayjs(normalizedTime, "h:mm A", true); // Strict parsing with single digit hour
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "hh:mm A", true); // Strict parsing with double digit hour
                    }
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "h:mmA", true); // Without space
                    }
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "hh:mmA", true); // Without space, double digit
                    }
                    
                    if (parsed.isValid()) {
                        const hours = parsed.hour();
                        const minutes = parsed.minute();
                        // Handle PM times: 12:XX PM stays 12, 1-11 PM becomes 13-23
                        // AM times: 12:XX AM becomes 0, 1-11 AM stays 1-11
                        const totalMinutes = hours * 60 + minutes;
                        return totalMinutes;
                    }
                    
                    console.error(`Failed to parse time string: "${timeValue}"`);
                    return null;
                }
                
                // If it's a Date object (legacy GMT format), convert to IST then get minutes
                if (timeValue instanceof Date) {
                    const istTime = dayjs.utc(timeValue).tz('Asia/Kolkata');
                    return istTime.hour() * 60 + istTime.minute();
                }
                
                // If it's already a dayjs object
                if (dayjs.isDayjs(timeValue)) {
                    return timeValue.hour() * 60 + timeValue.minute();
                }
                
                return null;
            };
            
            const newStartMinutes = timeToMinutes(time.start);
            const newEndMinutes = timeToMinutes(time.end);
            
            if (newStartMinutes === null || newEndMinutes === null) {
                console.error(`Invalid time format - Start: ${time.start}, End: ${time.end}`);
                return res.status(400).json({ message: "Invalid time format provided. Please use format like '04:00 PM' or '4:00 PM'.", success: false });
            }
            
            // Validate time range
            if (newEndMinutes <= newStartMinutes) {
                return res.status(400).json({ message: "End time must be after start time.", success: false });
            }
            
            // Normalize date for comparison (ignore time component)
            const normalizedDate = dayjs(date).startOf('day').toDate();
            
            // Find bookings with overlapping times by comparing time strings
            // Use a date range query to catch all bookings on the same date regardless of time stored
            const startOfDay = dayjs(date).startOf('day').toDate();
            const endOfDay = dayjs(date).endOf('day').toDate();
            
            const allBookings = await Bookings.find({ 
                item, 
                date: { $gte: startOfDay, $lte: endOfDay }
            });
            
            const conflictingBookings = allBookings.filter(booking => {
                if (!booking.time || !booking.time.start || !booking.time.end) return false;
                
                const existingStartMinutes = timeToMinutes(booking.time.start);
                const existingEndMinutes = timeToMinutes(booking.time.end);
                
                if (existingStartMinutes === null || existingEndMinutes === null) {
                    console.error(`Failed to parse existing booking times - Start: ${booking.time.start}, End: ${booking.time.end}`);
                    return false;
                }
                
                // Check for overlap: new start < existing end AND new end > existing start
                // This catches all overlapping scenarios:
                // - New booking completely inside existing
                // - Existing booking completely inside new
                // - Partial overlaps on either side
                // - Exact matches (same start or same end or completely overlapping)
                // Also check for exact time matches
                const isExactMatch = (newStartMinutes === existingStartMinutes && newEndMinutes === existingEndMinutes);
                const hasOverlap = (newStartMinutes < existingEndMinutes && newEndMinutes > existingStartMinutes) || isExactMatch;
                
                if (hasOverlap) {
                    console.log(`Conflict detected: New booking [${time.start} (${newStartMinutes})-${time.end} (${newEndMinutes})] overlaps with existing [${booking.time.start} (${existingStartMinutes})-${booking.time.end} (${existingEndMinutes})]`);
                }
                
                return hasOverlap;
            });
            
            if (conflictingBookings.length > 0) {
                return res.status(400).json({ message: "Unable to add booking, Booking already exists for the specified time and date.", success: false });
            }
            
            query = { item, date, _id: null }; // Set to never match since we already checked conflicts
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

        // Only check for conflicts if not already checked (for time-based bookings, conflicts were already checked above)
        if (query && query._id !== null) {
            const existingBooking = await Bookings.findOne(query);
            if (existingBooking) {
                return res.status(400).json({ message: "Unable to add booking, Booking already exists for the specified time and date.", success: false });
            }
        }

        const bookingData = {
            userId,
            customerName,
            mobilenu,
            date,
            item,
        };

        if (time && time.start && time.end) {
            // Normalize and store times as IST strings directly (no timezone conversion)
            // Ensure consistent format for storage
            const normalizeTime = (timeStr) => {
                if (!timeStr) return null;
                // Normalize: trim, uppercase, ensure single space
                return timeStr.trim().toUpperCase().replace(/\s+/g, ' ');
            };
            
            bookingData.time = {
                start: normalizeTime(time.start),  // Normalized IST string format (e.g., "04:00 PM")
                end: normalizeTime(time.end)       // Normalized IST string format (e.g., "06:00 PM")
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
                // Helper function to convert time to minutes for comparison
                // Handles both IST string format ("06:30 PM") and legacy Date objects
                const timeToMinutes = (timeValue) => {
                    if (!timeValue) return null;
                    
                    // If it's a string (IST format), parse it
                    if (typeof timeValue === 'string') {
                        // Normalize the string: remove extra spaces and ensure proper format
                        const normalizedTime = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                        
                        // Try parsing with different formats
                        let parsed = dayjs(normalizedTime, "h:mm A", true); // Strict parsing with single digit hour
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "hh:mm A", true); // Strict parsing with double digit hour
                        }
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "h:mmA", true); // Without space
                        }
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "hh:mmA", true); // Without space, double digit
                        }
                        
                        if (parsed.isValid()) {
                            const hours = parsed.hour();
                            const minutes = parsed.minute();
                            const totalMinutes = hours * 60 + minutes;
                            return totalMinutes;
                        }
                        
                        console.error(`Failed to parse time string: "${timeValue}"`);
                        return null;
                    }
                    
                    // If it's a Date object (legacy GMT format), convert to IST then get minutes
                    if (timeValue instanceof Date) {
                        const istTime = dayjs.utc(timeValue).tz('Asia/Kolkata');
                        return istTime.hour() * 60 + istTime.minute();
                    }
                    
                    // If it's already a dayjs object
                    if (dayjs.isDayjs(timeValue)) {
                        return timeValue.hour() * 60 + timeValue.minute();
                    }
                    
                    return null;
                };
                
                const newStartMinutes = timeToMinutes(time.start);
                const newEndMinutes = timeToMinutes(time.end);
                
                if (newStartMinutes === null || newEndMinutes === null) {
                    console.error(`Invalid time format - Start: ${time.start}, End: ${time.end}`);
                    return res.status(400).json({ message: "Invalid time format provided. Please use format like '04:00 PM' or '4:00 PM'.", success: false });
                }
                
                // Validate time range
                if (newEndMinutes <= newStartMinutes) {
                    return res.status(400).json({ message: "End time must be after start time.", success: false });
                }
                
                // Find bookings with overlapping times
                const checkDate = date || booking.date;
                const checkItem = item || booking.item;
                
                // Normalize date for comparison (ignore time component)
                const startOfDay = dayjs(checkDate).startOf('day').toDate();
                const endOfDay = dayjs(checkDate).endOf('day').toDate();
                
                const allBookings = await Bookings.find({ 
                    item: checkItem, 
                    date: { $gte: startOfDay, $lte: endOfDay },
                    _id: { $ne: req.params.id } 
                });
                const conflictingBookings = allBookings.filter(existingBooking => {
                    if (!existingBooking.time || !existingBooking.time.start || !existingBooking.time.end) return false;
                    
                    const existingStartMinutes = timeToMinutes(existingBooking.time.start);
                    const existingEndMinutes = timeToMinutes(existingBooking.time.end);
                    
                    if (existingStartMinutes === null || existingEndMinutes === null) {
                        console.error(`Failed to parse existing booking times - Start: ${existingBooking.time.start}, End: ${existingBooking.time.end}`);
                        return false;
                    }
                    
                    // Check for overlap: new start < existing end AND new end > existing start
                    // Also check for exact time matches
                    const isExactMatch = (newStartMinutes === existingStartMinutes && newEndMinutes === existingEndMinutes);
                    const hasOverlap = (newStartMinutes < existingEndMinutes && newEndMinutes > existingStartMinutes) || isExactMatch;
                    
                    if (hasOverlap) {
                        console.log(`Update: Conflict detected: New booking [${time.start} (${newStartMinutes})-${time.end} (${newEndMinutes})] overlaps with existing [${existingBooking.time.start} (${existingStartMinutes})-${existingBooking.time.end} (${existingEndMinutes})]`);
                    }
                    
                    return hasOverlap;
                });
                
                if (conflictingBookings.length > 0) {
                    return res.status(400).json({ message: "Unable to update booking, Booking already exists for the specified time and date.", success: false });
                }
                
                query = null; // Conflicts already checked
            } else {
                // if (session === "Full Day") {
                //     query = {
                //         item: item || booking.item,
                //         date: date || booking.date,
                //         $or: [
                //             { session: "Morning Session" },
                //             { session: "Afternoon Session" }
                //         ],
                //         _id: { $ne: req.params.id }
                //     }
                // } else {
                //     query = {
                //         item: item || booking.item,
                //         date: date || booking.date,
                //         session: session || booking.session
                //     };
                // }
                if (session === "Full Day") {
                    query = {
                        item: item || booking.item,
                        date: date || booking.date,
                        $or: [
                            { session: "Morning Session" },
                            { session: "Evening Session" },
                            { session: "Full Day" }
                        ],
                        _id: { $ne: req.params.id }
                    };
                } else if (session === "Morning Session" || session === "Evening Session") {
                    query = {
                        item: item || booking.item,
                        date: date || booking.date,
                        $or: [
                            { session: "Full Day" },
                            { session: session }
                        ],
                        _id: { $ne: req.params.id }
                    };
                } else {
                    query = {
                        item: item,
                        date: date,
                        session: session
                    };
                }
            }

            // Only check for conflicts if query exists (session-based bookings)
            if (query) {
                const existingBooking = await Bookings.findOne(query);
                if (existingBooking) {
                    return res.status(400).json({ message: "Unable to update booking, Booking already exists for the specified time and date.", success: false });
                }
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
                // Normalize and store times as IST strings directly (no timezone conversion)
                const normalizeTime = (timeStr) => {
                    if (!timeStr) return null;
                    // Normalize: trim, uppercase, ensure single space
                    return timeStr.trim().toUpperCase().replace(/\s+/g, ' ');
                };
                
                booking.time = {
                    start: normalizeTime(time.start),  // Normalized IST string format (e.g., "04:00 PM")
                    end: normalizeTime(time.end)       // Normalized IST string format (e.g., "06:00 PM")
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