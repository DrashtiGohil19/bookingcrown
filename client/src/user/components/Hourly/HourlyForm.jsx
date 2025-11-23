import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import "../../../App.css"

dayjs.extend(utc);
dayjs.extend(timezone);

const { Item } = Form;

function HourlyForm({ isEditing, userId }) {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.user);
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
                // Load times - handle GMT date strings and simple time strings (extract time directly, no conversion)
                const parseTimeForForm = (timeValue) => {
                    if (!timeValue) return null;
                    
                    if (typeof timeValue === 'string') {
                        // Check if it's a GMT date string (e.g., "Sun, 23 Nov 2025 06:00:00 GMT")
                        if (timeValue.includes('GMT') || timeValue.includes('UTC') || timeValue.match(/[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/)) {
                            // Parse GMT date string and extract time directly (no conversion)
                            const parsed = dayjs.utc(timeValue);
                            if (parsed.isValid()) {
                                const hours = parsed.hour();
                                const minutes = parsed.minute();
                                const ampm = hours >= 12 ? 'PM' : 'AM';
                                const displayHours = hours % 12 || 12;
                                const timeStr = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                                return dayjs(timeStr, 'hh:mm A');
                            }
                        }
                        // If it's already a simple time string (e.g., "06:00 AM"), parse it directly
                        if (timeValue.match(/^\d{1,2}:\d{2}\s*(AM|PM)$/i)) {
                            return dayjs(timeValue, 'hh:mm A');
                        }
                        return null;
                    }
                    
                    // If it's a Date object, extract time directly (no conversion)
                    if (timeValue instanceof Date || dayjs.isDayjs(timeValue)) {
                        const parsed = dayjs.isDayjs(timeValue) ? timeValue : dayjs(timeValue);
                        const hours = parsed.hour();
                        const minutes = parsed.minute();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const displayHours = hours % 12 || 12;
                        const timeStr = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
                        return dayjs(timeStr, 'hh:mm A');
                    }
                    
                    return null;
                };
                
                const startTime = parseTimeForForm(data.time?.start);
                const endTime = parseTimeForForm(data.time?.end);
                form.setFieldsValue({
                    customerName: data.customerName,
                    mobileNumber: data.mobilenu,
                    date: bookingDate,
                    item: data.item,
                    startTime,
                    endTime,
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
        // Ensure times are formatted as strings (not dayjs objects)
        const formatTime = (timeValue) => {
            if (!timeValue) return '';
            // If it's already a string, return it
            if (typeof timeValue === 'string') return timeValue;
            // If it's a dayjs object, format it
            if (dayjs.isDayjs(timeValue)) return timeValue.format('hh:mm A');
            // If it's a Date object, convert and format
            if (timeValue instanceof Date) return dayjs(timeValue).format('hh:mm A');
            // Otherwise convert to string
            return String(timeValue);
        };
        
        const formData = {
            customerName: values.customerName,
            mobilenu: values.mobileNumber,
            item: values.item,
            date: dayjs(values.date).format('YYYY-MM-DD'),
            time: {
                start: formatTime(values.startTime),
                end: formatTime(values.endTime),
            },
            totalHours: values.totalHours,
            amount: values.totalAmount,
            advance: values.advanceAmount || 0,
            pending: values.pendingAmount
        }
        
        // Debug log to verify what's being sent
        console.log('Form data being sent:', JSON.stringify(formData, null, 2));

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
                            label="Select Turf"
                            rules={[{ required: true, message: 'Please select a Turf!' }]}
                        >
                            <Select
                                placeholder="Select Turf"
                                className='h-10'
                                showSearch={false}
                                options={
                                    user.data.itemList?.map((item) => ({
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
                            // disabledDate={currentDate => currentDate && currentDate.isBefore(moment().startOf('day'))}
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
                                onChange={handleRangeChange}
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
