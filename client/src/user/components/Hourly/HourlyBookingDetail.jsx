import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Col, Row, Typography, Skeleton, Button, Modal } from 'antd';
import { DeleteBooking, getBookingById } from '../../../api/Bookings';
import Sidebar from '../Sidebar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notification from '../../../utilities/Notification';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useDispatch } from 'react-redux';

const { Text } = Typography;
const { confirm } = Modal

const HourlyBookingDetail = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const handleDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this booking?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const data = await DeleteBooking(id);
                if (data.success) {
                    dispatch(fetchAllBookings());
                    navigate("/user/booking-list")
                }
            }
        });
    };

    useEffect(() => {
        if (params.id) {
            fetchBooking();
        }
    }, [params.id]);

    return (
        <div className='h-[100vh]'>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div>
                        <Skeleton loading={loading} active>
                            <Card title={`Booking Details - ${booking?.customerName}`} bordered>
                                {!loading && booking && (
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Customer Name:</Text>
                                                <Text>{booking.customerName}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Mobile Number:</Text>
                                                <Text>{booking.mobilenu}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Booking Date:</Text>
                                                <Text>{new Date(booking.date).toLocaleDateString("en-GB")}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Booking Time:</Text>
                                                <Text>{booking.time?.start} To {booking.time?.end}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Total Hours:</Text>
                                                <Text>{booking.totalHours}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Table/Turf:</Text>
                                                <Text>{booking.item}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Amount:</Text>
                                                <Text>₹ {booking.amount}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Advance Amount:</Text>
                                                <Text>₹ {booking.advance}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Pending Amount:</Text>
                                                <Text>₹ {booking.pending}</Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8} lg={8}>
                                            <div className="flex gap-4 mb-1 md:mb-5">
                                                <Text className='font-semibold'>Payment Status:</Text>
                                                <Text>{booking.payment}</Text>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </Card>

                            <Card title="Copy this link and send to the customer" className='mt-3'>
                                <CopyToClipboard onCopy={() => Notification.success("Link copied to clipboard!")} text={`${process.env.REACT_APP_BASE_URL}/customer/booking-details/${booking?._id}`}>
                                    <Button type='primary' >Click here to copy link</Button>
                                </CopyToClipboard>
                            </Card>

                            <Card title="Delete This Booking Details" className='mt-3'>
                                <Button type='primary' danger onClick={() => handleDelete(params.id)}>Delete</Button>
                            </Card>
                        </Skeleton>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HourlyBookingDetail;
