import React from 'react';
import Footer from '../../../common/Footer';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaMobileAlt, FaLock, FaClipboardList } from 'react-icons/fa';
import Seo from '../../../common/Seo';

function ThankYou() {
    const navigate = useNavigate();

    return (
        <section className='bg-gray-50 min-h-screen flex flex-col'>
            <Seo
                title="Registration Successful"
                description="Your BookingCrown account has been created successfully."
                path="/signup-confirmation"
                robots="noindex,nofollow"
            />
            <main className='flex-1 flex items-center justify-center px-4 py-12'>
                <div className='w-full max-w-lg'>
                    <div className='bg-white rounded-xl shadow-lg p-8 text-center'>
                        <div className='flex justify-center mb-4'>
                            <div className='bg-green-100 rounded-full p-3'>
                                <FaCheckCircle className='text-4xl text-green-500' />
                            </div>
                        </div>

                        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                            Registration Successful!
                        </h1>
                        <p className='text-gray-500 mb-8'>
                            Your account has been created. You can log in anytime using your mobile number and password.
                        </p>

                        <div className='bg-blue-50 rounded-lg p-5 mb-6 text-left space-y-3'>
                            <h2 className='font-semibold text-blue-800 text-sm uppercase tracking-wide'>How to Get Started</h2>
                            <div className='flex items-start gap-3'>
                                <div className='bg-blue-100 rounded-full p-2 mt-0.5'>
                                    <FaMobileAlt className='text-blue-600 text-sm' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-gray-800'>Step 1: Log In</p>
                                    <p className='text-sm text-gray-500'>Use your mobile number and password to sign in.</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='bg-blue-100 rounded-full p-2 mt-0.5'>
                                    <FaLock className='text-blue-600 text-sm' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-gray-800'>Step 2: Wait for Plan Activation</p>
                                    <p className='text-sm text-gray-500'>An admin will assign a plan to your account.</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='bg-blue-100 rounded-full p-2 mt-0.5'>
                                    <FaClipboardList className='text-blue-600 text-sm' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-gray-800'>Step 3: Start Managing Bookings</p>
                                    <p className='text-sm text-gray-500'>Once your plan is active, you can add and manage bookings.</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            type='primary'
                            size='large'
                            className='w-full h-12 text-base font-medium !bg-themeColor'
                            onClick={() => navigate('/login')}
                        >
                            Go to Login <FaArrowRight className='ml-2' />
                        </Button>

                        <div className='mt-4'>
                            <Button
                                type='link'
                                className='text-gray-400 hover:text-gray-600'
                                onClick={() => navigate('/')}
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </section>
    );
}

export default ThankYou;
