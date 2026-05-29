import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/Auth";
import { useState } from "react";
import Footer from "../../common/Footer";
import { Form, Input, Button, Spin } from 'antd';
import "../../App.css"
import Seo from "../../common/Seo";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const data = await login(values.email, values.password)

            if (data?.success) {
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
            <Seo
                title="Log In"
                description="Log in to your BookingCrown account."
                path="/login"
                robots="noindex,nofollow"
            />
            <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
                <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-12">
                    <div className="lg:col-span-6 md:col-span-6 hidden lg:flex justify-center">
                        <img
                            src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
                            alt="Booking access illustration"
                            className="h-auto max-h-[580px] w-full max-w-[500px]"
                        />
                    </div>
                    <div className="flex items-center justify-center md:col-span-12 lg:col-span-6">
                        <div className="w-full max-w-[520px] rounded-md bg-white p-5 shadow sm:p-6">
                            <div className="pb-6 text-center">
                                <h3 className="font-semibold text-2xl leading-normal mb-4">
                                    Sign In To Your Account
                                </h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Welcome back! Please sign in to access your account.
                                </p>
                            </div>
                            <div className="rounded-md bg-white md:p-6">
                                <Form
                                    name="login"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="mx-auto max-w-lg"
                                >
                                    <Form.Item
                                        label="Email or Mobile"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please input your email or mobile number!' },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Email or Mobile"
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
                                        <Link to="/forget-password" className="!text-themeColor hover:text-themeDark font-semibold">
                                            Forget Password
                                        </Link>
                                    </div>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={`h-10 w-full tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? '!bg-themeDark' : 'bg-themeColor'} text-white mt-5`}
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
                                    Don't have an account? <Link to="/signup" className="text-themeColor hover:text-themeDark font-semibold">Register</Link>
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
