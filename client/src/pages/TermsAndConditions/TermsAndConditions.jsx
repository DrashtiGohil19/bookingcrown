import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

function TermsAndConditions() {
    return (
        <div>
            <Header />
            <section className='bg-[#f1fafb] min-h-screen pt-24'>
                <div className='container mx-auto px-4 md:px-8 py-12 max-w-4xl'>
                    <h1 className='text-3xl md:text-4xl font-bold text-themeColor mb-6'>Terms and Conditions</h1>
                    <p className='text-slate-600 mb-4'>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6'>
                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>1. Agreement to Terms</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                By accessing or using BookingCrown ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                These Terms apply to all visitors, users, and others who access or use the Service. Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>2. Description of Service</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                BookingCrown is a comprehensive booking management platform designed to help businesses manage their appointments, reservations, and customer bookings efficiently. Our Service includes:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Online booking management system for hourly and daily reservations</li>
                                <li>Customer information management and tracking</li>
                                <li>Dashboard for viewing and managing bookings</li>
                                <li>Automated notifications and confirmations</li>
                                <li>Income and expense tracking tools</li>
                                <li>Secure user authentication and access control</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>3. User Accounts and Registration</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                To access certain features of the Service, you must register for an account. When you register, you agree to:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Provide accurate, current, and complete information</li>
                                <li>Maintain and promptly update your account information</li>
                                <li>Maintain the security of your password and account</li>
                                <li>Accept responsibility for all activities that occur under your account</li>
                                <li>Notify us immediately of any unauthorized use of your account</li>
                            </ul>
                            <p className='text-slate-600 leading-relaxed mt-4'>
                                We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>4. Acceptable Use</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                You agree not to use the Service to:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon the rights of others, including intellectual property rights</li>
                                <li>Transmit any harmful, offensive, or inappropriate content</li>
                                <li>Attempt to gain unauthorized access to the Service or related systems</li>
                                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                                <li>Use automated systems to access the Service without permission</li>
                                <li>Collect or harvest information about other users without their consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>5. Booking and Payment Terms</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                When using our booking services:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>All bookings are subject to availability and confirmation</li>
                                <li>Booking rates and terms are set by individual service providers</li>
                                <li>Cancellation and refund policies vary by provider and booking type</li>
                                <li>You are responsible for providing accurate booking information</li>
                                <li>We act as an intermediary platform and are not responsible for the services provided by third-party businesses</li>
                            </ul>
                            <p className='text-slate-600 leading-relaxed mt-4'>
                                Any disputes regarding bookings, payments, or services must be resolved directly with the service provider. BookingCrown is not liable for the quality, safety, or delivery of services booked through our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>6. Intellectual Property</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                The Service and its original content, features, and functionality are owned by BookingCrown and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                You may not copy, modify, distribute, sell, or lease any part of our Service or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit those restrictions or you have our written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>7. Limitation of Liability</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                To the maximum extent permitted by law, BookingCrown shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Your use or inability to use the Service</li>
                                <li>Any conduct or content of third parties on the Service</li>
                                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                <li>Any other matter relating to the Service</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>8. Indemnification</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                You agree to defend, indemnify, and hold harmless BookingCrown and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any third-party right.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>9. Termination</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>10. Changes to Terms</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                            <p className='text-slate-600 leading-relaxed mt-4'>
                                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>11. Governing Law</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                These Terms shall be interpreted and governed by the laws of the jurisdiction in which BookingCrown operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>12. Contact Information</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                If you have any questions about these Terms and Conditions, please contact us:
                            </p>
                            <ul className='list-none text-slate-600 space-y-2'>
                                <li><strong>Email:</strong> <a href="mailto:bookingcrown8@gmail.com" className='text-themeColor hover:underline'>bookingcrown8@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+919998883603" className='text-themeColor hover:underline'>+91 99988 83603</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default TermsAndConditions;

