import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { UpdateBooking } from '../../api/Bookings';
import { useDispatch } from 'react-redux';
import { fetchIncomeAndExpenses } from '../../features/Expense/ExpenseSlice';
import PaymentForm from '../components/PaymentForm';
import dayjs from 'dayjs';

const { Item } = Form;

const UpdatePayment = ({ showModel, handleCancel, selectedRecord }) => {
    const [form] = Form.useForm();
    const [paymentType, setPaymentType] = useState();
    const [installmentGroups, setInstallmentGroups] = useState([{ id: Date.now() + Math.random(), amount: '', date: '' }])
    const [paymentAmount, setPaymentAmount] = useState({
        amount: '',
        pending: '',
        advance: ''
    });
    const dispatch = useDispatch()
    const handleOk = () => {
        form.submit();
    };

    useEffect(() => {
        if (!showModel) {
            setInstallmentGroups([{ id: Date.now() + Math.random(), amount: '', date: '' }]);
        }
    }, [showModel]);

    const addInstallmentGroup = () => {
        setInstallmentGroups([
            ...installmentGroups,
            { id: Date.now() + Math.random(), amount: '', date: '' }
        ]);
    };

    const removeInstallmentGroup = (id) => {
        const updatedGroups = installmentGroups.filter((group) => group.id !== id);
        setInstallmentGroups(updatedGroups);
    };

    useEffect(() => {
        if (selectedRecord) {
            setPaymentType(selectedRecord.paymentType)
            if (selectedRecord.paymentType === "one-time") {
                setPaymentAmount({
                    amount: selectedRecord.amount,
                    pending: selectedRecord.pending,
                    advance: selectedRecord.advance
                })
            }
        }
    }, [selectedRecord, form]);

    const parseInstallmentDate = (date) => {
        if (!date) return null;

        const parsedDate = dayjs(date, ["DD-MM-YYYY", dayjs.ISO_8601], true);

        if (!parsedDate.isValid()) {
            throw new Error(`Invalid date format for installment date: ${date}`);
        }

        return parsedDate.toDate();
    };

    const onFinish = async (values) => {
        let installment = [];
        if (paymentType === "installment") {
            installment = installmentGroups.map(group => ({
                amount: group.amount,
                date: parseInstallmentDate(group.date),
                status: group.status
            }));
        }

        const formData = {
            fullyPaid: values.fullyPaid,
            paymentType: paymentType,
            ...(paymentType === "installment" && { installment }),
            ...(paymentType === "one-time" && {
                amount: paymentAmount.amount,
                advance: paymentAmount.advance,
                pending: paymentAmount.pending
            })
        };
        try {
            const response = await UpdateBooking(formData, selectedRecord.key);
            if (response) {
                handleCancel();
                dispatch(fetchIncomeAndExpenses({ month: null }));
            }
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

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
                    width={600}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={24}>
                            <PaymentForm
                                paymentType={paymentType}
                                setPaymentType={setPaymentType}
                                installmentGroups={installmentGroups}
                                setInstallmentGroups={setInstallmentGroups}
                                addInstallmentGroup={addInstallmentGroup}
                                removeInstallmentGroup={removeInstallmentGroup}
                                mode="update"
                                initialValues={selectedRecord}
                                paymentAmount={paymentAmount}
                                setPaymentAmount={setPaymentAmount}
                            />
                        </Col>
                        <Col xs={24}>
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
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default UpdatePayment;
