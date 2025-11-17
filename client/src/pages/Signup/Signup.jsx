import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowUpDownFill } from 'react-icons/ri'
import { Form, Input, Button, Select, Spin, Col, Row } from 'antd';
import { signup } from '../../api/Auth'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import io from 'socket.io-client';
import { HiSparkles, HiUser, HiMail, HiPhone, HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi'
import { FaCheckCircle } from 'react-icons/fa'
import "../../App.css"

const socket = io(process.env.REACT_APP_BACKEND_URL);

const { Option } = Select;

const business = [
    { id: 2, name: 'Box Cricket' },
    { id: 3, name: 'Cafe/Restuarant' },
    { id: 4, name: 'Hotel management' },
    { id: 5, name: 'Farm' },
]

function Signup() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        socket.emit('joinRoom', 'signupRoom');
        return () => {
            socket.off('joinRoom', 'signupRoom');
        };
    }, []);

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const data = await signup(values.name, values.mobilenu, values.email, values.businessType, values.businessName, values.address)
            if (data.success) {
                form.resetFields()
                socket.emit('userSignedUp');
                navigate("/signup-confirmation")
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Header />
            <section className="relative min-h-screen bg-gradient-to-br from-white via-[#f8fafb] to-[#f1fafb] py-12 px-4 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primaryPurple/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-primaryCyan/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-gradientEnd/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-200px)]">
                        {/* Left Side - Branding & Benefits */}
                        <div className="hidden lg:block space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryPurple/10 to-primaryCyan/10 px-4 py-2 rounded-full mb-6">
                                    <HiSparkles className="text-primaryPurple text-xl" />
                                    <span className="text-sm font-semibold text-primaryPurple">Start Your Free Trial</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primaryPurple via-primaryCyan to-primaryPurple bg-clip-text text-transparent">
                                    Join Thousands of Successful Businesses
                                </h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    Get started with BookingCrown in just 5 minutes. No credit card required. Start managing your bookings like a pro today.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FaCheckCircle className="text-2xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">14-Day Free Trial</h4>
                                        <p className="text-gray-600 text-sm">No credit card required. Full access to all features.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FaCheckCircle className="text-2xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Setup in 5 Minutes</h4>
                                        <p className="text-gray-600 text-sm">Get up and running quickly with our intuitive interface.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FaCheckCircle className="text-2xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                                        <p className="text-gray-600 text-sm">Our team is always here to help you succeed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Signup Form */}
                        <div className="flex items-center justify-center w-full">
                            <div className="w-full max-w-[600px] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primaryPurple to-primaryCyan rounded-2xl mb-4">
                                        <HiSparkles className="text-3xl text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Create Your Account</h2>
                                    <p className="text-gray-600">
                                        Start your journey with BookingCrown today
                                    </p>
                                </div>

                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    form={form}
                                    className="w-full"
                                >
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Full Name</span>}
                                                name="name"
                                                rules={[{ required: true, message: 'Please enter your name!' }]}
                                            >
                                                <Input
                                                    prefix={<HiUser className="text-gray-400" />}
                                                    placeholder="John Doe"
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Email Address</span>}
                                                name="email"
                                                rules={[
                                                    { required: true, message: 'Please enter your email!' },
                                                    { type: 'email', message: 'Please enter a valid email!' }
                                                ]}
                                            >
                                                <Input
                                                    prefix={<HiMail className="text-gray-400" />}
                                                    placeholder="john@example.com"
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Phone Number</span>}
                                                name="mobilenu"
                                                rules={[
                                                    { required: true, message: 'Please enter your phone number!' },
                                                    {
                                                        pattern: /^[0-9]{10}$/,
                                                        message: 'Phone must be exactly 10 digits!'
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    prefix={<HiPhone className="text-gray-400" />}
                                                    type="tel"
                                                    placeholder="9876543210"
                                                    maxLength={10}
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Business Type</span>}
                                                name="businessType"
                                                rules={[{ required: true, message: 'Please select business type!' }]}
                                            >
                                                <Select
                                                    placeholder="Select Business Type"
                                                    suffixIcon={<RiArrowUpDownFill className="text-gray-400" />}
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple"
                                                >
                                                    {business.map(item => (
                                                        <Option key={item.id} value={item.name}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Business Name</span>}
                                                name="businessName"
                                                rules={[{ required: true, message: 'Please enter business name!' }]}
                                            >
                                                <Input
                                                    prefix={<HiOfficeBuilding className="text-gray-400" />}
                                                    placeholder="Your Business Name"
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span className="font-semibold text-gray-700">Address</span>}
                                                name="address"
                                                rules={[{ required: true, message: 'Please enter your address!' }]}
                                            >
                                                <Input
                                                    prefix={<HiLocationMarker className="text-gray-400" />}
                                                    placeholder="Business Address"
                                                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item className="mt-6">
                                        <Button
                                            htmlType="submit"
                                            disabled={loading}
                                            className="w-full h-12 bg-gradient-to-r from-primaryPurple to-primaryCyan text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                                        >
                                            {loading ? (
                                                <>
                                                    <Spin size="small" className="mr-2" />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <HiSparkles className="inline mr-2 text-xl" />
                                                    Create Free Account
                                                </>
                                            )}
                                        </Button>
                                    </Form.Item>

                                    <div className="mt-6 text-center">
                                        <p className="text-gray-600">
                                            Already have an account?{' '}
                                            <Link 
                                                to="/login" 
                                                className="font-semibold bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent hover:underline"
                                            >
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FaCheckCircle className="text-green-500" />
                                                <span>No credit card required</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCheckCircle className="text-green-500" />
                                                <span>14-day free trial</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCheckCircle className="text-green-500" />
                                                <span>Cancel anytime</span>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Signup
