import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Contact from '../../common/Contact';

function ContactUs() {
    return (
        <div>
            <Header />
            <section className='bg-[#f1fafb] min-h-screen pt-24'>
                <div className='container mx-auto px-4 md:px-8 py-12 max-w-4xl'>
                    <div className='text-center mb-12'>
                        <h1 className='text-3xl md:text-4xl font-bold text-themeColor mb-4'>Contact Us</h1>
                        <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
                            We'd love to hear from you! If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our team is here to assist you and ensure that your experience with BookingCrown is nothing short of excellent.
                        </p>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 mb-8'>
                        <Contact />
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 mb-8'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Get in Touch</h2>
                        <p className='text-slate-600 leading-relaxed mb-4'>
                            Whether you're a current user with a question, a potential customer exploring our services, or someone with feedback to share, we're here to help. Our support team typically responds within 24 hours during business days.
                        </p>
                        <p className='text-slate-600 leading-relaxed mb-4'>
                            You can reach us through any of the following methods:
                        </p>
                        <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4'>
                            <li><strong>Email:</strong> For general inquiries, support requests, or partnership opportunities</li>
                            <li><strong>Phone:</strong> For urgent matters or immediate assistance</li>
                            <li><strong>Business Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST</li>
                        </ul>
                        <p className='text-slate-600 leading-relaxed'>
                            Feel free to contact us anytime, and we'll get back to you as soon as possible. We value your input and are committed to providing the best possible service.
                        </p>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Frequently Asked Questions</h2>
                        <div className='space-y-4'>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>How do I get started with BookingCrown?</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    Getting started is easy! Simply sign up for an account on our website, and our team will review your profile. Once approved, you'll receive your login credentials via email and can start managing your bookings right away.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>What types of businesses can use BookingCrown?</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    BookingCrown is designed for a wide range of businesses including box cricket facilities, cafes, restaurants, event organizers, hotels, and any business that needs to manage appointments or reservations.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Is there customer support available?</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    Yes! We offer comprehensive customer support via email and phone. Our support team is available during business hours to help you with any questions or issues you may encounter.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Can I customize the booking system for my business?</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    Absolutely! BookingCrown offers flexible customization options to match your business needs. Contact us to discuss your specific requirements, and we'll help you configure the system accordingly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default ContactUs;

