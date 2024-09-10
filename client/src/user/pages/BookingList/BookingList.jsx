import React from 'react'
import Sidebar from '../../components/Sidebar'
import CommonTable from '../../components/CommonTable';
import { Button } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BookingList() {
    const navigate = useNavigate()
    return (
        <div className='h-[100vh]'>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="w-full flex flex-row justify-between items-center mb-3">
                        <div>
                            <h1 className="text-xl font-semibold">Booking List</h1>
                        </div>
                        <div>
                            <Button type="primary" onClick={() => navigate("/user/add-booking")}>
                                <FaPlus /> New Booking
                            </Button>
                        </div>
                    </div>
                    <div>
                        <CommonTable filter={"all"} />
                    </div>

                </div>
            </main>
        </div>
    )
}

export default BookingList
