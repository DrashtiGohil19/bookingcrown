import React from 'react';
import Footer from '../../../common/Footer';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Contact from '../../../common/Contact';
import Seo from '../../../common/Seo';

function ThankYou() {
    const navigate = useNavigate();

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
                        Registration Successful!
                    </h1>
                    <p className='text-slate-400 mb-6'>
                        Your account has been created successfully. You can now login using your mobile number and the password you set.
                        An admin will assign a plan to your account shortly to grant you full access.
                    </p>

                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left'>
                        <h2 className='text-lg font-semibold text-blue-800 mb-2'>Next Steps</h2>
                        <ul className='text-blue-700 space-y-2 text-left list-disc list-inside'>
                            <li>Login with your mobile number and password</li>
                            <li>Wait for admin to activate your plan</li>
                            <li>Once activated, you can start managing bookings</li>
                        </ul>
                        <p className='text-sm text-blue-600 mt-3'>
                            Login at: <span className='font-medium'>https://www.bookingcrown.com/login</span>
                        </p>
                    </div>

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
