import { Card, Col, Row, Skeleton, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Disclosure } from '@headlessui/react';
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

function CustomerDetail() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchBooking = useCallback(async () => {
    try {
      const response = await getBookingById(params.id);
      setBooking(response);
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchBooking();
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

  return (
    <div>
      <Seo
        title="Booking Confirmation"
        description="Customer booking confirmation for BookingCrown."
        path={`/customer/booking-details/${params.id}`}
        robots="noindex,nofollow"
      />

      <Skeleton loading={loading} active>
        {!loading && booking ? (
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              <div className="top-0 left-0 right-0 bg-white shadow z-50">
                <Disclosure as="nav" className="bg-white shadow-xl">
                  <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <img
                          src={require('../../../assets/Logo.png')}
                          alt="BookingCrown logo"
                          className="h-8 w-8"
                        />
                        <h3 className="text-themeColor text-xs sm:text-sm md:text-lg font-semibold">
                          BookingCrown
                        </h3>
                      </div>

                      <h1 className="text-themeColor text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                        {booking?.ownerData?.businessName}
                      </h1>
                    </div>
                  </div>
                </Disclosure>
              </div>

              <div className="mx-auto px-4 py-4 sm:px-6 md:px-12 lg:px-20 lg:py-10">
                <div className="flex flex-col items-center justify-start gap-6 md:flex-row">
                  <div className="w-full rounded-lg bg-themeColor p-6 text-white shadow-xl sm:w-[450px]">
                    <div className="flex flex-col items-center">
                      <div className="flex-1 text-center">
                        <FaCheckCircle className="m-auto mb-3 text-[30px] text-white md:text-[40px]" />
                        <p className="text-[14px] md:text-[16px]">
                          Congratulations, your booking has been confirmed successfully.
                        </p>
                      </div>
                      <div className="mt-4 flex-1 rounded-lg bg-teal-600 p-3">
                        <h4 className="text-center text-[14px] md:text-[16px]">
                          Booked for {dayjs(booking?.date).tz('Asia/Kolkata').format('D MMMM, YYYY')}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <h2 className="text-[20px] font-semibold md:text-[26px]">
                      Dear {booking?.customerName},
                    </h2>
                    <p className="mt-2 text-[14px] md:text-[16px]">
                      Your booking for {itemName} {booking.item} is confirmed with {booking.ownerData.businessName}.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Card title="Booking Details">
                    <Row gutter={[12, 12]}>
                      {booking.time && Object.values(booking.time).length !== 0 ? (
                        <>
                          <Col xs={24} sm={12} md={8} lg={8}>
                            <div className="mb-1 flex gap-4 md:mb-3">
                              <Text className="font-semibold">Booking Time:</Text>
                              <Text>{booking.time?.start} To {booking.time?.end}</Text>
                            </div>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={8}>
                            <div className="mb-1 flex gap-4 md:mb-3">
                              <Text className="font-semibold">Total Hours:</Text>
                              <Text>{booking.totalHours}</Text>
                            </div>
                          </Col>
                        </>
                      ) : null}

                      {booking.session ? (
                        <Col xs={24} sm={12} md={8} lg={8}>
                          <div className="mb-1 flex gap-4 md:mb-3">
                            <Text className="font-semibold">Booking For:</Text>
                            <Text>{booking.session}</Text>
                          </div>
                        </Col>
                      ) : null}

                      <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="mb-1 flex gap-4 md:mb-5">
                          <Text className="font-semibold">{itemName}:</Text>
                          <Text>{booking.item}</Text>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="mb-1 flex gap-4 md:mb-3">
                          <Text className="font-semibold">Amount:</Text>
                          <Text>{`Rs. ${booking.amount}`}</Text>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="mb-1 flex gap-4 md:mb-3">
                          <Text className="font-semibold">Advance Amount:</Text>
                          <Text>{`Rs. ${booking.advance}`}</Text>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="mb-1 flex gap-4 md:mb-3">
                          <Text className="font-semibold">Pending Amount:</Text>
                          <Text>{`Rs. ${booking.pending}`}</Text>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <div className="mb-1 flex gap-4 md:mb-3">
                          <Text className="font-semibold">Payment Method:</Text>
                          <Text>{paymentMethodLabels[booking.paymentMethod] || paymentMethodLabels.not_specified}</Text>
                        </div>
                      </Col>
                    </Row>
                  </Card>

                  <p className="my-6 text-[14px]">
                    If you have questions about your booking, please contact the business owner directly on{' '}
                    <b>+91 {booking?.ownerData?.mobilenu}</b>.
                  </p>

                  <p className="mt-4 text-[14px]">
                    Thank you for choosing our service. If you need additional help, please contact the BookingCrown team through the main website contact page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Skeleton>
      <Footer />
    </div>
  );
}

export default CustomerDetail;
