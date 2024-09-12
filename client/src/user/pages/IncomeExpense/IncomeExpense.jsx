import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Button, Table, Row, Col, DatePicker } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomeAndExpenses } from '../../../features/Expense/ExpenseSlice';
import ExpenseModel from '../../model/ExpenseModel';
import dayjs from 'dayjs';

const incomeColumns = [
    {
        title: 'Booking Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Amount(₹)',
        dataIndex: 'amount',
        key: 'amount',
    }
];

const expenseColumns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Amount(₹)',
        dataIndex: 'amount',
        key: 'amount',
    },
];

function IncomeExpense() {
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const dispatch = useDispatch();
    const { incomeData, expenseData, totalIncome, totalExpense, profitOrLoss, status, error } = useSelector(state => state.expenses);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIncomeAndExpenses({ month: selectedMonth }));
        }
    }, [dispatch, status]);

    const handleCancel = () => {
        setOpen(false);
        dispatch(fetchIncomeAndExpenses({ month: selectedMonth }));
    };

    const onMonthChange = (date) => {
        if (date) {
            const formattedMonth = dayjs(date).format("YYYY-MM")
            setSelectedMonth(formattedMonth);
            dispatch(fetchIncomeAndExpenses({ month: formattedMonth }))
        } else {
            setSelectedMonth(null);
            dispatch(fetchIncomeAndExpenses({ month: null }))
        }
    };

    useEffect(() => {
        return () => {
            dispatch(fetchIncomeAndExpenses({ month: null }));
        };
    }, [dispatch]);

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3">
                        <div className="w-full flex flex-col sm:flex-row justify-between mb-3 space-y-2 sm:space-y-0">
                            <div>
                                <h1 className="text-xl font-semibold text-start">Income/Expense</h1>
                            </div>
                            <div className="flex w-full gap-4 sm:w-auto items-center">
                                <DatePicker
                                    picker="month"
                                    onChange={onMonthChange}
                                    placeholder="Select month"
                                    format="MM-YYYY"
                                    inputMode={false}
                                    className="w-full sm:w-auto lg:w-48"
                                />
                                <Button
                                    type="primary"
                                    onClick={() => setOpen(true)}
                                >
                                    <FaPlus /> New Expense
                                </Button>
                            </div>
                        </div>
                    </div>


                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <h2 className="mb-2">Income</h2>
                            <Table
                                columns={incomeColumns}
                                dataSource={incomeData}
                                pagination={false}
                                bordered
                                size='middle'
                                rowKey={record => record.id}
                                footer={() => <div>Total Income: ₹ {totalIncome}</div>}
                                className='border border-gray-300 rounded-lg w-full'
                            />
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <h2 className="mb-2">Expenses</h2>
                            <Table
                                columns={expenseColumns}
                                dataSource={expenseData}
                                pagination={false}
                                bordered
                                size='middle'
                                rowKey={record => record.id}
                                footer={() => <div>Total Expenses: ₹ {totalExpense}</div>}
                                className='border border-gray-300 rounded-lg w-full'
                            />
                        </Col>
                    </Row>
                    <div className="mt-4 p-4 border-gray-300 rounded-sm border w-fit">
                        <h3 className={`text-lg font-semibold ${profitOrLoss >= 0 ? "text-themeColor" : "text-red-600"}`}>
                            {profitOrLoss >= 0 ? "Profit" : "Loss"}:
                            <span className="ml-2">₹ {Math.abs(profitOrLoss)}</span>
                        </h3>
                    </div>
                </div>
            </main>
            <ExpenseModel showModel={open} handleCancel={handleCancel} />
        </div>
    );
}

export default IncomeExpense;
