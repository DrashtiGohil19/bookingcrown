import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateBooking, getBookingById, UpdateBooking } from '../../../api/Bookings';
import { fetchAllBookings } from '../../../features/bookings/BookingSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import "../../../App.css"
import PaymentForm from '../PaymentForm';

const { Item } = Form;
const { RangePicker } = DatePicker;

function DailyForm({ isEditing, userId }) {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.user);
    const [paymentType, setPaymentType] = useState('one-time');
    const [mode, setMode] = useState("create")
    const [initialValue, setInitialValue] = useState({})
    const [installmentGroups, setInstallmentGroups] = useState([{ id: Date.now() + Math.random(), amount: '', date: '' }])
    const [paymentAmount, setPaymentAmount] = useState({
        amount: '',
        pending: '',
        advance: ''
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            getBookingsData()
        }
    }, [userId])

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
            const [firstDate, secondDate] = data.dateRange;
            const bookingDates =
                firstDate === secondDate
                    ? [dayjs(firstDate), null]
                    : [dayjs(firstDate), dayjs(secondDate)];
            setPaymentType(data.paymentType)
            if (data) {
                form.setFieldsValue({
                    customerName: data.customerName,
                    mobileNumber: data.mobilenu,
                    date: bookingDates,
                    item: data.item,
                    totalHours: data.totalHours,
                    amount: paymentAmount.amount,
                    advance: paymentAmount.advance || 0,
                    pending: paymentAmount.pending,
                    session: data.session,
                    paymentType: paymentType,
                    description: data.description,
                    note: data.note
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        const date = [values.date[0], values.date[1] || values.date[0]];
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
            date: date,
            session: values.session,
            amount: paymentAmount.amount,
            advance: paymentAmount.advance || 0,
            pending: paymentAmount.pending,
            description: values.description,
            note: values.note,
            paymentType: values.paymentType,
            installment: installments
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
                initialValues={{
                    paymentType: 'one-time'
                }}
            >
                <Row gutter={16}>
                    <Col xs={12} sm={12} lg={8}>
                        <Item
                            name="customerName"
                            label="Customer name"
                            labelCol={"right"}
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
                            label="Select Booking Item"
                            rules={[{ required: true, message: 'Please select a Booking Item!' }]}
                        >
                            <Select
                                mode='multiple'
                                placeholder="Select Booking Item"
                                className='h-10'
                                showSearch={false}
                                options={
                                    user.data?.itemList?.map((item) => ({
                                        value: item,
                                        label: item,
                                    })) || []
                                }
                            />
                        </Item>
                    </Col>

                    <Col xs={12} sm={12} lg={8}>
                        <Form.Item
                            name="date"
                            label="Booking Date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select at least the start date!',
                                    validator: (_, value) => {
                                        if (value && value[0]) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please select at least the start date!'));
                                    },
                                },
                            ]}
                        >
                            <RangePicker
                                placeholder={['From Date', 'To Date']}
                                className="h-10 w-full"
                                format="DD-MM-YYYY"
                                allowEmpty={[false, true]}
                            />
                        </Form.Item>
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
                                showSearch={false}
                                options={[
                                    { value: 'Morning Session', label: 'Morning Session' },
                                    { value: 'Afternoon Session', label: 'Afternoon Session' },
                                    { value: 'Evening Session', label: 'Evening Session' },
                                    { value: 'Full Day', label: 'Full Day' }
                                ]}
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

export default DailyForm
