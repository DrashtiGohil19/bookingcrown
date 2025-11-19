import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Badge, Tabs } from 'antd'
import UsersTable from '../../components/UsersTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../features/user/UserSlice';
import moment from 'moment';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

const socket = io(process.env.REACT_APP_BACKEND_URL);

function Dashboard() {
    const [activeKey, setActiveKey] = useState('1');
    const { allUsers, status } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const now = dayjs();
    const filteredUsers = allUsers
        .filter(user => !user.planData || (user.planData && dayjs(user.planData.endDate).endOf('day').isBefore(now)))

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, status]);

    useEffect(() => {
        socket.emit('joinRoom', 'adminRoom');
        socket.on('newUser', () => {
            dispatch(fetchAllUsers());
        });
        return () => {
            socket.off('newUser');
        };
    }, [dispatch]);

    const items = [
        {
            key: '1',
            label: 'All User',
            children: <UsersTable activeKey={"1"} />,
        },
        {
            key: '2',
            label: (
                <span>
                    Set Plan
                    <Badge
                        size='small'
                        count={filteredUsers.length}
                        style={{ marginLeft: "5px", backgroundColor: "#14b8a6" }}
                    />
                </span>
            ),
            children: <UsersTable activeKey={"2"} />,
        },
    ];

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                    </div>
                    <div>
                        <Tabs
                            defaultActiveKey="1"
                            activeKey={activeKey}
                            onChange={(key) => setActiveKey(key)}
                            items={items}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
