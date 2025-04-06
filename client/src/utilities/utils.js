const {  Notification } = require("./Notification");

export const handleCopy = (mobilenu, bookingId) => {
  const bookingLink = `${process.env.REACT_APP_BASE_URL}/customer/booking-details/${bookingId}`;

  window.open(`https://wa.me/91${mobilenu}?text=${encodeURIComponent(bookingLink)}`, '_blank');
};
