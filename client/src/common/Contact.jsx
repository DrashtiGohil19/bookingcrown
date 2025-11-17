import React, { useState } from 'react'
import { IoCall, IoLocationSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { createLead } from '../api/Lead'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await createLead(formData);
            if (response && response.success) {
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            }
        } catch (error) {
            // Error is already handled in the API call with notification
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: <MdEmail className='text-3xl' />,
            title: 'Email Us',
            description: 'Send us an email anytime',
            value: 'bookingcrown8@gmail.com',
            link: 'mailto:bookingcrown8@gmail.com',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100'
        },
        {
            icon: <IoCall className='text-3xl' />,
            title: 'Call Us',
            description: 'Mon - Sat, 9:00 AM - 6:00 PM',
            value: '+91 99988 83603',
            link: 'tel:+919998883603',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
            iconBg: 'bg-green-100'
        },
        {
            icon: <FaWhatsapp className='text-3xl' />,
            title: 'WhatsApp',
            description: 'Quick response guaranteed',
            value: '+91 99988 83603',
            link: 'https://wa.me/919998883603',
            color: 'from-emerald-500 to-teal-500',
            bgColor: 'bg-emerald-50',
            iconBg: 'bg-emerald-100'
        },
        {
            icon: <IoLocationSharp className='text-3xl' />,
            title: 'Office Hours',
            description: 'We\'re here to help',
            value: 'Mon - Sat: 9 AM - 6 PM',
            link: '#',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
            iconBg: 'bg-purple-100'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto mt-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Contact Methods */}
                <div className="space-y-6">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <HiSparkles className="text-3xl text-primaryPurple" />
                            <h4 className="text-2xl font-bold text-gray-900">Multiple Ways to Reach Us</h4>
                        </div>
                        <p className="text-gray-600">Choose the method that works best for you. We typically respond within 24 hours.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.link}
                                target={method.link.startsWith('http') ? '_blank' : '_self'}
                                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Gradient Background Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                
                                <div className="relative z-10">
                                    <div className={`${method.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-gray-700`}>
                                        {method.icon}
                                    </div>
                                    <h5 className="font-bold text-gray-900 mb-1 group-hover:text-primaryPurple transition-colors">
                                        {method.title}
                                    </h5>
                                    <p className="text-xs text-gray-500 mb-2">{method.description}</p>
                                    <p className={`text-sm font-semibold bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                                        {method.value}
                                    </p>
                                </div>
                                
                                {/* Hover Arrow */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform`}>
                                        →
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Response Time Badge */}
                    <div className="bg-gradient-to-r from-primaryPurple/10 to-primaryCyan/10 rounded-xl p-4 border border-primaryPurple/20">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="font-semibold text-gray-900">Average Response Time</p>
                                <p className="text-sm text-gray-600">Less than 24 hours • We're here to help!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="mb-6">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <HiSparkles className="text-primaryPurple" />
                            Send Us a Message
                        </h4>
                        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primaryPurple focus:ring-2 focus:ring-primaryPurple/20 outline-none transition-all bg-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{10}"
                                minLength="10"
                                maxLength="10"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primaryPurple focus:ring-2 focus:ring-primaryPurple/20 outline-none transition-all bg-white"
                                placeholder="9876543210"
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primaryPurple focus:ring-2 focus:ring-primaryPurple/20 outline-none transition-all bg-white"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primaryPurple focus:ring-2 focus:ring-primaryPurple/20 outline-none transition-all bg-white resize-none"
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-primaryPurple to-primaryCyan text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <HiSparkles className="text-xl" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            We'll get back to you within 24 hours
                        </p>
                    </form>

                    {/* Trust Indicators */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Secure & Private</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>Quick Response</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
