import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../features/user/UserSlice';
import HourlyForm from '../../components/Hourly/HourlyForm';
import DailyForm from '../../components/Daily/DailyForm';

function AddBooking() {
    const dispatch = useDispatch()
    const { user, status } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch, status])
    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Add Booking</h1>
                        </div>
                    </div>
                    <div className='p-6'>
                        {user.data?.businessType === "Box Cricket" ? (<HourlyForm />) : (<DailyForm />)}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBooking
