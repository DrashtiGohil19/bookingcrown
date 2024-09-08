import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUserData } from '../../../api/User';
import moment from 'moment';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import "../../../App.css"

const { Item } = Form;

function HourlyForm({ isEditing, userId }) {
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRangeChange = (endTime) => {
        if (endTime) {
            const startTime = form.getFieldValue('startTime');
            let duration;

            if (endTime.isBefore(startTime)) {
                duration = moment.duration(endTime.add(1, 'day').diff(startTime));
            } else {
                duration = moment.duration(endTime.diff(startTime));
            }

            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();

            const minutesAsDecimal = (minutes / 60) * 60;

            const total = hours + (minutesAsDecimal / 100);
            form.setFieldsValue({ totalHours: total.toFixed(2) });
        }
    };

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

    useEffect(() => {
        if (userId) {
            getBookingsData()
        }
    }, [userId])

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
                    startTime: dayjs(data.time.start, 'hh:mm A'),
                    endTime: dayjs(data.time.end, 'hh:mm A'),
                    totalHours: data.totalHours,
                    totalAmount: data.amount,
                    advanceAmount: data.advance,
                    pendingAmount: data.pending,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        let response = null
        const formData = {
            customerName: values.customerName,
            mobilenu: values.mobileNumber,
            item: values.item,
            date: dayjs(values.date).format('YYYY-MM-DD'),
            time: {
                start: values.startTime.format('hh:mm A'),
                end: values.endTime.format('hh:mm A'),
            },
            totalHours: values.totalHours,
            amount: values.totalAmount,
            advance: values.advanceAmount || 0,
            pending: values.pendingAmount
        }

        if (isEditing) {
            response = await UpdateBooking(formData, userId)
        } else {
            response = await CreateBooking(formData)
        }
        await dispatch(fetchAllBookings())
        if (response.success) navigate("/user/dashboard")
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
                                suffix={false}
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
                            label="Select Table/Turf"
                            rules={[{ required: true, message: 'Please select a table!' }]}
                        >
                            <Select
                                placeholder="Select Table/Turf"
                                className='h-10'
                                showSearch={false}
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
                            rules={[{ required: true, message: 'Please select a date!' }]}
                        >
                            <DatePicker
                                className="h-10 w-full"
                                format="DD-MM-YYYY"
                                inputReadOnly={true}
                                disabledDate={currentDate => currentDate && currentDate.isBefore(moment().startOf('day'))}
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="startTime"
                            label="Start Time"
                            rules={[{ required: true, message: 'Please select a time!' }]}
                        >
                            <TimePicker
                                format="hh:mm A"
                                className='h-10 w-full'
                                inputReadOnly={true}
                                needConfirm={false}
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="endTime"
                            label="End Time"
                            rules={[
                                { required: true, message: 'Please select a time!' },
                            ]}
                        >
                            <TimePicker
                                format="hh:mm A"
                                className='h-10 w-full'
                                onChange={handleRangeChange}
                                inputReadOnly={true}
                                needConfirm={false}
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="totalHours"
                            label="Total Hours"
                        >
                            <Input
                                type='number'
                                readOnly
                                initialValues="0"
                                placeholder='Total Hours'
                                className="h-10"
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
                    type="primary"
                    htmlType="submit"
                    className='h-10'
                >
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default HourlyForm
