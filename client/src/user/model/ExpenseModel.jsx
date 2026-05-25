import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { AddExpenses, UpdateExpense } from '../../api/Expenses';

const { Item } = Form;

function ExpenseModel({ showModel, handleCancel, editRecord }) {
    const [form] = Form.useForm();
    const isEditing = !!editRecord;

    useEffect(() => {
        if (showModel) {
            if (editRecord) {
                form.setFieldsValue({
                    date: dayjs(editRecord.date),
                    description: editRecord.description,
                    amount: editRecord.amount,
                });
            } else {
                form.resetFields();
            }
        }
    }, [showModel, editRecord, form]);

    const handleOk = () => {
        form.submit();
    };

    const onFinish = async (values) => {
        const formData = {
            amount: values.amount,
            description: values.description,
            date: dayjs(values.date).format('YYYY-MM-DD')
        }
        let response;
        if (isEditing) {
            response = await UpdateExpense(editRecord._id, formData);
        } else {
            response = await AddExpenses(formData);
        }
        if (response && response.success !== false) {
            handleCancel()
            form.resetFields()
        }
    }

    return (
        <Modal
            title={isEditing ? "Edit Expense" : "Add Expense"}
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
