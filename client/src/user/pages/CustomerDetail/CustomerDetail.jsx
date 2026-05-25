import { Card, Col, Row, Skeleton, Tag, Typography, Result, Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FaCheckCircle } from 'react-icons/fa';
import { getBookingById } from '../../../api/Bookings';
import Footer from '../../../common/Footer';
import Seo from '../../../common/Seo';

dayjs.extend(timezone);
dayjs.extend(utc);

const { Text } = Typography;
const paymentMethodLabels = {
  cash: 'Cash',
  online_transfer: 'Online Transfer',
  not_specified: 'Not Specified',
};

const paymentColorMap = {
  paid: '#38b000',
  partial: '#ffbe0b',
  pending: '#f94144',
};

function CustomerDetail() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchBooking = useCallback(async () => {
    try {
      const response = await getBookingById(params.id);
      if (!response || !response._id) {
        setError(true);
      } else {
        setBooking(response);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchBooking();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [fetchBooking, params.id]);

  const itemTypeMapping = {
    'Box Cricket': 'Turf',
    'Cafe/Restaurant': 'Booking Item',
    'Cafe/Restuarant': 'Booking Item',
    'Hotel management': 'Booking Item',
    Farm: 'Farm',
  };

  const itemName = itemTypeMapping[booking?.ownerData?.businessType] || 'Booking Item';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Result
          status="404"
          title="Booking Not Found"
          subTitle="The booking you're looking for doesn't exist or has been removed."
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Go Home
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Booking Confirmation"
        description="Customer booking confirmation for BookingCrown."
        path={`/customer/booking-details/${params.id}`}
        robots="noindex,nofollow"
      />

      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={require('../../../assets/Logo.png')}
                alt="BookingCrown logo"
                className="h-8 w-8"
              />
              <span className="text-themeColor text-sm sm:text-lg font-semibold">
                BookingCrown
              </span>
            </div>
            <span className="text-themeColor text-sm sm:text-base font-semibold truncate ml-2">
              {booking?.ownerData?.businessName}
            </span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
          <div className="w-full rounded-xl bg-gradient-to-br from-themeColor to-themeDark p-6 text-white shadow-lg sm:p-8 md:w-[420px]">
            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="mb-4 text-4xl text-white/90" />
              <p className="text-base sm:text-lg font-semibold">
                Booking Confirmed Successfully
              </p>
              <div className="mt-5 w-full rounded-lg bg-white/20 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm sm:text-base font-medium">
                  Booked for {dayjs(booking.date).tz('Asia/Kolkata').format('D MMMM, YYYY')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Dear {booking.customerName},
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Your booking for <strong>{itemName} {booking.item}</strong> is confirmed with{' '}
              <strong>{booking.ownerData?.businessName}</strong>.
            </p>
          </div>
        </div>

        <Card
          title={<span className="text-base font-semibold">Booking Details</span>}
          className="mt-6 border-gray-100 shadow-sm"
        >
          <Row gutter={[16, 8]}>
            {booking.time && Object.values(booking.time).length !== 0 ? (
              <>
                <Col xs={24} sm={12} lg={8}>
                  <DetailRow label="Booking Time" value={`${booking.time.start} To ${booking.time.end}`} />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <DetailRow label="Total Hours" value={booking.totalHours} />
                </Col>
              </>
            ) : null}

            {booking.session ? (
              <Col xs={24} sm={12} lg={8}>
                <DetailRow label="Booking For" value={booking.session} />
              </Col>
            ) : null}

            <Col xs={24} sm={12} lg={8}>
              <DetailRow label={itemName} value={booking.item} />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DetailRow label="Amount" value={`₹ ${booking.amount}`} />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DetailRow label="Advance Amount" value={`₹ ${booking.advance}`} />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DetailRow label="Pending Amount" value={`₹ ${booking.pending}`} />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DetailRow
                label="Payment Status"
                value={
                  <Tag color={paymentColorMap[booking.payment] || '#6b7280'} className="m-0">
                    {booking.payment}
                  </Tag>
                }
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DetailRow
                label="Payment Method"
                value={paymentMethodLabels[booking.paymentMethod] || paymentMethodLabels.not_specified}
              />
            </Col>
          </Row>
        </Card>

        <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-white p-5 text-sm text-gray-600 shadow-sm sm:p-6">
          <p>
            If you have questions about your booking, please contact{' '}
            <strong>{booking.ownerData?.businessName}</strong> directly on{' '}
            <a href={`tel:+91${booking.ownerData?.mobilenu}`} className="font-semibold text-themeColor hover:text-themeDark">
              +91 {booking.ownerData?.mobilenu}
            </a>.
          </p>
          <p>
            Thank you for choosing BookingCrown. If you need additional help, please reach out through the main website contact page.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Text className="min-w-fit text-sm font-semibold text-gray-700">{label}:</Text>
      <Text className="text-sm text-gray-600">{value}</Text>
    </div>
  );
}

export default CustomerDetail;