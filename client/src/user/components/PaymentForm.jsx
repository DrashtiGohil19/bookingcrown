import React, { useEffect, useState } from 'react';
import { Col, Input, Button, DatePicker, Form, Row, Select } from 'antd';
import dayjs from 'dayjs';

const { Item } = Form;

const PaymentForm = ({
    paymentType,
    setPaymentType,
    installmentGroups,
    setInstallmentGroups,
    addInstallmentGroup,
    removeInstallmentGroup,
    mode,
    initialValues = {},
    paymentAmount,
    setPaymentAmount
}) => {
    const [error, setError] = useState(null);

    const handleAmountChange = (id, value) => {
        const newGroups = installmentGroups.map((group) =>
            group.id === id ? { ...group, amount: value } : group
        );
        setInstallmentGroups(newGroups);
    };

    const handleDateChange = (id, date) => {
        const newGroups = installmentGroups.map((group) =>
            group.id === id ? { ...group, date: date ? date.format('DD-MM-YYYY') : '' } : group
        );
        setInstallmentGroups(newGroups);
    };

    const handleStatusChange = (id, value) => {
        const updatedGroups = installmentGroups.map((group) =>
            group.id === id ? { ...group, status: value } : group
        );
        setInstallmentGroups(updatedGroups);
    };

    const handlePaymentChange = (newTotal, newAdvance) => {
        if (newAdvance > newTotal) {
            setError("Advance amount cannot be more than the total amount.");
            newAdvance = newTotal;
        } else {
            setError(null);
        }

        const pending = newTotal ? newTotal - (newAdvance || 0) : 0;

        setPaymentAmount((prevAmount) => ({
            ...prevAmount,
            amount: newTotal,
            advance: newAdvance,
            pending: pending
        }));
    };

    useEffect(() => {
        if (paymentType === "installment") {
            if (mode === 'update' && initialValues.installment.length > 0) {
                const transformedInstallments = initialValues.installment.map((item) => ({
                    id: item._id,
                    amount: item.amount,
                    date: item.date,
                    status: item.status
                }));
                setInstallmentGroups(transformedInstallments);
            } else {
                setInstallmentGroups([{ id: Date.now() + Math.random(), amount: '', date: '' }]);
            }
        }
    }, [paymentType, mode, initialValues]);

    return (
        <>
            {paymentType === 'one-time' && (
                <Row gutter={16}>
                    <Col xs={24} sm={12} lg={8}>
                        <Item
                            label="Total Amount"
                            rules={[{ required: true, message: 'Please input total amount!' }]}
                        >
                            <Input
                                type="number"
                                placeholder="Amount"
                                className="h-10"
                                value={paymentAmount.amount || ""}
                                onChange={(e) => {
                                    const newTotal = parseFloat(e.target.value) || 0;
                                    handlePaymentChange(newTotal, paymentAmount.advance);
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Item
                            label="Advance Amount"
                        >
                            <Input
                                type="number"
                                placeholder="Advance Amount"
                                className="h-10"
                                value={paymentAmount.advance}
                                onChange={(e) => {
                                    const newAdvance = parseFloat(e.target.value) || 0;
                                    handlePaymentChange(paymentAmount.amount, newAdvance);
                                }}
                            />
                            {error && <p style={{ color: 'red', marginTop: '4px' }}>{error}</p>}
                        </Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Item
                            label="Pending Amount"
                        >
                            <Input
                                type="number"
                                readOnly
                                placeholder="Pending Amount"
                                value={paymentAmount.pending}
                                // onChange={(e) => setPaymentAmount({ ...paymentAmount, pending: e.target.value })}
                                className="h-10"
                            />
                        </Item>
                    </Col>
                </Row>
            )}

            {paymentType === 'installment' && (
                <>
                    {installmentGroups.map((group, index) => (
                        <Row key={group.id} gutter={16}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name={`installmentAmount-${group.id}`}
                                    label="Installment Amount"
                                    initialValue={group.amount}
                                    rules={[{ required: true, message: 'Please input the installment amount!' }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder="Installment Amount"
                                        className="h-10 w-full"
                                        value={group.amount}
                                        onChange={(e) => handleAmountChange(group.id, e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name={`installmentDate-${group.id}`}
                                    label="Installment Date"
                                    initialValue={group.date ? dayjs(group.date) : null}
                                    rules={[{ required: true, message: 'Please select a due date!' }]}
                                >
                                    <DatePicker
                                        placeholder="Select Due Date"
                                        className="h-10 w-full"
                                        inputReadOnly
                                        format="DD-MM-YYYY"
                                        value={group.date ? dayjs(group.date) : null}
                                        onChange={(date) => handleDateChange(group.id, date)}
                                    />
                                </Form.Item>
                            </Col>

                            {mode === "update" && (
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name={`installmentStatus-${group.id}`}
                                        label="Status"
                                        initialValue={group.status || 'pending'}
                                        rules={[{ required: true, message: 'Please select a status!' }]}
                                    >
                                        <Select
                                            placeholder="Select Status"
                                            className="h-10 w-full"
                                            value={group.status}
                                            onChange={(value) => handleStatusChange(group.id, value)}
                                        >
                                            <Select.Option value="pending">Pending</Select.Option>
                                            <Select.Option value="complete">Complete</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}

                            <Col xs={24} md={8}>
                                <div className="flex gap-2 sm:mb-3">
                                    {installmentGroups.length > 1 && (
                                        <Button
                                            type='primary'
                                            danger
                                            className="h-10"
                                            onClick={() => removeInstallmentGroup(group.id)}
                                        >
                                            X
                                        </Button>
                                    )}
                                    {index === installmentGroups.length - 1 && (
                                        <Button
                                            type="primary"
                                            className="h-10"
                                            onClick={addInstallmentGroup}
                                        >
                                            Add More
                                        </Button>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </>
    );
};

export default PaymentForm;
