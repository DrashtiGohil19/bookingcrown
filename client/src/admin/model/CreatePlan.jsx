import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { createPlanData } from '../../api/Plan';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../features/user/UserSlice';
import moment from 'moment';
import dayjs from 'dayjs';

const { Item } = Form;

const CreatePlan = ({ showModel, handleCancel, selectedId, selectedUser }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState()
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        form.submit();
    };

    const validateEndDate = (_, value) => {
        if (!startDate) {
            return Promise.reject(new Error('Please select a start date first!'));
        }
        if (value && value.isSame(startDate, 'day')) {
            return Promise.reject(new Error('End date cannot be the same as the start date!'));
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        setLoading(true)
        const planData = {
            planType: values.plan,
            startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            amount: values.amount
        }
        const response = await createPlanData(planData, selectedId)
        if (response) {
            await dispatch(fetchAllUsers());
            setLoading(false)
            handleCancel()
            form.resetFields()
            const mobilenu = selectedUser?.mobilenu
            if (mobilenu) {
                const message = [
                    `*Plan Activated - BookingCrown*`,
                    ``,
                    `Dear ${selectedUser?.name || 'Valued Customer'},`,
                    ``,
                    `Your *${values.plan}* plan has been successfully activated.`,
                    ``,
                    `📋 *Plan Details*`,
                    `━━━━━━━━━━━━━━━`,
                    `Plan: ${values.plan}`,
                    `Amount: ₹${values.amount}`,
                    `Start Date: ${dayjs(values.startDate).format('DD-MM-YYYY')}`,
                    `End Date: ${dayjs(values.endDate).format('DD-MM-YYYY')}`,
                    ``,
                    `🔑 *Login Access*`,
                    `━━━━━━━━━━━━━━━`,
                    `Website: https://www.bookingcrown.com/login`,
                    `Mobile: ${mobilenu}`,
                    `Password: (Use the password provided at registration)`,
                    ``,
                    `For any assistance, contact support at +91 99988 83603.`,
                    ``,
                    `Thank you for choosing BookingCrown!`
                ].join('\n')
                const whatsappUrl = `https://wa.me/91${mobilenu}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
            }
        }
    };

    return (
        <>
            <Modal
                title="Assign Plan"
                open={showModel}
                onCancel={handleCancel}
                centered
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' loading={loading} onClick={handleOk}>Submit</Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className='w-full'
                    onFinish={onFinish}
                >
                    <Item
                        name="plan"
                        label="Select Plan"
                        rules={[{ required: true, message: 'Please select a plan!' }]}
                    >
                        <Select
                            placeholder="Select Plan"
                            className='w-full h-10'
                            options={[
                                { value: 'Basic', label: 'Basic' },
                                { value: 'Premium', label: 'Premium' },
                            ]}
                        />
                    </Item>
                    <Item
                        name="amount"
                        label="Amount (₹)"
                        rules={[{ required: true, message: 'Please input amount!' }]}
                    >
                        <Input
                            placeholder="Amount"
                            className="h-10 border-gray-300"
                        />
                    </Item>
                    <Item
                        name="startDate"
                        label="Select Start Date"
                        rules={[{ required: true, message: 'Please select a start date!' }]}
                    >
                        <DatePicker
                            placeholder='Start Date'
                            format="DD-MM-YYYY"
                            inputReadOnly={true}
                            className='w-full h-10'
                            onChange={(e) => setStartDate(e)}
                            disabledDate={currentDate => currentDate && currentDate.isBefore(moment().startOf('day'))}
                        />
                    </Item>
                    <Item
                        name="endDate"
                        label="Select End Date"
                        rules={[
                            { required: true, message: 'Please select an end date!' },
                            { validator: validateEndDate }
                        ]}
                    >
                        <DatePicker
                            placeholder='End Date'
                            className='w-full h-10'
                            inputReadOnly={true}
                            format="DD-MM-YYYY"
                            disabledDate={(currentDate) => startDate && currentDate.isBefore(startDate, "day")}
                        />
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreatePlan;
