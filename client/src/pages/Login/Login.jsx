import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/Auth";
import { useState } from "react";
import Footer from "../../common/Footer";
import { Form, Input, Button, Spin } from 'antd';
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
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <section className="flex items-center justify-center py-12 px-4 min-h-screen">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-center">
                    <div className="lg:col-span-6 md:col-span-6 hidden lg:flex justify-center">
                        <img
                            src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
                            alt=""
                            className="w-full h-[580px] max-w-[500px]"
                        />
                    </div>
                    <div className="lg:col-span-6 md:col-span-12 flex items-center justify-center md:p-0 p-6">
                        <div className="max-w-[700px] w-full bg-white rounded-md shadow p-6">
                            <div className="pb-6 text-center">
                                <h3 className="font-semibold text-2xl leading-normal mb-4">
                                    Sign In To Your Account
                                </h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Welcome back! Please sign in to access your account.
                                </p>
                            </div>
                            <div className="bg-white rounded-md md:p-6">
                                <Form
                                    name="login"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="max-w-lg mx-auto"
                                >
                                    <Form.Item
                                        label="Your Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { type: 'email', message: 'The input is not valid E-mail!' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Email"
                                            className="h-10"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Your Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password
                                            placeholder="Password"
                                            className="h-10"
                                        />
                                    </Form.Item>

                                    <div>
                                        <Link to="/forget-password" className="!text-themeColor hover:text-teal-700 font-semibold">
                                            Forget Password
                                        </Link>
                                    </div>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={`h-10 w-full tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? '!bg-[#0f766e]' : 'bg-teal-500'} text-white mt-5`}
                                            disabled={loading}
                                        >
                                            {loading && <Spin size="small" className="mr-2" />}
                                            {loading ? 'Signing in...' : 'Sign In'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-slate-600">
                                    Don't have an account? <Link to="/signup" className="text-teal-500 hover:text-teal-700 font-semibold">Register</Link>
                                </p>
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
