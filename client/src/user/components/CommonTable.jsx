import { Col, DatePicker, Input, Row, Select, Spin, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { fetchAllBookings } from '../../features/bookings/BookingSlice';
import { fetchUserData } from '../../features/user/UserSlice';
import UpdatePayment from '../model/UpdatePayment';
import "../../App.css"
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

const { Option } = Select;

const commonColumns = [
    {
        title: 'Name',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobilenu',
        key: 'mobilenu',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
];

const hourlyColumns = [
    {
        title: 'Booking Date',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => {
            if (record.key === 'total') return "Total Hour";
            return (new Date(text).toLocaleDateString("en-GB"))
        },
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Turf',
        dataIndex: 'item',
        key: 'item',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Hr',
        dataIndex: 'Hr',
        key: 'Hr',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
];

const dailyColumns = [
    {
        title: 'Booking Date',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => {
            if (record.key === 'total') return "Total Hour";
        },
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Farm/Hotel',
        dataIndex: 'item',
        key: 'item',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
    {
        title: 'Session',
        dataIndex: 'session',
        key: 'session',
        align: 'center',
        responsive: ['xs', 'sm'],
    },
];

const actionColumns = (handleEdit, navigateDetailPage, showModal) => [
    {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => {
            if (record.key === 'total') return null;
            return (
                <div className='cursor-pointer'>
                    <Tag color={record.payment === "pending" ? "#f94144" : record.payment === "partial" ? "#ffbe0b" : "#38b000"} onClick={() => showModal(record)} >{record.payment}</Tag>
                </div>
            )
        }
    },
    {
        title: 'Actions',
        key: 'actions',
        align: 'center',
        responsive: ['xs', 'sm'],
        render: (text, record) => {
            if (record.key === 'total') return null;
            return (
                <div className='flex'>
                    <FaInfoCircle onClick={() => navigateDetailPage(record)} type="link" className='text-[20px] text-themeColor m-auto' />
                    <FaEdit onClick={() => handleEdit(record.key)} type="link" className="ml-4 text-[20px] text-themeColor" />
                </div>
            );
        },
    },
];

function CommonTable({ filter }) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});
    const navigate = useNavigate();
    const { bookings, status } = useSelector((state) => state.bookings);
    const userState = useSelector((state) => state.user);
    const months = Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM'));

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllBookings());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (status !== "idle") { setLoading(false) }
    }, [status])

    useEffect(() => {
        if (userState.status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch, userState.status])

    const filteredData = bookings
        .filter((booking) => {
            switch (filter) {
                case 'upcoming':
                    const today = dayjs().startOf('day');
                    return dayjs(booking.date).isSameOrAfter(today, 'day');
                default:
                    return true;
            }
        })
        .filter((booking) => {
            const searchLower = searchText.toLowerCase();
            return (
                booking.mobilenu.toString().includes(searchText) ||
                booking.customerName.toLowerCase().includes(searchLower)
            );
        })
        .filter((booking) => {
            if (selectedMonth === null) return true;
            const bookingDate = new Date(booking.date);
            return moment(bookingDate).format('MMMM') === selectedMonth;
        })
        .filter((booking) => {
            if (selectedDate === null) return true;
            const bookingDate = moment(booking.date).format('DD-MM-YYYY');
            return bookingDate === selectedDate;
        })
        .map((booking) => ({
            key: booking._id,
            customerName: booking.customerName,
            mobilenu: booking.mobilenu,
            date: booking.date,
            startTime: booking.time?.start,
            endTime: booking.time?.end,
            item: booking.item,
            Hr: booking.totalHours,
            session: booking.session,
            payment: booking.payment,
            amount: booking.amount,
            advance: booking.advance,
            pending: booking.pending
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleEdit = (id) => {
        navigate(`/user/edit-booking/${id}`);
    };

    const navigateDetailPage = (record) => {
        if (userState.user.data?.bookingType === "hourly") {
            navigate(`/user/hourly-booking-details/${record.key}`);
        } else {
            navigate(`/user/daily-booking-details/${record.key}`);
        }
    };

    const getCurrentPageData = () => {
        const pageSize = 10;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return filteredData.slice(startIndex, endIndex);
    };

    const showModal = (record) => {
        setSelectedRecord(record);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        dispatch(fetchAllBookings())
    };

    const totalHoursPerPage = userState.user.data?.businessType === "Box Cricket"
        ? getCurrentPageData().reduce((sum, booking) => sum + (booking.Hr || 0), 0)
        : null;

    const totalRow =
        userState.user.data?.bookingType === 'hourly' && filteredData.length > 0
            ? [
                {
                    key: 'total',
                    customerName: '',
                    mobilenu: '',
                    date: '',
                    Hr: Math.round(totalHoursPerPage),
                    startTime: '',
                    endTime: '',
                    item: '',
                    session: '',
                },
            ]
            : [];

    const dataSourceWithTotalRow = [...filteredData, ...totalRow];

    const columns = [
        ...(userState.user.data?.businessType === "Box Cricket" ? hourlyColumns : dailyColumns),
        ...commonColumns,
        ...actionColumns(handleEdit, navigateDetailPage, showModal),
    ];

    return (
        <div>
            <div className="mb-4">
                <Row gutter={14}>
                    <Col xs={12} sm={12} md={8}>
                        <Input
                            placeholder="Search by Name or Mobile Number"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full h-8 mb-2 md:mb-0"
                        />
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <Select
                            placeholder="Search by Month"
                            value={selectedMonth}
                            onChange={(value) => setSelectedMonth(value)}
                            className="w-full"
                        >
                            <Option value={null}>All Months</Option>
                            {months.map((month) => (
                                <Option key={month} value={month}>
                                    {month}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <DatePicker
                            placeholder="Search by date"
                            format="DD-MM-YYYY"
                            onChange={(date) => setSelectedDate(date ? date.format('DD-MM-YYYY') : null)}
                            className="w-full"
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSourceWithTotalRow}
                    pagination={{ pageSize: 10, onChange: (page) => setCurrentPage(page) }}
                    scroll={{ x: 'max-content' }}
                    loading={{
                        indicator: <Spin size="large" />,
                        spinning: loading
                    }}
                    size='middle'
                    className='border border-gray-300 rounded-lg'
                />
            </div>

            <UpdatePayment showModel={open} handleCancel={handleCancel} selectedRecord={selectedRecord} />
        </div>
    );
}

export default CommonTable;
