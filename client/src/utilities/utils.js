const paymentMethodLabels = {
  cash: 'Cash',
  online_transfer: 'Online Transfer',
  not_specified: 'Not Specified',
};

export const handleCopy = (mobilenu, bookingId, booking = {}) => {
  const bookingLink = `${process.env.REACT_APP_BASE_URL}/customer/booking-details/${bookingId}`;
  const messageLines = [
    'Your booking details are ready.',
    booking.customerName ? `Customer: ${booking.customerName}` : null,
    booking.payment ? `Payment Status: ${booking.payment}` : null,
    booking.paymentMethod ? `Payment Method: ${paymentMethodLabels[booking.paymentMethod] || paymentMethodLabels.not_specified}` : null,
    `Booking Link: ${bookingLink}`,
  ].filter(Boolean);

  window.open(`https://wa.me/91${mobilenu}?text=${encodeURIComponent(messageLines.join('\n'))}`, '_blank');
};
