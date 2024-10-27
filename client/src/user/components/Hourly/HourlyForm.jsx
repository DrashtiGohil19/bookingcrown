import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import "../../../App.css"
import PaymentForm from '../PaymentForm';

const { Item } = Form;

function HourlyForm({ isEditing, userId }) {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentType, setPaymentType] = useState('one-time');
    const [mode, setMode] = useState("create")
    const [initialValue, setInitialValue] = useState({})
    const [installmentGroups, setInstallmentGroups] = useState([{ id: Date.now() + Math.random(), amount: '', date: '' }])
    const [paymentAmount, setPaymentAmount] = useState({
        amount: '',
        pending: '',
        advance: ''
    });

    const addInstallmentGroup = () => {
        setInstallmentGroups([
            ...installmentGroups,
            { id: Date.now() + Math.random(), amount: '', date: '' }
        ]);
    };

    const removeInstallmentGroup = (id) => {
        const newGroups = installmentGroups.filter((group) => group.id !== id);
        setInstallmentGroups(newGroups);
    };

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
        const { total, advance } = form.getFieldsValue();
        if (total !== undefined || advance !== undefined) {
            if (total !== undefined) {
                const pending = advance !== undefined
                    ? total - advance
                    : total;
                form.setFieldsValue({ pending: pending });
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
            setInitialValue(data)
            setMode("update")
            if (data.paymentType === "one-time") {
                setPaymentAmount({
                    amount: data.amount,
                    pending: data.pending,
                    advance: data.advance
                })
            }
            setPaymentType(data.paymentType)
            const bookingDate = dayjs(data.date);
            if (data) {
                form.setFieldsValue({
                    customerName: data.customerName,
                    mobileNumber: data.mobilenu,
                    date: bookingDate,
                    item: data.item,
                    amount: paymentAmount.amount,
                    advance: paymentAmount.advance || 0,
                    pending: paymentAmount.pending,
                    startTime: dayjs(data.time.start),
                    endTime: dayjs(data.time.end),
                    totalHours: data.totalHours,
                    description: data.description,
                    note: data.note
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        let installments = [];
        if (values.paymentType === "installment") {
            installments = installmentGroups.map(group => ({
                amount: group.amount,
                date: dayjs(group.date, "DD-MM-YYYY").toDate(),
                status: group.status
            }));
        }
        let response = null
        const formData = {
            customerName: values.customerName,
            mobilenu: values.mobileNumber,
            item: values.item,
            date: dayjs(values.date),
            time: {
                start: values.startTime.format('hh:mm A'),
                end: values.endTime.format('hh:mm A'),
            },
            totalHours: values.totalHours,
            amount: paymentAmount.amount,
            advance: paymentAmount.advance || 0,
            pending: paymentAmount.pending,
            paymentType: paymentType,
            installment: installments,
            description: values.description,
            note: values.note
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
                initialValues={{
                    paymentType: 'one-time'
                }}
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

                    <Col xs={24}>
                        <Item label="Payment Type" name='paymentType' rules={[{ required: true, message: 'Please select a payment type!' }]}>
                            <Radio.Group value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                <Radio value="one-time">One-Time Payment</Radio>
                                <Radio value="installment">Installment Payment</Radio>
                            </Radio.Group>
                        </Item>
                    </Col>

                    <Col xs={24}>
                        <PaymentForm
                            paymentType={paymentType}
                            setPaymentType={setPaymentType}
                            installmentGroups={installmentGroups}
                            setInstallmentGroups={setInstallmentGroups}
                            addInstallmentGroup={addInstallmentGroup}
                            removeInstallmentGroup={removeInstallmentGroup}
                            initialValues={initialValue}
                            mode={mode}
                            paymentAmount={paymentAmount}
                            setPaymentAmount={setPaymentAmount}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12}>
                        <Item
                            name="description"
                            label="Description"
                        >
                            <Input.TextArea placeholder="Enter description" rows={3} />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Item
                            name='note'
                            label="Extra Notes"
                        >
                            <Input.TextArea placeholder="Enter notes" rows={3} />
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
