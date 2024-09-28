import { Card, Col, Row, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../../../api/Bookings';
import { FaCheckCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import { Disclosure } from '@headlessui/react'
import Footer from '../../../common/Footer';

const { Text } = Typography;

function CustomerDetail() {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const fetchBooking = async () => {
        try {
            const response = await getBookingById(params.id);
            setBooking(response);
        } catch (error) {
            console.error('Failed to fetch booking details:', error);
        } finally {
            setLoading(false);
        }
    };

    const itemTypeMapping = {
        "Box Cricket": "Turf",
        "Cafe/Restaurant": "Booking Item",
        "Hotel management": "Booking Item",
        "Farm": "Farm",
    };

    const itemName = itemTypeMapping[booking?.ownerData?.businessType];

    useEffect(() => {
        if (params.id) {
            fetchBooking();
        }
    }, [params.id]);

    return (
        <div>
            <Skeleton loading={loading} active>
                {!loading && (
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-1">
                            <div className="top-0 left-0 right-0 bg-white shadow z-50">
                                <Disclosure as="nav" className="bg-white shadow-xl">
                                    <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                                        <div className="flex h-16 items-center justify-between">
                                            <div className="flex items-center space-x-1 sm:space-x-2">
                                                <img
                                                    src={require("../../../assets/Logo.png")}
                                                    alt="Logo"
                                                    className="h-8 w-8"
                                                />
                                                <h3 className="text-themeColor text-xs sm:text-sm md:text-lg font-semibold">
                                                    Booking Crown
                                                </h3>
                                            </div>

                                            <h1 className="text-themeColor text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                                                {booking?.ownerData?.businessName}
                                            </h1>
                                        </div>
                                    </div>
                                </Disclosure>
                            </div>
                            <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 lg:py-10">
                                <div className="flex flex-col md:flex-row justify-start items-center gap-6">
                                    <div className="bg-themeColor w-full sm:w-[450px] shadow-xl text-white p-6 rounded-lg">
                                        <div className="flex flex-col items-center">
                                            <div className="flex-1 text-center">
                                                <i>
                                                    <FaCheckCircle className="text-white text-[30px] md:text-[40px] m-auto mb-3" />
                                                </i>
                                                <p className="text-[14px] md:text-[16px]">Congratulations, Your booking is successfully done.</p>
                                            </div>
                                            <div className="flex-1 bg-teal-600 rounded-lg p-3 mt-4">
                                                <h4 className="text-center text-[14px] md:text-[16px]">
                                                    Booked for {dayjs(booking?.date).format('D MMMM, YYYY')}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <h1 className="font-semibold text-[20px] md:text-[26px]">Dear {booking?.customerName},</h1>
                                        <p className="mt-2 text-[14px] md:text-[16px]">
                                            Your booking for {itemName} {booking.item} is confirmed with {booking.ownerData.businessName}.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Card title="Booking Details">
                                        <Row gutter={[12, 12]}>
                                            {Object.values(booking.time).length !== 0 && (
                                                <>
                                                    <Col xs={24} sm={12} md={8} lg={8}>
                                                        <div className="flex gap-4 mb-1 md:mb-3">
                                                            <Text className="font-semibold">Booking Time:</Text>
                                                            <Text>{dayjs(booking.time?.start).format('h:mm A')} To {dayjs(booking.time?.end).format('h:mm A')}</Text>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={12} md={8} lg={8}>
                                                        <div className="flex gap-4 mb-1 md:mb-3">
                                                            <Text className="font-semibold">Total Hours:</Text>
                                                            <Text>{booking.totalHours}</Text>
                                                        </div>
                                                    </Col>
                                                </>
                                            )}
                                            {booking.session && (
                                                <Col xs={24} sm={12} md={8} lg={8}>
                                                    <div className="flex gap-4 mb-1 md:mb-3">
                                                        <Text className="font-semibold">Booking For:</Text>
                                                        <Text>{booking.session}</Text>
                                                    </div>
                                                </Col>
                                            )}
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-5">
                                                    <Text className="font-semibold">{itemName}:</Text>
                                                    <Text>{booking.item}</Text>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-3">
                                                    <Text className="font-semibold">Amount:</Text>
                                                    <Text>₹ {booking.amount}</Text>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-3">
                                                    <Text className="font-semibold">Advance Amount:</Text>
                                                    <Text>₹ {booking.advance}</Text>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8}>
                                                <div className="flex gap-4 mb-1 md:mb-3">
                                                    <Text className="font-semibold">Pending Amount:</Text>
                                                    <Text>₹ {booking.pending}</Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>

                                    <div>
                                        <p className="my-6 text-[14px]">
                                            If you have any questions or concerns about your booking, please do not hesitate to contact the owner directly on <b>+91 {booking?.ownerData?.mobilenu}</b>.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mt-4 text-[14px]">
                                            Thank you for choosing our service. If you have any questions or need further assistance, please do not hesitate to contact us.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Skeleton>
            <Footer />
        </div>

    )
}

export default CustomerDetail
