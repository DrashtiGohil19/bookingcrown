import React from 'react';
import Footer from '../../../common/Footer';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Contact from '../../../common/Contact';

function ThankYou() {
    const navigate = useNavigate();
    return (
        <section className='bg-[#f1fafb]'>
            <main className='min-h-screen flex flex-col justify-center items-center py-8 px-4'>
                <div className='max-w-2xl w-full text-center'>
                    <h1 className='font-semibold text-3xl md:text-4xl text-themeColor mb-4'>
                        Thank You For Signing Up!
                    </h1>
                    <p className='text-slate-400 mb-6'>
                        We appreciate your interest and will review your profile promptly.
                        You will receive an email with your password once your profile has been reviewed.
                        Should you have any questions in the meantime, please do not hesitate to contact Booking Crown.
                    </p>
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
