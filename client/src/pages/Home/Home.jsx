import React, { useState, useEffect, useRef } from 'react'
import AboutUs from '../../assets/asset_9.webp'
import boxCricket from "../../assets/asset_4.jpg"
import rastuarant from "../../assets/asset_0.jpg"
import event from "../../assets/asset_8.jpg"
import hotel from "../../assets/asset_7.jpeg"
import '../../App.css'
import lottie from 'lottie-web'
import { MdDashboard, MdOutlineEventAvailable, MdSpeakerNotes } from 'react-icons/md'
import { IoPeople } from 'react-icons/io5'
import { FaLock, FaUserCheck, FaTimes, FaCheckCircle } from 'react-icons/fa'
import { IoMdNotifications, IoMdSettings } from 'react-icons/io'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { FiTrendingUp, FiUsers, FiClock } from 'react-icons/fi'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Contact from '../../common/Contact'
import { useNavigate } from 'react-router-dom'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startTime = null;
                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Exit Intent Popup Component
const ExitIntentPopup = ({ onClose, onSignup }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative transform transition-all animate-scaleIn">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FaTimes />
                </button>
                <div className="text-center">
                    <HiSparkles className="text-5xl text-primaryPurple mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
                    <p className="text-gray-600 mb-6">Get 50% off your first 3 months + Extended 14-day free trial</p>
                    <div className="space-y-3">
                        <button
                            onClick={onSignup}
                            className="w-full bg-gradient-to-r from-primaryPurple to-primaryCyan text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            Claim Your Discount
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-gray-600 hover:text-gray-800"
                        >
                            No thanks, I'll pay full price
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sticky CTA Component
const StickyCTA = ({ onSignup, onDemo }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-40 p-4 md:hidden border-t-2 border-primaryPurple">
            <div className="flex gap-2 max-w-md mx-auto">
                <button
                    onClick={onSignup}
                    className="flex-1 bg-gradient-to-r from-primaryPurple to-primaryCyan text-white py-3 rounded-lg font-semibold text-sm"
                >
                    Start Free Trial
                </button>
                <button
                    onClick={onDemo}
                    className="flex-1 border-2 border-primaryPurple text-primaryPurple py-3 rounded-lg font-semibold text-sm"
                >
                    Watch Demo
                </button>
            </div>
        </div>
    );
};

const events = [
    {
        id: 1,
        icon: <MdOutlineEventAvailable />,
        title: "Stop Double-Bookings Forever",
        description: "Never miss a booking. Never lose a customer. Our intelligent system prevents conflicts automatically.",
        stat: "Save 15 hours/week"
    },
    {
        id: 2,
        icon: <IoPeople />,
        title: "Your Customers Book in 30 Seconds",
        description: "You get paid instantly. Streamlined booking process that converts visitors into customers.",
        stat: "340% more bookings"
    },
    {
        id: 3,
        icon: <MdDashboard />,
        title: "Everything You Need. Nothing You Don't.",
        description: "View upcoming bookings, schedules, and more from a centralized dashboard. Manage bookings seamlessly.",
        stat: "Setup in 5 minutes"
    },
    {
        id: 4,
        icon: <FaLock />,
        title: "Bank-Level Security",
        description: "Protect your data with secure login and registration processes. Your information remains safe.",
        stat: "99.9% uptime"
    },
    {
        id: 5,
        icon: <IoMdNotifications />,
        title: "Automated Everything",
        description: "Keep customers informed with automated booking confirmations, reminders, and updates.",
        stat: "Zero manual work"
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

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Box Cricket Owner, Mumbai",
        image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=6366F1&color=fff",
        text: "Increased bookings by 340% in just 3 months! The automated system is a game-changer.",
        rating: 5
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Cafe Manager, Delhi",
        image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=06B6D4&color=fff",
        text: "Saves me 15 hours every week. I can focus on my customers instead of managing spreadsheets.",
        rating: 5
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Event Organizer, Bangalore",
        image: "https://ui-avatars.com/api/?name=Amit+Patel&background=764ba2&color=fff",
        text: "Setup took 5 minutes. The ROI was immediate. Best investment I've made for my business.",
        rating: 5
    },
    {
        id: 4,
        name: "Kiran Shah",
        role: "Hotel Manager, Ahmedabad, Gujarat",
        image: "https://ui-avatars.com/api/?name=Kiran+Shah&background=10B981&color=fff",
        text: "Managing room bookings has never been easier. The system handles everything automatically, and our guests love the seamless experience.",
        rating: 5
    },
    {
        id: 5,
        name: "Ravi Desai",
        role: "Event Hall Owner, Surat, Gujarat",
        image: "https://ui-avatars.com/api/?name=Ravi+Desai&background=EF4444&color=fff",
        text: "We've doubled our bookings since using BookingCrown. The automated reminders ensure no-shows are a thing of the past.",
        rating: 5
    },
    {
        id: 6,
        name: "Meera Joshi",
        role: "Cafe Owner, Vadodara, Gujarat",
        image: "https://ui-avatars.com/api/?name=Meera+Joshi&background=F59E0B&color=fff",
        text: "Perfect for our cafe! Table reservations are now effortless, and we can focus on serving great food instead of managing bookings manually.",
        rating: 5
    }
];

