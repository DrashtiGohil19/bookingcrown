import { Table, Input, DatePicker, Button, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../features/user/UserSlice';
import { FaInfoCircle } from 'react-icons/fa';
import CreatePlan from '../model/CreatePlan';
import dayjs from 'dayjs';
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { RiExpandUpDownFill } from 'react-icons/ri';
import { updateUserBType } from '../../api/User';

dayjs.extend(timezone);
dayjs.extend(utc);

const { Option } = Select;

const business = [
    { id: 2, name: 'Box Cricket' },
    { id: 3, name: 'Cafe/Restaurant' },
    { id: 4, name: 'Hotel management' },
    { id: 3, name: 'Farm' },
]

const columns = (activeKey, showModal, editRecord, handleSaveEdit, setEditRecord) => [
    {
        title: 'Name',
        dataIndex: 'name',
        align: "center"
    },
    {
        title: 'Mobile Nu.',
        dataIndex: 'mobileNumber',
        align: "center"
    },
    {
        title: 'B-Type',
        dataIndex: 'bussinessType',
        align: "center",
        render: (text, record) => {
            if (editRecord?.key === record.key) {
                return (
                    <Select
                        className='w-full'
                        placeholder="Select Business Type"
                        suffixIcon={<RiExpandUpDownFill className="text-gray-400" />}
                        onChange={(value) => setEditRecord({ ...editRecord, bussinessType: value })}
                        value={editRecord.bussinessType}
                    >
                        {business.map(person => (
                            <Option key={person.id} value={person.name}>
                                {person.name}
                            </Option>
                        ))}
                    </Select>
                );
            }
            return text;
        },
    },
    {
        title: 'B-Name',
        dataIndex: 'bussinessName',
        align: "center"
    },
    {
        title: 'Joining Date',
        dataIndex: 'createdAt',
        align: "center",
        render: (text) => dayjs(text).format('DD-MM-YYYY'),
    },
    ...(activeKey === "1" ? [
        {
            title: 'Active Plan',
            dataIndex: 'activePlan',
            align: "center"
        },
        {
            title: 'Amount (₹)',
            dataIndex: 'amount',
            align: "center"
        },
        {
            title: 'Starting Date',
            dataIndex: 'startDate',
            align: "center",
            render: (text) => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ending Date',
            dataIndex: 'endDate',
            align: "center",
            render: (text) => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (record) => (
                <Button
                    onClick={() => editRecord?.key === record.key ? handleSaveEdit(record.key) : setEditRecord({ ...record, bussinessType: record.bussinessType })}
                    type="primary"
                >
                    {editRecord?.key === record.key ? 'Save' : 'Edit'}
                </Button>
            ),
        }
    ] : []),
    ...(activeKey === "2" ? [{
        title: 'Set Plan',
        key: 'actions',
        align: "center",
        render: (record) => (
            <FaInfoCircle className='text-[20px] mx-auto text-themeColor' onClick={() => showModal(record.key)} />
        )
    }] : []),
];

function UsersTable({ activeKey }) {
    const { allUsers, status } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [editRecord, setEditRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    const showModal = (record) => {
        const user = allUsers.find(u => u._id === record);
        setSelectedId(record);
        setSelectedUser(user);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (status !== "idle") { setLoading(false) }
    }, [status])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(fetchAllUsers());
            } finally {
                setLoading(false);
            }
        };

        if (status === 'idle') {
            fetchUsers();
        }
    }, [dispatch, status, loading]);

    const handleSaveEdit = async (key) => {
        if (editRecord) {
            const formData = { bType: editRecord.bussinessType };
            await updateUserBType(formData, key);
            dispatch(fetchAllUsers());
            setEditRecord(null);
        }
    };

    const now = dayjs().startOf("day");
    const filteredData = allUsers
        .filter((user) => {
            const hasPlan = user.planData && user.planData.planType;

            const hasExpiredPlan = hasPlan && dayjs(user.planData.endDate).endOf('day').isBefore(now);

            const matchesSearchText = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.mobilenu.toString().includes(searchText.toString()) ||
                user.businessType.toLowerCase().includes(searchText.toLowerCase()) ||
                user.businessName.toLowerCase().includes(searchText.toLowerCase());

            const selectedDateMoment = selectedDate ? dayjs(selectedDate).startOf('day') : null;
            const startDateMoment = user.planData?.startDate ? dayjs(user.planData.startDate).startOf('day') : null;
            const endDateMoment = user.planData?.endDate ? dayjs(user.planData.endDate).endOf('day') : null;

            const matchesDate = selectedDateMoment ?
                (startDateMoment && selectedDateMoment.isSame(startDateMoment, 'day')) ||
                (endDateMoment && selectedDateMoment.isSame(endDateMoment, 'day')) :
                true;

            if (activeKey === "1") {
                return hasPlan && matchesSearchText && matchesDate && !hasExpiredPlan;
            } else if (activeKey === "2") {
                return (hasExpiredPlan || !hasPlan) && matchesSearchText && matchesDate;
            }
            return false;
        })
        .map((user) => ({
            key: user._id,
            name: user.name,
            mobileNumber: user.mobilenu,
            bussinessType: user.businessType,
            bussinessName: user.businessName,
            createdAt: user.createdAt,
            amount: user.planData ? user.planData.amount : '',
            activePlan: user.planData ? user.planData.planType : '',
            startDate: user.planData ? user.planData.startDate : '',
            endDate: user.planData ? user.planData.endDate : ''
        }));

    return (
        <div>
            <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <Input
                    placeholder="Search..."
                    value={searchText}
                    className='w-full'
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                    className='w-full'
                    placeholder="Search by Date"
                />
            </div>

            <Table
                columns={columns(activeKey, showModal, editRecord, handleSaveEdit, setEditRecord)}
                dataSource={filteredData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                loading={{
                    indicator: <Spin size="large" />,
                    spinning: loading
                }}
                size='middle'
                className='border border-gray-300 rounded-lg'
            />

            <CreatePlan showModel={open} handleCancel={handleCancel} selectedId={selectedId} selectedUser={selectedUser} />
        </div>
    );
}

export default UsersTable;
