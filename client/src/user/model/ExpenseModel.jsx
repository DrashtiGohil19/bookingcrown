import React, { useEffect } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Modal } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { AddExpenses } from '../../api/Expenses';

const { Item } = Form;

function ExpenseModel({ showModel, handleCancel }) {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
        form.resetFields()
    };

    const onFinish = async (values) => {
        const formData = {
            amount: values.amount,
            description: values.description,
            date: dayjs(values.date).format('YYYY-MM-DD')
        }
        const response = await AddExpenses(formData)
        if (response) {
            handleCancel()
            form.resetFields()
        }
    }

    return (
        <Modal
            title="Update Payment Details"
            open={showModel}
            onCancel={handleCancel}
            centered
            footer={[
                <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                <Button key="submit" type='primary' onClick={handleOk}>Save</Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                className='w-full'
                onFinish={onFinish}
            >
                <Item
                    name="date"
                    label="Select Date"
                    rules={[{ required: true, message: 'Please select a date!' }]}
                >
                    <DatePicker
                        className='w-full'
                        placeholder="Select date"
                        format="DD-MM-YYYY"
                        inputReadOnly={true}
                        disabledDate={currentDate => currentDate && currentDate.isBefore(moment().startOf('day'))}
                    />
                </Item>
                <Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input a description!' }]}
                >
                    <Input
                        type="text"
                        placeholder="Enter description"
                    />
                </Item>
                <Item
                    name="amount"
                    label="Amount"
                    rules={[
                        { required: true, message: 'Please input an amount!' },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        min={0}
                    />
                </Item>
            </Form>
        </Modal>
    )
}

export default ExpenseModel
