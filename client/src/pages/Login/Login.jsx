import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/Auth";
import { useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { Form, Input, Button, Spin } from 'antd';
import { HiSparkles, HiMail, HiLockClosed } from 'react-icons/hi'
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa'
import "../../App.css"

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const data = await login(values.email, values.password)

            if (data.success) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("role", data.role)

                if (!data.access) {
                    navigate("/access-denied")
                } else {
                    form.resetFields()
                    if (data.role === "user") {
                        navigate("/user/dashboard")
                    } else if (data.role === "admin") {
                        navigate("/admin/dashboard")
                    }
                }
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
                                    <span className="text-sm font-semibold text-primaryPurple">Welcome Back</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primaryPurple via-primaryCyan to-primaryPurple bg-clip-text text-transparent">
                                    Sign In to Your Dashboard
                                </h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    Access your booking management system and continue growing your business with BookingCrown.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FaShieldAlt className="text-2xl text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Secure Login</h4>
                                        <p className="text-gray-600 text-sm">Bank-level security to protect your data and business information.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FaCheckCircle className="text-2xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Quick Access</h4>
                                        <p className="text-gray-600 text-sm">Get instant access to all your bookings, customers, and analytics.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <HiSparkles className="text-2xl text-primaryPurple" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">24/7 Availability</h4>
                                        <p className="text-gray-600 text-sm">Access your account anytime, anywhere. Your business never sleeps.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="flex items-center justify-center w-full">
                            <div className="w-full max-w-[500px] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primaryPurple to-primaryCyan rounded-2xl mb-4">
                                        <HiSparkles className="text-3xl text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Sign In</h2>
                                    <p className="text-gray-600">
                                        Welcome back! Please sign in to continue
                                    </p>
                                </div>

                                <Form
                                    name="login"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    form={form}
                                    className="w-full"
                                >
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

                                    <Form.Item
                                        label={<span className="font-semibold text-gray-700">Password</span>}
                                        name="password"
                                        rules={[{ required: true, message: 'Please enter your password!' }]}
                                    >
                                        <Input.Password
                                            prefix={<HiLockClosed className="text-gray-400" />}
                                            placeholder="Enter your password"
                                            className="h-12 rounded-xl border-2 border-gray-200 hover:border-primaryPurple focus:border-primaryPurple transition-colors"
                                        />
                                    </Form.Item>

                                    <div className="flex justify-end mb-6">
                                        <Link 
                                            to="/forget-password" 
                                            className="text-sm font-semibold bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Form.Item>
                                        <Button
                                            htmlType="submit"
                                            disabled={loading}
                                            className="w-full h-12 bg-gradient-to-r from-primaryPurple to-primaryCyan text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                                        >
                                            {loading ? (
                                                <>
                                                    <Spin size="small" className="mr-2" />
                                                    Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    <HiSparkles className="inline mr-2 text-xl" />
                                                    Sign In
                                                </>
                                            )}
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <div className="mt-6 text-center">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <Link 
                                            to="/signup" 
                                            className="font-semibold bg-gradient-to-r from-primaryPurple to-primaryCyan bg-clip-text text-transparent hover:underline"
                                        >
                                            Create Account
                                        </Link>
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <FaShieldAlt className="text-blue-500" />
                                            <span>Secure login</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>SSL encrypted</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <HiSparkles className="text-primaryPurple" />
                                            <span>24/7 access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Login;
