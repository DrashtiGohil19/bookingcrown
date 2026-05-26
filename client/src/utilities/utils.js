const paymentMethodLabels = {
  cash: 'Cash',
  online_transfer: 'Online Transfer',
  not_specified: 'Not Specified',
};


export const handleCopy = (mobilenu, bookingId, booking = {}) => {
  const bookingLink = `${process.env.REACT_APP_BASE_URL}/customer/booking-details/${bookingId}`;
  const dateStr = booking.date
    ? new Date(booking.date).toLocaleDateString('en-GB')
    : '';

  const startTime = booking.startTime || booking.time?.start || '';
  const endTime = booking.endTime || booking.time?.end || '';
  const timeStr = startTime && endTime ? `${startTime} To ${endTime}` : null;

  const sessionStr = booking.session || null;

  const advMethod = paymentMethodLabels[booking.advancePaymentMethod] || paymentMethodLabels.not_specified;
  const remMethod = paymentMethodLabels[booking.paymentMethod] || paymentMethodLabels.not_specified;

  const messageLines = [
    '🏏 *Booking Confirmation*',
    '',
    `👤 Customer: ${booking.customerName || 'N/A'}`,
    `📱 Mobile: ${booking.mobilenu || 'N/A'}`,
    `📅 Date: ${dateStr}`,
    timeStr ? `⏰ Time: ${timeStr}` : null,
    sessionStr ? `📋 Session: ${sessionStr}` : null,
    booking.item ? `📍 ${booking.item}` : null,
    booking.totalHours ? `⏱ Hours: ${booking.totalHours}` : null,
    '',
    `💳 *Payment Details*`,
    `💰 Total: ₹${booking.amount || 0}`,
    `💵 Advance: ₹${booking.advance || 0} (${advMethod})`,
    `📊 Pending: ₹${booking.pending || 0} (${remMethod})`,
    `📌 Status: ${(booking.payment || '').toUpperCase()}`,
    '',
    `🔗 View Full Booking:`,
    `${bookingLink}`,
    '',
    '🙏 Thank you for choosing us!',
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = `https://wa.me/91${mobilenu}?text=${encodeURIComponent(messageLines)}`;
  window.open(whatsappUrl, '_blank');
};
