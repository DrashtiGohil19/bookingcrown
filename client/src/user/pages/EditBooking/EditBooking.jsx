import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'react-router-dom';
import HourlyForm from '../../components/Hourly/HourlyForm';
import DailyForm from '../../components/Daily/DailyForm';
import { useSelector } from 'react-redux';

function EditBooking() {
    const params = useParams()
    const { user } = useSelector((state) => state.user);

    return (
        <div>
            <Sidebar />
            <main className="py-4 w-full lg:w-[calc(100%-16rem)] ms-auto">
                <div className="px-4 sm:px-6 lg:px-6">
                    <div className="mb-3 flex flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-xl font-semibold">Edit Booking</h1>
                        </div>
                    </div>
                    <div className='p-6'>
                        {user.data?.businessType === "Box Cricket" ?
                            (<HourlyForm isEditing={true} userId={params.id} />) :
                            (<DailyForm isEditing={true} userId={params.id} />)}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EditBooking
