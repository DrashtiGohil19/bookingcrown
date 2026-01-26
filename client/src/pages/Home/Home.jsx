import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutUs from '../../assets/asset_9.webp'
import boxCricket from "../../assets/asset_4.jpg"
import rastuarant from "../../assets/asset_0.jpg"
import event from "../../assets/asset_8.jpg"
import hotel from "../../assets/asset_7.jpeg"
import '../../App.css'
import { MdDashboard, MdOutlineEventAvailable, MdSpeakerNotes } from 'react-icons/md'
import { IoPeople } from 'react-icons/io5'
import { FaLock, FaUserCheck } from 'react-icons/fa'
import { IoMdNotifications, IoMdSettings } from 'react-icons/io'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Contact from '../../common/Contact'

const events = [
    {
        id: 1,
        icon: <MdOutlineEventAvailable />,
        title: "Event Booking Management",
        description: "Easily schedule and manage events with our intuitive booking system. Select rates on an hourly or daily basis to suit your needs."
    },
    {
        id: 2,
        icon: <IoPeople />,
        title: "Customer Information Management",
        description: "Store and access all relevant customer details, ensuring that you have the information you need at your fingertips."
    },
    {
        id: 3,
        icon: <MdDashboard />,
        title: "Booking Dashboard",
        description: "View upcoming bookings, schedules, and more from a centralized dashboard. Manage bookings and reservations seamlessly."
    },
    {
        id: 4,
        icon: <FaLock />,
        title: "Secure Login & Registration",
        description: "Protect your data with secure login and registration processes, ensuring that your information remains safe and accessible only to authorized users."
    },
    {
        id: 5,
        icon: <IoMdNotifications />,
        title: "Automated Notifications",
        description: "Keep customers informed with automated booking confirmations, reminders, and updates, enhancing communication and satisfaction."
    }
]

const users = [
    {
        id: 1,
        title: "Box Cricket Owners",
        image: boxCricket,
        description: "Manage your cricket ground bookings by the hour or day, ensuring optimal utilization of your facility."
    },
    {
        id: 2,
        title: "Cafe Owners",
        image: rastuarant,
        description: "Schedule reservations and events at your cafe with ease, ensuring a smooth customer experience."
    },
    {
        id: 3,
        title: "Event Organizers",
        image: event,
        description: "Keep track of all your event bookings and manage schedules effortlessly, allowing you to focus on event execution."
    },
    {
        id: 4,
        title: "Hotel Managers",
        image: hotel,
        description: "Handle room reservations and customer details with our comprehensive booking system, ensuring a seamless stay for your guests."
    },
]

const about = [
    {
        id: 1,
        icon: <MdSpeakerNotes />,
        title: "Seamless Booking Management",
        description: "Effortlessly manage your bookings and schedules, allowing you to focus on providing excellent customer experiences."
    },
    {
        id: 2,
        icon: <FaUserCheck />,
        title: "User-Friendly Interface",
        description: "Our intuitive platform simplifies navigation, making it easy to manage bookings, track customer details, ensuring efficiency in your operations."
    },
    {
        id: 3,
        icon: <IoMdSettings />,
        title: "Advanced Features for Efficiency",
        description: "With features like real-time scheduling and customer tracking, BookingCrown simplifies your appointment management."
    }
]

