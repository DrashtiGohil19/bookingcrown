import React from 'react'
import { IoCall } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'

function Contact() {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="rounded-md shadow bg-white max-w-max">
                    <div className="p-6 text-center">
                        <i className=' text-themeColor'><MdEmail className='mb-2 text-[30px] mx-auto text-center' /></i>
                        <h4 className='font-semibold text-themeColor'>Email</h4>
                        <p className="mt-3 text-[15px] text-slate-400">
                            <a href="mailto:bookingcrown8@gmail.com" target='_blank'>bookingcrown8@gmail.com</a>
                        </p>
                    </div>
                </div>
                <div className="rounded-md shadow bg-white max-w-max px-5">
                    <div className="p-6 text-center">
                        <i className=' text-themeColor'><IoCall className='mb-2 text-[30px] mx-auto text-center' /></i>
                        <h4 className='font-semibold text-themeColor'>Phone</h4>
                        <p className="mt-3 text-[15px] text-slate-400">
                            <a href="tel:+91 99988 83603" target='_blank'>+91 99988 83603</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
