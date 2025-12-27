import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import AboutUsImage from '../../assets/asset_9.webp';
import { MdSpeakerNotes } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const aboutFeatures = [
    {
        id: 1,
        icon: <MdSpeakerNotes />,
        title: "Seamless Booking Management",
        description: "Effortlessly manage your bookings and schedules, allowing you to focus on providing excellent customer experiences. Our intuitive system handles everything from hourly to daily bookings, making it easy to track and organize your reservations."
    },
    {
        id: 2,
        icon: <FaUserCheck />,
        title: "User-Friendly Interface",
        description: "Our intuitive platform simplifies navigation, making it easy to manage bookings, track customer details, and monitor your business operations. Whether you're tech-savvy or new to booking systems, you'll find our interface straightforward and efficient."
    },
    {
        id: 3,
        icon: <IoMdSettings />,
        title: "Advanced Features for Efficiency",
        description: "With features like real-time scheduling, customer tracking, automated notifications, and comprehensive reporting, BookingCrown simplifies your appointment management and helps you run your business more effectively."
    }
];

function AboutUs() {
    return (
        <div>
            <Header />
            <section className='bg-[#f1fafb] min-h-screen pt-24'>
                <div className='container mx-auto px-4 md:px-8 py-12 max-w-6xl'>
                    <div className='text-center mb-12'>
                        <h1 className='text-3xl md:text-4xl font-bold text-themeColor mb-4'>About BookingCrown</h1>
                        <p className='text-slate-600 text-lg max-w-3xl mx-auto'>
                            The ultimate solution for all your booking needs. Whether you're a box cricket owner, a cafe manager, a small event organizer, or a hotel booking manager, our platform is designed to simplify your scheduling process and manage customer bookings with ease.
                        </p>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 mb-8'>
                        <div className='grid md:grid-cols-2 gap-8 items-center'>
                            <div>
                                <img src={AboutUsImage} alt="About BookingCrown" className='w-full h-auto rounded-lg object-cover' />
                            </div>
                            <div>
                                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Our Mission</h2>
                                <p className='text-slate-600 leading-relaxed mb-4'>
                                    At BookingCrown, we believe that managing bookings shouldn't be complicated. Our mission is to provide businesses of all sizes with a powerful, yet easy-to-use platform that streamlines their booking operations and helps them focus on what matters most—delivering exceptional service to their customers.
                                </p>
                                <p className='text-slate-600 leading-relaxed mb-4'>
                                    We understand that every business is unique, which is why we've designed our platform to be flexible and adaptable. Whether you're managing a small cafe with a few tables or a large event venue with multiple spaces, BookingCrown scales to meet your needs.
                                </p>
                                <p className='text-slate-600 leading-relaxed'>
                                    Our team is committed to continuous improvement, regularly updating our platform with new features and enhancements based on user feedback. We're not just a booking system—we're your partner in business success.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 mb-8'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Why Choose BookingCrown?</h2>
                        <div className='grid md:grid-cols-3 gap-6'>
                            {aboutFeatures.map((feature) => (
                                <div key={feature.id} className='text-center p-6 rounded-lg bg-[#f1fafb] hover:shadow-lg transition-shadow'>
                                    <div className='flex justify-center mb-4'>
                                        <div className='bg-themeColor text-white p-4 rounded-full text-2xl'>
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className='text-xl font-semibold text-gray-800 mb-3'>{feature.title}</h3>
                                    <p className='text-slate-600 leading-relaxed'>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Our Story</h2>
                        <div className='space-y-4 text-slate-600 leading-relaxed'>
                            <p>
                                BookingCrown was founded with a simple vision: to make booking management accessible and efficient for businesses everywhere. We recognized that many businesses, especially small and medium-sized enterprises, were struggling with outdated booking methods—pen and paper, spreadsheets, or fragmented systems that didn't communicate with each other.
                            </p>
                            <p>
                                Our founders, having experienced these challenges firsthand in the hospitality and event management industries, set out to create a comprehensive solution that would address these pain points. After extensive research and development, BookingCrown was born—a platform that combines powerful functionality with intuitive design.
                            </p>
                            <p>
                                Today, BookingCrown serves hundreds of businesses across various industries, from box cricket facilities and cafes to event organizers and hotel managers. We're proud of the trust our users place in us and remain committed to helping them succeed.
                            </p>
                            <p>
                                As we continue to grow, we're constantly innovating and expanding our features to meet the evolving needs of our users. Our dedicated support team is always ready to help, ensuring that you get the most out of our platform.
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 mt-8'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Our Values</h2>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Customer-Centric</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    Our users are at the heart of everything we do. We listen to your feedback, understand your needs, and continuously improve our platform to serve you better.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Innovation</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    We stay ahead of the curve by embracing new technologies and methodologies that can enhance your booking management experience.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Reliability</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    You can count on us. Our platform is built with robust infrastructure to ensure high availability and data security for your business operations.
                                </p>
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Simplicity</h3>
                                <p className='text-slate-600 leading-relaxed'>
                                    We believe powerful tools don't have to be complicated. Our intuitive interface makes it easy for anyone to manage bookings effectively.
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

export default AboutUs;

