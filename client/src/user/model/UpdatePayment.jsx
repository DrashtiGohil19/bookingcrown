import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { UpdateBooking } from '../../api/Bookings';
import { useDispatch } from 'react-redux';
import { fetchIncomeAndExpenses } from '../../features/Expense/ExpenseSlice';

const { Item } = Form;

const UpdatePayment = ({ showModel, handleCancel, selectedRecord }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const handleOk = () => {
        form.submit();
    };

    useEffect(() => {
        if (selectedRecord) {
            form.setFieldsValue({
                amount: selectedRecord.amount,
                advance: selectedRecord.advance,
                pending: selectedRecord.pending,
            });
        }
    }, [selectedRecord, form]);

    const onFinish = async (values) => {
        const formData = {
            advance: values.advance,
            pending: values.pending,
            amount: values.amount,
            fullyPaid: values.fullyPaid
        }

        const response = await UpdateBooking(formData, selectedRecord.key)
        if (response) {
            handleCancel()
            dispatch(fetchIncomeAndExpenses({ month: null }));
        }
    }

    const handleValuesChange = (changedValues, allValues) => {
        const { amount = 0, advance = 0 } = allValues;
        if ('advance' in changedValues || 'amount' in changedValues) {
            const pending = amount - advance;
            form.setFieldsValue({ pending: pending >= 0 ? pending : 0 });
        }
    };
    return (
        <>
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
                    onValuesChange={handleValuesChange}
                >
                    <Item
                        name="amount"
                        label="Total Amount"
                        rules={[{ required: true, message: 'Please input total amount!' }]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter amount"
                        />
                    </Item>
                    <Item
                        name="advance"
                        label="Advance Amount"
                        rules={[{ required: true, message: 'Please input advance amount!' }]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter amount"
                        />
                    </Item>
                    <Item
                        name="pending"
                        label="Pending Amount"
                        rules={[{ required: true, message: 'Please input pending amount!' }]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter amount"
                        />
                    </Item>
                    <Item
                        name="fullyPaid"
                        label="Fully Paid"
                        className='mb-0'
                        layout='horizontal'
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                        valuePropName="checked"
                    >
                        <Checkbox />
                    </Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdatePayment;