// integrations list removed (unused). Re-add when enabling integrations showcase.

const faqs = [
   
    {
        question: "How long does setup take?",
        answer: "Most businesses are up and running in under 5 minutes. Our intuitive interface makes it incredibly simple."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. No long-term contracts. Cancel anytime with just one click. Your data remains yours."
    },
    {
        question: "What if I need help?",
        answer: "We offer 24/7 support via chat, email, and phone. Our team is here to ensure your success."
    },
    {
        question: "What types of businesses can use BookingCrown?",
        answer: "BookingCrown is perfect for a wide range of businesses including Box Cricket grounds, Cafes and Restaurants, Hotels, Event Halls, Farm stays, and any business that needs to manage bookings, reservations, or appointments. Whether you're managing hourly bookings, daily rentals, or event scheduling, our flexible system adapts to your business needs."
    },
    {
        question: "Do I need technical knowledge to use it?",
        answer: "Not at all! BookingCrown is designed to be user-friendly and intuitive. If you can use a smartphone or browse the internet, you can use BookingCrown. Our setup process takes just 5 minutes, and we provide step-by-step guidance. Plus, our 24/7 support team is always ready to help if you have any questions."
    }
];

function Home() {
    const navigate = useNavigate();
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [showDemo, setShowDemo] = useState(false);
    const [activeFAQ, setActiveFAQ] = useState(null);
    const [bookingsCount, setBookingsCount] = useState(247);
    const [liveActivity] = useState([
        "Sarah from Mumbai just created a booking",
        "Raj from Delhi completed setup",
        "Priya from Bangalore upgraded her plan"
    ]);
    const [currentActivity, setCurrentActivity] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [sliderValue, setSliderValue] = useState(100);
    const [savings, setSavings] = useState(() => {
        const hoursSaved = (100 * 0.5);
        return Math.round(hoursSaved * 200 * 12);
    });
    const [allowMotion, setAllowMotion] = useState(true);
    // Lottie animation URL (override with env var if you want your own)
    // Reverted to the earlier, smoother Lottie that looked best for the hero.
    const lottieUrl = process.env.REACT_APP_HERO_LOTTIE || 'https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json';
    const lottieContainer = useRef(null);
    // Use a small demo video by default as a fallback when Lottie/motion not allowed.
    const heroVideo = process.env.REACT_APP_HERO_VIDEO || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
    // Toggle to use video instead of Lottie (set REACT_APP_USE_HERO_VIDEO=true to enable)
    const useHeroVideo = process.env.REACT_APP_USE_HERO_VIDEO === 'true';

    // Exit intent detection (respect session dismissal)
    useEffect(() => {
        const handleMouseLeave = (e) => {
            try {
                const dismissed = sessionStorage.getItem('exitPopupDismissed');
                if (dismissed) return;
            } catch (err) {
                // ignore storage errors
            }
            if (e.clientY <= 0 && !showExitPopup) {
                setShowExitPopup(true);
            }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [showExitPopup]);

    // Live activity rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentActivity((prev) => (prev + 1) % liveActivity.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [liveActivity.length]);

    // Testimonials carousel auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % 6); // 6 testimonials total
        }, 5000); // Change testimonial every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Simulate booking counter
    useEffect(() => {
        const interval = setInterval(() => {
            setBookingsCount((prev) => prev + Math.floor(Math.random() * 3));
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Load Lottie animation if motion allowed — minimalistic behaviour
    useEffect(() => {
        // Only load the animation if motion is allowed and viewport is desktop
        const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
        if (!allowMotion || !isDesktop) return;
        if (!lottieContainer.current) return;
        let anim;
        try {
            anim = lottie.loadAnimation({
                container: lottieContainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: lottieUrl,
                rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
            });
            // reduce animation speed for a minimal, calm background
            try { anim.setSpeed && anim.setSpeed(0.55); } catch (e) {}
            // set low visual prominence
            if (lottieContainer.current) {
                lottieContainer.current.style.opacity = '0.28';
                lottieContainer.current.style.pointerEvents = 'none';
                lottieContainer.current.style.filter = 'saturate(0.9) blur(0.5px)';
            }
        } catch (e) {
            console.warn('Lottie load failed', e);
        }
        return () => {
            try { anim && anim.destroy(); } catch (e) {}
        };
    }, [allowMotion, lottieUrl]);

    // Respect user's reduced motion preference
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            setAllowMotion(!mq.matches);
            const handler = () => setAllowMotion(!mq.matches);
            try {
                mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
            } catch (e) {}
            return () => {
                try {
                    mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
                } catch (e) {}
            };
        }
    }, []);

    // Pricing calculator (React state-based)
    useEffect(() => {
        const hoursSaved = (sliderValue * 0.5); // 30 min per booking
        const calcSavings = Math.round(hoursSaved * 200 * 12); // ₹200/hour * 12 months
        setSavings(calcSavings);
    }, [sliderValue]);

    const handleSignup = () => {
        navigate('/signup');
        try { sessionStorage.setItem('exitPopupDismissed', '1'); } catch (e) {}
        setShowExitPopup(false);
    };

    const handleDemo = () => {
        setShowDemo(true);
    };

    const closeDemo = () => {
        setShowDemo(false);
    };

    // Close exit popup and persist dismissal for this session
    const closeExitPopup = () => {
        try { sessionStorage.setItem('exitPopupDismissed', '1'); } catch (e) {}
        setShowExitPopup(false);
    };

    return (
        <div className="relative">
            <Header />

            {/* Hero Section - TRANSFORMED */}
            <section className='relative h-[600px] md:h-[700px] w-full overflow-hidden' id='home'>
                {/* Video/Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primaryPurple via-gradientStart to-gradientEnd">
                    {/* If motion allowed, render the background video; otherwise fallback to gradient + blobs */}
                    {allowMotion ? (
                        useHeroVideo ? (
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                aria-hidden="true"
                                poster="/videos/hero-poster.svg"
                                style={{ opacity: 0.28, pointerEvents: 'none', filter: 'saturate(0.9) blur(0.5px)' }}
                            >
                                <source src={heroVideo} type="video/mp4" />
                            </video>
                        ) : (
                            // Lottie animation container (responsive)
                            <div ref={lottieContainer} className="absolute inset-0 w-full h-full" aria-hidden="true" />
                        )
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-black opacity-20"></div>
                            <div className="absolute inset-0">
                                <div className="absolute top-20 left-10 w-72 h-72 bg-primaryCyan rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                                <div className="absolute top-40 right-10 w-72 h-72 bg-primaryPurple rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradientEnd rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                            </div>
                        </>
                    )}
                    {/* translucent overlay to keep text readable */}
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-20">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Trust Indicators */}
                        <div className="mb-6 flex flex-wrap justify-center gap-4 text-white/90 text-sm">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <FiUsers className="text-primaryCyan" />
                                <span>Trusted by <AnimatedCounter end={10000} />+ businesses</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <FiTrendingUp className="text-primaryCyan" />
                                <span>Join <AnimatedCounter end={bookingsCount} /> businesses this week</span>
                            </div>
                        </div>

                        {/* Power Headline */}
                        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Turn Every Booking Into Revenue in Under 60 Seconds
                        </h1>
                        
                        <p className='text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto'>
                            Never miss a booking. Never lose a customer. Your customers book in 30 seconds. Every booking and payment is securely recorded track customers and earnings effortlessly.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <button
                                onClick={handleSignup}
                                className="group bg-white text-primaryPurple px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                aria-label="Start free trial — 14 days no credit card"
                            >
                                Start Free Trial
                                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Friction Reducers */}
                        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-primaryCyan" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-primaryCyan" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-primaryCyan" />
                                <span>Setup in 5 minutes</span>
                            </div>
                        </div>

                        {/* Live Activity Feed */}
                        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                            <div className="flex items-center gap-2 text-white/90" role="status" aria-live="polite">
                                <div className="w-2 h-2 bg-primaryCyan rounded-full animate-pulse" aria-hidden="true"></div>
                                <span className="text-sm">{liveActivity[currentActivity]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem-Solution Section - FRIENDLY, RESPONSIVE */}
            <section className='bg-gradient-to-br from-gray-50 to-white py-20 px-4 md:px-20'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-8'>
                        <h2 className='text-3xl md:text-4xl font-semibold mb-3'>
                            Tired of managing bookings in spreadsheets?
                        </h2>
                        <p className='text-slate-600 max-w-2xl mx-auto'>
                            Manual booking processes cost time and customers. Here’s how BookingCrown makes that simple — and stress-free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                                <span className="text-2xl">✖</span>
                                The old way — painful and slow
                            </h3>
                            <ul className="space-y-4 text-left text-gray-700">
                                <li className="flex items-start gap-3">
                                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Double-bookings and scheduling headaches.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Time wasted on manual entry and chasing customers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Missed revenue from avoidable mistakes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>No real-time availability or easy reporting.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                                <span className="text-2xl">✔</span>
                                With BookingCrown — simple and reliable
                            </h3>
                            <ul className="space-y-4 text-left text-gray-700">
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Automatic conflict prevention — no more double-bookings.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Hands-off automation: confirmations, reminders, and payments.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Easy setup and an intuitive dashboard for daily operations.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span>Works for cricket grounds, cafes, events, hotels — and more.</span>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <button onClick={handleSignup} className="bg-gradient-to-r from-primaryPurple to-primaryCyan text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg">
                                    Try it free — 14 days
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About section - ENHANCED */}
            <section id='about' className='mx-auto px-4 md:px-20 py-24 lg:py-20 bg-white'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-bold text-3xl md:text-4xl leading-normal mb-4 bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent'>
                        About Us
                    </h3>
                    <p className='text-slate-600 text-[16px] md:text-[18px] max-w-2xl mx-auto'>
                        Everything you need. Nothing you don't. BookingCrown transforms how businesses manage bookings, turning every interaction into revenue.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-6 md:gap-6 gap-12 max-w-6xl mx-auto">
                        <div className="transform hover:scale-105 transition-transform duration-300">
                        <img src={AboutUs} alt="Team using BookingCrown to manage bookings and customers" className='w-full h-full object-cover rounded-2xl shadow-xl' loading="lazy" />
                    </div>
                    <div className='flex flex-wrap justify-between stepper-main'>
                        {[
                            {
                                icon: <MdSpeakerNotes />,
                                title: "Seamless Booking Management",
                                description: "Effortlessly manage your bookings and schedules, allowing you to focus on providing excellent customer experiences."
                            },
                            {
                                icon: <FaUserCheck />,
                                title: "User-Friendly Interface",
                                description: "Our intuitive platform simplifies navigation, making it easy to manage bookings, track customer details, ensuring efficiency in your operations."
                            },
                            {
                                icon: <IoMdSettings />,
                                title: "Everything You Need. Nothing You Don't.",
                                description: "With features like real-time scheduling and customer tracking, BookingCrown simplifies your appointment management."
                            }
                        ].map((item, i) => {
                            return (
                                <div key={i} className="flex items-start space-x-4 pb-6 relative group">
                                    <div>
                                        <div className="bg-gradient-to-r from-primaryPurple to-primaryCyan text-white p-4 rounded-full border-4 border-primaryCyan/30 text-[18px] relative z-[1] transform group-hover:scale-110 transition-transform duration-300">
                                            <i>{item.icon}</i>
                                        </div>
                                        <div className="absolute left-[30px] h-full transform -translate-x-1/2 top-0 w-px bg-gradient-to-b from-primaryPurple to-primaryCyan after-step"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold my-2 group-hover:text-primaryPurple transition-colors">{item.title}</h4>
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

            {/* Service section - ENHANCED */}
            <section id='service' className='services-main h-full shadow-themeColor bg-gradient-to-br from-[#f1fafb] to-white mx-auto px-4 md:px-20 py-24 lg:py-20' >
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-bold text-3xl md:text-4xl leading-normal mb-4 bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent'>
                        Our Services
                    </h3>
                    <p className='text-slate-600 text-[16px] md:text-[18px] max-w-xl mx-auto'>
                        Stop Double-Bookings Forever. Your customers book in 30 seconds. You get paid instantly.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-6 max-w-6xl mx-auto">
                    {events.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={`group rounded-3xl shadow-lg relative bg-white p-6 overflow-hidden h-full text-center flex flex-col transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-3 min-h-[320px] border-2 border-transparent hover:border-primaryPurple/20`}
                            >
                                {/* Stat Overlay */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-primaryPurple to-primaryCyan text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {item.stat}
                                </div>
                                
                                <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primaryPurple/10 to-primaryCyan/10 text-primaryPurple rounded-full group-hover:bg-gradient-to-r group-hover:from-primaryPurple group-hover:to-primaryCyan group-hover:text-white duration-500 mx-auto transform group-hover:scale-110 transition-all'>
                                    <i className='text-2xl'>{item.icon}</i>
                                </div>
                                <div className="mt-6">
                                    <button onClick={() => {}} className="text-left text-lg font-semibold group-hover:duration-300 group-hover:text-primaryPurple transition-colors block mb-3">
                                        {item.title}
                                    </button>
                                    <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Social Proof Section - NEW */}
            <section className='bg-white py-24 px-4 md:px-20'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h3 className='font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent'>
                            Trusted by Thousands
                        </h3>
                        <p className='text-slate-600'>See what our customers are saying</p>
                    </div>
                    
                    {/* Testimonials Carousel */}
                    <div className="relative mb-16 overflow-hidden">
                        {/* Navigation Arrows */}
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Previous testimonial"
                        >
                            <BsArrowLeft className="text-2xl text-primaryPurple" />
                        </button>
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Next testimonial"
                        >
                            <BsArrowRight className="text-2xl text-primaryPurple" />
                        </button>

                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <div 
                                    key={testimonial.id} 
                                    className="min-w-full px-4 md:px-8"
                                >
                                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                                        <div className="flex items-center gap-2 mb-4 justify-center">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-yellow-400 text-xl">⭐</span>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-6 italic text-center text-lg md:text-xl">"{testimonial.text}"</p>
                                        <div className="flex items-center gap-3 justify-center">
                                            <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full" loading="lazy" />
                                            <div className="text-center md:text-left">
                                                <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Carousel Indicators */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentTestimonial === index 
                                            ? 'w-8 bg-primaryPurple' 
                                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-primaryPurple to-primaryCyan rounded-2xl text-white transform hover:scale-105 transition-transform">
                            <FiUsers className="text-4xl mx-auto mb-4" />
                            <div className="text-4xl font-bold mb-2">
                                <AnimatedCounter end={10000} />+
                            </div>
                            <p className="text-white/90">Active Businesses</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-primaryCyan to-primaryPurple rounded-2xl text-white transform hover:scale-105 transition-transform">
                            <FiTrendingUp className="text-4xl mx-auto mb-4" />
                            <div className="text-4xl font-bold mb-2">
                                <AnimatedCounter end={340} />%
                            </div>
                            <p className="text-white/90">Average Booking Increase</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-gradientStart to-gradientEnd rounded-2xl text-white transform hover:scale-105 transition-transform">
                            <FiClock className="text-4xl mx-auto mb-4" />
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <p className="text-white/90">Hours Saved Per Week</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Usege section - ENHANCED */}
            <section id='feature' className='bg-gradient-to-br from-gray-50 to-white h-full mx-auto px-4 md:px-20 py-24 lg:py-20'>
                <div className='grid grid-cols-1 pb-6 text-center'>
                    <h3 className='font-bold text-3xl md:text-4xl leading-normal mb-4 bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent'>
                        Who Can Use It
                    </h3>
                    <p className='text-slate-600 text-[16px] md:text-[18px] max-w-xl mx-auto'>
                        BookingCrown is designed for a wide range of users who need to manage bookings and schedules efficiently.
                    </p>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-6 max-w-6xl mx-auto">
                    {users.map((item, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-[300px] transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primaryPurple via-primaryPurple/70 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <button className="text-left text-lg font-semibold block mb-2" onClick={() => {}}>
                                    {item.title}
                                </button>
                                <p className="text-white/90 text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Integration section removed as it's currently unused */}

            {/* Pricing Calculator - NEW */}
            <section className='bg-gradient-to-br from-primaryPurple to-primaryCyan py-24 px-4 md:px-20'>
                <div className='max-w-4xl mx-auto text-center text-white'>
                    <h3 className='font-bold text-3xl md:text-4xl mb-4'>
                        Calculate Your ROI
                    </h3>
                    <p className='mb-12 text-white/90'>See how much you'll save with BookingCrown</p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                        <div className="mb-6">
                            <label htmlFor="bookingSlider" className="block text-left mb-2 text-white font-medium">How many bookings per month?</label>
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={sliderValue}
                                onChange={(e) => setSliderValue(Number(e.target.value))}
                                className="w-full"
                                id="bookingSlider"
                                aria-label="Bookings per month"
                            />
                            <div className="flex justify-between text-sm text-white/80 mt-2">
                                <span>10</span>
                                <span className="font-bold text-lg" id="bookingValue">{sliderValue.toLocaleString('en-IN')}</span>
                                <span>1000+</span>
                            </div>
                        </div>
                        <div className="text-4xl font-bold mb-2">
                            You'll save ₹<span id="savings">{savings.toLocaleString('en-IN')}</span> per year
                        </div>
                        <p className="text-white/80">Based on 30 minutes saved per booking at ₹200/hour</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section - NEW */}
            <section className='bg-white py-24 px-4 md:px-20'>
                <div className='max-w-3xl mx-auto'>
                    <h3 className='font-bold text-3xl md:text-4xl mb-4 text-center bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent'>
                        Concerns We've Heard
                    </h3>
                    <p className='text-center text-slate-600 mb-12'>Everything you need to know</p>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    aria-expanded={activeFAQ === i}
                                    aria-controls={`faq-panel-${i}`}
                                >
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    <span className={`transform transition-transform ${activeFAQ === i ? 'rotate-180' : ''}`} aria-hidden="true">
                                        ▼
                                    </span>
                                </button>
                                {activeFAQ === i && (
                                    <div id={`faq-panel-${i}`} className="p-6 bg-gray-50 text-gray-700 animate-fadeIn">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section - FOMO - NEW */}
            <section className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-4 md:px-20 relative overflow-hidden'>
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primaryPurple rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                </div>
                <div className='max-w-4xl mx-auto text-center relative z-10'>
                    <HiSparkles className="text-6xl text-primaryCyan mx-auto mb-6" />
                    <h3 className='font-bold text-4xl md:text-5xl mb-6 text-white'>
                        Join the Booking Revolution
                    </h3>
                    <p className='text-xl text-gray-300 mb-8'>
                        50% off for next 100 signups - <span className="text-primaryCyan font-bold">23 spots left</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleSignup}
                                className="bg-gradient-to-r from-primaryPurple to-primaryCyan text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                aria-label="Start your free trial now — 14 day free trial"
                        >
                            Start Your Free Trial Now
                        </button>
                        {/* Secondary demo CTA removed to reduce unused code */}
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-primaryCyan" />
                            <span>14-day free trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-primaryCyan" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-primaryCyan" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Modal (opened by See It in Action) */}
            {showDemo && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden relative">
                        <button onClick={closeDemo} aria-label="Close demo" className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md">
                            ✕
                        </button>
                        <div className="w-full h-0 pb-[56.25%] relative"> {/* 16:9 container */}
                            <iframe
                                title="BookingCrown demo"
                                src="https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <div className="p-4 border-t text-sm text-gray-600">
                            <div className="max-w-3xl mx-auto">
                                <p className="mb-2 font-semibold">See BookingCrown in action</p>
                                <p>Watch a short 2-minute walkthrough showing how bookings, reminders, and payments work together to save you time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact section - ENHANCED */}
            <section id='contact' className='relative h-full bg-gradient-to-br from-white via-[#f8fafb] to-[#f1fafb] contact-main mx-auto px-4 md:px-20 py-24 lg:py-32 overflow-hidden'>
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primaryPurple/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-primaryCyan/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-gradientEnd/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className='relative z-10 max-w-7xl mx-auto'>
                    {/* Header Section */}
                    <div className='text-center mb-16'>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryPurple/10 to-primaryCyan/10 px-4 py-2 rounded-full mb-6">
                            <HiSparkles className="text-primaryPurple text-xl" />
                            <span className="text-sm font-semibold text-primaryPurple">We're Here to Help</span>
                        </div>
                        <h3 className='font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 bg-gradient-to-r from-primaryPurple via-primaryCyan to-primaryPurple bg-clip-text text-transparent animate-gradient'>
                            Get In Touch With Us
                        </h3>
                        <p className='text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
                            Have questions? Need support? Want to learn more? Our team is ready to help you succeed. 
                            <span className="block mt-2 text-primaryPurple font-semibold">Reach out today and let's start a conversation!</span>
                        </p>
                    </div>

                    {/* Contact Component */}
                    <Contact />

                    {/* Bottom Trust Message */}
                    <div className='mt-16 text-center'>
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-gray-700 font-medium">We typically respond within</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent">24 hours</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Exit Intent Popup */}
            {showExitPopup && (
                <ExitIntentPopup onClose={closeExitPopup} onSignup={handleSignup} />
            )}

            {/* Sticky Mobile CTA */}
            <StickyCTA onSignup={handleSignup} onDemo={handleDemo} />
        </div>
    )
}

export default Home
