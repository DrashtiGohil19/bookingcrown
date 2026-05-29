import React from 'react';
import Footer from '../../../common/Footer';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Contact from '../../../common/Contact';
import Seo from '../../../common/Seo';

function ThankYou() {
    const navigate = useNavigate();
    const location = useLocation();
    const { password, mobilenu, name } = location.state || {};

    return (
        <section className='bg-[#f1fafb]'>
            <Seo
                title="Signup Confirmation"
                description="BookingCrown signup confirmation."
                path="/signup-confirmation"
                robots="noindex,nofollow"
            />
            <main className='min-h-screen flex flex-col justify-center items-center py-8 px-4'>
                <div className='max-w-2xl w-full text-center'>
                    <h1 className='font-semibold text-3xl md:text-4xl text-themeColor mb-4'>
                        Thank You For Signing Up!
                    </h1>
                    <p className='text-slate-400 mb-6'>
                        We appreciate your interest and will review your profile promptly.
                        An admin will assign a plan to your account shortly.
                    </p>

                    {password && (
                        <div className='bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left'>
                            <h2 className='text-lg font-semibold text-green-800 mb-3'>Your Login Credentials</h2>
                            <p className='text-green-700 mb-2'>Please save these credentials to login after your plan is activated:</p>
                            <div className='bg-white rounded p-3 mt-2 space-y-1'>
                                <p className='text-gray-700'><span className='font-medium'>Mobile:</span> {mobilenu}</p>
                                <p className='text-gray-700'><span className='font-medium'>Password:</span> <span className='font-mono font-bold text-themeColor'>{password}</span></p>
                            </div>
                            <p className='text-sm text-green-600 mt-3'>Login at: <span className='font-medium'>https://www.bookingcrown.com/login</span></p>
                        </div>
                    )}

                    <Contact />
                    <div className='text-center mt-6 text-slate-400'>
                        <p>Feel free to contact us anytime, and we'll get back to you as soon as possible.</p>
                    </div>
                    <Button type='primary' className='h-10 mt-5' onClick={() => navigate("/")}>
                        Go Back To Home
                    </Button>
                </div>
            </main>

            <Footer />
        </section>
    );
}

export default ThankYou;
