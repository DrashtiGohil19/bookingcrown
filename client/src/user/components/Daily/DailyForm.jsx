import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUserData } from '../../../api/User';
import moment from 'moment';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const { RangePicker } = TimePicker;
const { Item } = Form;

function DailyForm({ isEditing, userId }) {
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            getBookingsData()
        }
    }, [userId])

    const handleAmountChange = () => {
        const { totalAmount, advanceAmount } = form.getFieldsValue();
        if (totalAmount !== undefined || advanceAmount !== undefined) {
            if (totalAmount !== undefined) {
                const pendingAmount = advanceAmount !== undefined
                    ? totalAmount - advanceAmount
                    : totalAmount;
                form.setFieldsValue({ pendingAmount: pendingAmount });
            }
        }
    };
    const fetchUserData = async () => {
        const data = await getUserData()
        setUserData(data)
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    const validateFutureDate = (_, value) => {
        if (!value || value.isAfter(moment())) {
            return Promise.resolve();
        }
        return Promise.reject('The booking date must be in the future!');
    };

    const getBookingsData = async () => {
        try {
            const data = await getBookingById(userId)
            const bookingDate = dayjs(data.date);
            if (data) {
                form.setFieldsValue({
                    customerName: data.customerName,
                    mobileNumber: data.mobilenu,
                    date: bookingDate,
                    item: data.item,
                    totalHours: data.totalHours,
                    totalAmount: data.amount,
                    advanceAmount: data.advance,
                    pendingAmount: data.pending,
                    session: data.session,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        const formData = {
            customerName: values.customerName,
            mobilenu: values.mobileNumber,
            item: values.item,
            date: values.date,
            session: values.session,
            amount: values.totalAmount,
            advance: values.advanceAmount || 0,
            pending: values.pendingAmount
        }
        if (isEditing) {
            await UpdateBooking(formData, userId)
        } else {
            await CreateBooking(formData)
        }
        await dispatch(fetchAllBookings())
        navigate("/user/booking-list")
    }
    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleAmountChange}
            >
                <Row gutter={16}>
                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="customerName"
                            label="Customer name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input
                                placeholder="Name"
                                className="h-10 border-gray-300"
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="mobileNumber"
                            label="Mobile Number"
                            rules={[
                                { required: true, message: 'Please input your mobile number!' },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: 'Mobile number must be exactly 10 digits!'
                                }
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder="Mobile Number"
                                className="h-10 w-full"
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="item"
                            label="Select Farm/Table"
                            rules={[{ required: true, message: 'Please select a table!' }]}
                        >
                            <Select
                                placeholder="Select Farm/Table"
                                className='h-10'
                                options={
                                    userData.itemList?.map((item) => ({
                                        value: item,
                                        label: item,
                                    })) || []
                                }
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="date"
                            label="Booking Date"
                            rules={[{ required: true, message: 'Please select a date!' }, { validator: validateFutureDate }]}
                        >
                            <DatePicker
                                className="h-10 w-full"
                                format="DD-MM-YYYY"
                                value={(date) => date ? date.formate('DD-MM-YYYY') : null}
                                disabledDate={currentDate => currentDate && currentDate.isBefore(dayjs().startOf('day'))}
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="session"
                            label="Select Session"
                            rules={[{ required: true, message: 'Please select a session!' }]}
                        >
                            <Select
                                placeholder="Select Session"
                                className='h-10'
                                options={[
                                    { value: 'Morning Session', label: 'Morning Session' },
                                    { value: 'Afternoon Session', label: 'Afternoon Session' },
                                    { value: 'Evening Session', label: 'Evening Session' },
                                ]}
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="totalAmount"
                            label="Total Amount"
                            rules={[{ required: true, message: 'Please input total amount!' }]}
                        >
                            <Input
                                type='number'
                                placeholder='Amount'
                                className="h-10"
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="advanceAmount"
                            label="Advance Amount"
                        // rules={[
                        //     { required: true, message: 'Please input advance amount!' },
                        // ]}
                        >
                            <Input
                                type='number'
                                placeholder='Advance Amount'
                                className="h-10"
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="pendingAmount"
                            label="Pending Amount"
                        >
                            <Input
                                type='number'
                                readOnly
                                placeholder='Pending Amount'
                                initialValues="0"
                                className="h-10"
                            />
                        </Item>
                    </Col>

                </Row>
                <Button
                    type="submit"
                    htmlType="submit"
                    className='h-10 px-6 bg-themeColor border-themeColor hover:!bg-[#0dcaba] hover:!text-white hover:!border-[#0dcaba] inline-flex items-center justify-center font-medium rounded-md text-white mt-5'
                >
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default DailyForm
