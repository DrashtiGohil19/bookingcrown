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
        const { customerName, mobilenu, date, time, totalHours, amount, advance, pending, session, item, paymentMethod, advancePaymentMethod } = req.body;
        
        // Debug log to see what we're receiving
        console.log('=== CREATE BOOKING REQUEST ===');
        console.log('Time received:', JSON.stringify(time, null, 2));
        console.log('Time start type:', typeof time?.start, 'Value:', time?.start);
        console.log('Time end type:', typeof time?.end, 'Value:', time?.end);

        let query
        if (time) {
            // Helper function to convert time to minutes for comparison
            // Handles simple time strings ("07:00 PM") and GMT date strings ("Sun, 23 Nov 2025 19:00:00 GMT")
            const timeToMinutes = (timeValue) => {
                if (!timeValue) return null;
                
                // If it's a string
                if (typeof timeValue === 'string') {
                    // Check if it's a GMT date string - extract time from it
                    if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
                        const parsed = dayjs.utc(timeValue);
                        if (parsed.isValid()) {
                            const hours = parsed.hour();
                            const minutes = parsed.minute();
                            return hours * 60 + minutes;
                        }
                        console.error(`[VALIDATION] Failed to parse GMT date string: "${timeValue}"`);
                        return null;
                    }
                    
                    // If it's a simple time string (e.g., "07:00 PM"), parse it
                    const normalizedTime = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                    
                    // Try parsing with different formats
                    let parsed = dayjs(normalizedTime, "h:mm A", true);
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "hh:mm A", true);
                    }
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "h:mmA", true);
                    }
                    if (!parsed.isValid()) {
                        parsed = dayjs(normalizedTime, "hh:mmA", true);
                    }
                    
                    if (parsed.isValid()) {
                        const hours = parsed.hour();
                        const minutes = parsed.minute();
                        const totalMinutes = hours * 60 + minutes;
                        return totalMinutes;
                    }
                    
                    console.error(`[VALIDATION] Failed to parse time string: "${timeValue}"`);
                    return null;
                }
                
                // If it's a Date object, extract time directly
                if (timeValue instanceof Date) {
                    const parsed = dayjs.utc(timeValue);
                    return parsed.hour() * 60 + parsed.minute();
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
            
            // Check if this is an overnight booking (end time is before start time, meaning it spans midnight)
            const isOvernightBooking = newEndMinutes <= newStartMinutes;
            const MINUTES_PER_DAY = 1440; // 24 hours * 60 minutes
            
            // Normalize end time for overnight bookings by adding 24 hours (1440 minutes)
            // This allows us to compare overnight bookings properly
            const normalizedNewEndMinutes = isOvernightBooking ? newEndMinutes + MINUTES_PER_DAY : newEndMinutes;
            
            // Validate: For overnight bookings, the normalized end should be after start
            // For regular bookings, end should be after start
            if (!isOvernightBooking && newEndMinutes <= newStartMinutes) {
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
                
                // Check if existing booking is overnight
                const isExistingOvernight = existingEndMinutes <= existingStartMinutes;
                const normalizedExistingEndMinutes = isExistingOvernight ? existingEndMinutes + MINUTES_PER_DAY : existingEndMinutes;
                
                // Check for overlap using normalized times
                // For overnight bookings, we've normalized the end time by adding 1440 minutes
                // This allows proper comparison between:
                // - Regular bookings (e.g., 9:00 AM to 5:00 PM)
                // - Overnight bookings (e.g., 11:00 PM to 12:00 AM becomes 1380 to 1440)
                // - Overnight bookings that start at midnight (e.g., 12:00 AM to 3:00 AM becomes 0 to 1620)
                // Note: Bookings that end exactly when another starts (e.g., 11 PM-12 AM and 12 AM-3 AM) don't overlap
                const isExactMatch = (newStartMinutes === existingStartMinutes && newEndMinutes === existingEndMinutes);
                
                // Special case: if one booking ends at midnight (1440) and another starts at midnight (0), they don't overlap
                // because they're consecutive bookings (one ends exactly when the other starts)
                const newEndsAtMidnight = normalizedNewEndMinutes === MINUTES_PER_DAY;
                const existingEndsAtMidnight = normalizedExistingEndMinutes === MINUTES_PER_DAY;
                const newStartsAtMidnight = newStartMinutes === 0;
                const existingStartsAtMidnight = existingStartMinutes === 0;
                
                // If one ends at midnight and the other starts at midnight, they're consecutive (no overlap)
                const areConsecutive = (newEndsAtMidnight && existingStartsAtMidnight) || (existingEndsAtMidnight && newStartsAtMidnight);
                
                // Use strict < and > to exclude cases where one booking ends exactly when another starts
                const hasOverlap = !areConsecutive && (newStartMinutes < normalizedExistingEndMinutes && normalizedNewEndMinutes > existingStartMinutes) || isExactMatch;
                
                if (hasOverlap) {
                    console.log(`Conflict detected: New booking [${time.start} (${newStartMinutes})-${time.end} (${newEndMinutes}, normalized: ${normalizedNewEndMinutes})] overlaps with existing [${booking.time.start} (${existingStartMinutes})-${booking.time.end} (${existingEndMinutes}, normalized: ${normalizedExistingEndMinutes})]`);
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
            paymentMethod: paymentMethod || "not_specified",
            advancePaymentMethod: advancePaymentMethod || "not_specified",
        };

        if (time && time.start && time.end) {
            // Convert times to simple time strings (e.g., "07:00 PM") - NO GMT date strings stored
            const normalizeTime = (timeValue) => {
                if (!timeValue) return null;
                
                console.log(`Normalizing time - Type: ${typeof timeValue}, Value: ${timeValue}`);
                
                // If it's already a string
                if (typeof timeValue === 'string') {
                    // Check if it's a GMT/UTC date string (e.g., "Sun, 23 Nov 2025 19:00:00 GMT")
                    if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
                        // Extract time from GMT date string and convert to simple time format
                        const parsed = dayjs.utc(timeValue);
                        if (parsed.isValid()) {
                            const hours = parsed.hour();
                            const minutes = parsed.minute();
                            const ampm = hours >= 12 ? 'PM' : 'AM';
                            const displayHours = hours % 12 || 12;
                            const result = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                            console.log(`Converted GMT string "${timeValue}" to time string "${result}"`);
                            return result;
                        }
                        console.error(`Failed to parse GMT date string: ${timeValue}`);
                        return null;
                    }
                    // If it's already a simple time string (e.g., "07:00 PM"), normalize it
                    if (timeValue.match(/^\d{1,2}:\d{2}\s*(AM|PM)$/i)) {
                        // Normalize: ensure uppercase and proper spacing
                        const normalized = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                        console.log(`Normalized time string: "${timeValue}" -> "${normalized}"`);
                        return normalized;
                    }
                    console.error(`Invalid time string format: ${timeValue}`);
                    return null;
                }
                
                // If it's a Date object or dayjs object, extract time only
                if (timeValue instanceof Date || dayjs.isDayjs(timeValue)) {
                    const timeObj = dayjs.isDayjs(timeValue) ? timeValue : dayjs(timeValue);
                    const hours = timeObj.hour();
                    const minutes = timeObj.minute();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const displayHours = hours % 12 || 12;
                    const result = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                    console.log(`Converted Date/dayjs object to time string: "${result}"`);
                    return result;
                }
                
                console.error(`Invalid time value type: ${typeof timeValue}, value: ${timeValue}`);
                return null;
            };
            
            const normalizedStart = normalizeTime(time.start);
            const normalizedEnd = normalizeTime(time.end);
            
            if (!normalizedStart || !normalizedEnd) {
                console.error(`Invalid time values - Start: ${time.start} (${typeof time.start}), End: ${time.end} (${typeof time.end})`);
                return res.status(400).json({ message: "Invalid time format. Please use format like '07:00 PM'.", success: false });
            }
            
            bookingData.time = {
                start: normalizedStart,  // Simple time string (e.g., "07:00 PM")
                end: normalizedEnd       // Simple time string (e.g., "09:00 PM")
            };
            
            console.log(`✓ Storing times as simple strings - Start: "${bookingData.time.start}", End: "${bookingData.time.end}"`);
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
            paymentMethod,
            advancePaymentMethod,
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
                // Handles simple time strings ("07:00 PM") and GMT date strings ("Sun, 23 Nov 2025 19:00:00 GMT")
                const timeToMinutes = (timeValue) => {
                    if (!timeValue) return null;
                    
                    // If it's a string
                    if (typeof timeValue === 'string') {
                        // Check if it's a GMT date string - extract time from it
                        if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
                            const parsed = dayjs.utc(timeValue);
                            if (parsed.isValid()) {
                                const hours = parsed.hour();
                                const minutes = parsed.minute();
                                return hours * 60 + minutes;
                            }
                            console.error(`[UPDATE VALIDATION] Failed to parse GMT date string: "${timeValue}"`);
                            return null;
                        }
                        
                        // If it's a simple time string (e.g., "07:00 PM"), parse it
                        const normalizedTime = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                        
                        // Try parsing with different formats
                        let parsed = dayjs(normalizedTime, "h:mm A", true);
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "hh:mm A", true);
                        }
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "h:mmA", true);
                        }
                        if (!parsed.isValid()) {
                            parsed = dayjs(normalizedTime, "hh:mmA", true);
                        }
                        
                        if (parsed.isValid()) {
                            const hours = parsed.hour();
                            const minutes = parsed.minute();
                            const totalMinutes = hours * 60 + minutes;
                            return totalMinutes;
                        }
                        
                        console.error(`[UPDATE VALIDATION] Failed to parse time string: "${timeValue}"`);
                        return null;
                    }
                    
                    // If it's a Date object, extract time directly
                    if (timeValue instanceof Date) {
                        const parsed = dayjs.utc(timeValue);
                        return parsed.hour() * 60 + parsed.minute();
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
                
                // Check if this is an overnight booking (end time is before start time, meaning it spans midnight)
                const isOvernightBooking = newEndMinutes <= newStartMinutes;
                const MINUTES_PER_DAY = 1440; // 24 hours * 60 minutes
                
                // Normalize end time for overnight bookings by adding 24 hours (1440 minutes)
                const normalizedNewEndMinutes = isOvernightBooking ? newEndMinutes + MINUTES_PER_DAY : newEndMinutes;
                
                // Validate: For overnight bookings, the normalized end should be after start
                // For regular bookings, end should be after start
                if (!isOvernightBooking && newEndMinutes <= newStartMinutes) {
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
                    
                    // Check if existing booking is overnight
                    const isExistingOvernight = existingEndMinutes <= existingStartMinutes;
                    const normalizedExistingEndMinutes = isExistingOvernight ? existingEndMinutes + MINUTES_PER_DAY : existingEndMinutes;
                    
                    // Check for overlap using normalized times
                    // Special case: if one booking ends at midnight (1440) and another starts at midnight (0), they don't overlap
                    const newEndsAtMidnight = normalizedNewEndMinutes === MINUTES_PER_DAY;
                    const existingEndsAtMidnight = normalizedExistingEndMinutes === MINUTES_PER_DAY;
                    const newStartsAtMidnight = newStartMinutes === 0;
                    const existingStartsAtMidnight = existingStartMinutes === 0;
                    
                    // If one ends at midnight and the other starts at midnight, they're consecutive (no overlap)
                    const areConsecutive = (newEndsAtMidnight && existingStartsAtMidnight) || (existingEndsAtMidnight && newStartsAtMidnight);
                    
                    const isExactMatch = (newStartMinutes === existingStartMinutes && newEndMinutes === existingEndMinutes);
                    const hasOverlap = !areConsecutive && (newStartMinutes < normalizedExistingEndMinutes && normalizedNewEndMinutes > existingStartMinutes) || isExactMatch;
                    
                    if (hasOverlap) {
                        console.log(`Update: Conflict detected: New booking [${time.start} (${newStartMinutes})-${time.end} (${newEndMinutes}, normalized: ${normalizedNewEndMinutes})] overlaps with existing [${existingBooking.time.start} (${existingStartMinutes})-${existingBooking.time.end} (${existingEndMinutes}, normalized: ${normalizedExistingEndMinutes})]`);
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
        if (paymentMethod !== undefined) booking.paymentMethod = paymentMethod || "not_specified";
        if (advancePaymentMethod !== undefined) booking.advancePaymentMethod = advancePaymentMethod || "not_specified";

        if (checkForConflict) {
            if (time) {
                // Convert times to simple time strings (e.g., "07:00 PM") - NO GMT date strings stored
                const normalizeTime = (timeValue) => {
                    if (!timeValue) return null;
                    
                    console.log(`[UPDATE] Normalizing time - Type: ${typeof timeValue}, Value: ${timeValue}`);
                    
                    // If it's already a string
                    if (typeof timeValue === 'string') {
                        // Check if it's a GMT/UTC date string (e.g., "Sun, 23 Nov 2025 19:00:00 GMT")
                        if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
                            // Extract time from GMT date string and convert to simple time format
                            const parsed = dayjs.utc(timeValue);
                            if (parsed.isValid()) {
                                const hours = parsed.hour();
                                const minutes = parsed.minute();
                                const ampm = hours >= 12 ? 'PM' : 'AM';
                                const displayHours = hours % 12 || 12;
                                const result = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                                console.log(`[UPDATE] Converted GMT string "${timeValue}" to time string "${result}"`);
                                return result;
                            }
                            console.error(`[UPDATE] Failed to parse GMT date string: ${timeValue}`);
                            return null;
                        }
                        // If it's already a simple time string (e.g., "07:00 PM"), normalize it
                        if (timeValue.match(/^\d{1,2}:\d{2}\s*(AM|PM)$/i)) {
                            // Normalize: ensure uppercase and proper spacing
                            const normalized = timeValue.trim().toUpperCase().replace(/\s+/g, ' ');
                            console.log(`[UPDATE] Normalized time string: "${timeValue}" -> "${normalized}"`);
                            return normalized;
                        }
                        console.error(`[UPDATE] Invalid time string format: ${timeValue}`);
                        return null;
                    }
                    
                    // If it's a Date object or dayjs object, extract time only
                    if (timeValue instanceof Date || dayjs.isDayjs(timeValue)) {
                        const timeObj = dayjs.isDayjs(timeValue) ? timeValue : dayjs(timeValue);
                        const hours = timeObj.hour();
                        const minutes = timeObj.minute();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const displayHours = hours % 12 || 12;
                        const result = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                        console.log(`[UPDATE] Converted Date/dayjs object to time string: "${result}"`);
                        return result;
                    }
                    
                    console.error(`[UPDATE] Invalid time value type: ${typeof timeValue}, value: ${timeValue}`);
                    return null;
                };
                
                const normalizedStart = normalizeTime(time.start);
                const normalizedEnd = normalizeTime(time.end);
                
                if (!normalizedStart || !normalizedEnd) {
                    console.error(`[UPDATE] Invalid time values - Start: ${time.start} (${typeof time.start}), End: ${time.end} (${typeof time.end})`);
                    return res.status(400).json({ message: "Invalid time format. Please use format like '07:00 PM'.", success: false });
                }
                
                booking.time = {
                    start: normalizedStart,  // Simple time string (e.g., "07:00 PM")
                    end: normalizedEnd       // Simple time string (e.g., "09:00 PM")
                };
                
                console.log(`[UPDATE] ✓ Storing times as simple strings - Start: "${booking.time.start}", End: "${booking.time.end}"`);
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

        const bookings = await Bookings.find({ userId: userId }).sort({ createdAt: -1, date: -1 })

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
