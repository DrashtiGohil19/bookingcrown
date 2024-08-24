import React from 'react'
import { useState } from "react";
import Footer from "../../common/Footer";
import { Form, Input, Button, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { forgetPassword } from '../../api/Auth';

function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const response = await forgetPassword(values.email)
            if (response) {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <section className="flex items-center justify-center px-4 min-h-screen">
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
                                    Forgot Your Password
                                </h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Lost your password? Please enter your registered email address. You will receive new strong password via email.
                                </p>
                            </div>
                            <div className="bg-white rounded-md p-6">
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

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={`h-10 w-full tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? '!bg-[#0f766e] !text-white' : 'bg-teal-500'} text-white mt-5`}
                                            disabled={loading}
                                        >
                                            {loading && <Spin size="small" className="mr-2" />}
                                            {loading ? 'Sending New Password...' : 'Send New Password'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ForgetPassword