function Home() {
    const location = useLocation()

    useEffect(() => {
        // Handle hash navigation when coming from other pages
        if (location.hash) {
            const hash = location.hash.substring(1) // Remove the # symbol
            setTimeout(() => {
                const element = document.getElementById(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        }
    }, [location.hash])

    return (
        <div>
            <Header />

            {/* Home section */}
            <section className='bg-customeBg home-main' id='home'>
                <div className="relative h-[550px] md:h-[650px] w-full">
                    {/* <img src={HeroImage} alt="Hero_Image" className="h-full w-full object-cover" /> */}
                    <div className="absolute px-12 md:px-20 sm:px-10 py-24 inset-0 bg-[#037164] opacity-75 flex items-center justify-center">
                        <div>
                            <h1 className="text-white text-center text-[24px] md:text-3xl lg:text-5xl lg:leading-normal font-bold mb-3">
                                Welcome to BookingCrown
                            </h1>
                            <p className='text-center text-[14px] md:text-[18px] text-white max-w-[870px]'>
                                The ultimate solution for all your booking needs.
                                Whether you're a box cricket owner, a cafe manager, a small event organizer, or a hotel booking manager, our platform is designed to simplify your scheduling process and manage customer bookings with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Home section */}

            {/* About section */}
            <section id='about' className='mx-auto px-12 md:px-20 sm:px-10 py-24 lg:py-20'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-semibold text-2xl leading-normal mb-4'>
                        About Us
                    </h3>
                    <p className='text-slate-400 text-[14px] md:text-[16px] max-w-2xl mx-auto'>
                        The ultimate solution for all your booking needs. Whether you're a box cricket owner, a cafe manager, a small event organizer, or a hotel booking manager, our platform is designed to simplify your scheduling process and manage customer bookings with ease.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-6 md:gap-6 gap-12">
                    <div>
                        <img src={AboutUs} alt="AboutUs" className='w-[90%] mx-auto h-full object-cover rounded-2xl' />
                    </div>
                    <div className='flex flex-wrap justify-between stepper-main'>
                        {about.map((item, i) => {
                            return (
                                <div key={i} className="flex items-start space-x-4 pb-6 relative">
                                    <div>
                                        <div className="bg-themeColor text-white p-4 rounded-full border-4 border-[#96e3da] text-[18px] relative z-[1]">
                                            <i>{item.icon}</i>
                                        </div>
                                        <div className="absolute left-[30px] h-full transform -translate-x-1/2 top-0 w-px bg-themeColor after-step"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold my-2">{item.title}</h4>
                                        <p className="text-[14px] text-slate-500 leading-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            {/* About section */}

            {/* Service section */}
            <section id='service' className='services-main h-full shadow-themeColor bg-[#f1fafb] mx-auto px-12 md:px-20 sm:px-10 py-24 lg:py-20' >
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-semibold text-2xl leading-normal mb-4'>
                        Our Services
                    </h3>
                    <p className='text-slate-400 text-[14px] md:text-[16px] max-w-xl mx-auto'>
                        At BookingCrown, we offer a comprehensive suite of services to help you manage your bookings efficiently
                    </p>
                </div>
                <div style={{ textAlign: 'center', margin: '24px 0' }}>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9954652290347538"
                        crossOrigin="anonymous"></script>
                    <ins className="adsbygoogle"
                        style={{
                            display: 'block'
                        }}
                        data-ad-client="ca-pub-9954652290347538"
                        data-ad-slot="1498043097"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script>
                        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                    </script>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-6">
                    {events.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={`group rounded-3xl shadow-lg relative bg-white p-6 overflow-hidden h-full text-center flex flex-col transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-3 min-h-[300px]`}
                            >
                                <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-transparent to-teal-500/20 text-teal-500 rounded-full group-hover:bg-teal-500/10 duration-500 mx-auto'>
                                    <i className='text-2xl'>{item.icon}</i>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold group-hover:duration-300 group-hover:text-teal-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 mt-3">
                                        {item.description}
                                    </p>
                                    <div className="mt-6">
                                        <button className="text-teal-500 hover:text-teal-600" type="button" onClick={() => {}}>
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* Service section */}

            {/* Usege section */}
            <section id='feature' className='bg-customeBg h-full mx-auto px-12 md:px-20 sm:px-10 py-24 lg:py-20'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-semibold text-2xl leading-normal mb-4'>
                        Who Can Use It
                    </h3>
                    <p className='text-slate-400 text-[14px] md:text-[16px] max-w-xl mx-auto'>
                        BookingCrown is designed for a wide range of users who need to manage bookings and schedules efficiently.
                    </p>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-6">
                    {users.map((item, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-md shadow bg-white h-[300px] transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-xl">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-themeColor opacity-0 group-hover:opacity-70 transition-opacity duration-500">
                            </div>
                            <div className="absolute bottom-[65px] left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-center">
                                <h3 className="text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-slate-200 mt-3 text-[15px]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Usege section */}

            {/* Contact section */}
            <section id='contact' className='h-full bg-[#f1fafb] contact-main mx-auto px-12 md:px-20 sm:px-10 py-24 lg:py-20'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-semibold text-2xl leading-normal mb-4'>
                        Get In Touch With Us
                    </h3>
                    <p className='text-slate-400 text-[14px] md:text-[16px] max-w-2xl mx-auto'>
                        We'd love to hear from you! If you have any questions, feedback, or need support, please don't hesitate to reach out to us. Our team is here to assist you and ensure that your experience with BookingCrown is nothing short of excellent.
                    </p>
                </div>
                <Contact />
                <div className='text-center mt-6 text-slate-400'>
                    <p>Feel free to contact us anytime, and we'll get back to you as soon as possible.</p>
                </div>
            </section>
            {/* Contact section */}
            <Footer />
        </div >
    )
}

export default Home
