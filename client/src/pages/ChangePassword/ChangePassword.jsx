import React, { useState } from 'react'
import Footer from '../../common/Footer'
import { Form, Input, Button, Spin } from 'antd';
import { changePassword } from '../../api/Auth';
import { useNavigate } from 'react-router-dom'
import Seo from '../../common/Seo';

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        const data = await changePassword(values)
        if (data.success) {
            navigate("/user/profile")
        }
        setLoading(false)
    };
    return (
        <div>
            <Seo
                title="Change Password"
                description="Change your BookingCrown account password."
                path="/change-password"
                robots="noindex,nofollow"
            />
            <section className="flex items-center justify-center py-12 px-4 min-h-screen">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-center">
                    <div className="lg:col-span-6 md:col-span-6 hidden lg:flex justify-center">
                        <img
                            src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
                            alt="Password update illustration"
                            className="w-full h-[580px] max-w-[500px]"
                        />
                    </div>
                    <div className="lg:col-span-6 md:col-span-12 flex items-center justify-center md:p-0 p-6">
                        <div className="max-w-[700px] w-full bg-white rounded-md shadow p-6">
                            <div className="pb-6 text-center">
                                <h3 className="font-semibold text-2xl leading-normal mb-4">
                                    Change Password
                                </h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Update your password to keep your BookingCrown account secure.
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
                                        label="Current Password"
                                        name="currentPassword"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password
                                            placeholder="Password"
                                            className="h-10 bg-transparent rounded border-gray-300 focus:border-themeColor"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="New Password"
                                        name="newPassword"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password
                                            placeholder="Password"
                                            className="h-10 bg-transparent rounded border-gray-300 focus:border-themeColor"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password
                                            placeholder="Password"
                                            className="h-10 bg-transparent rounded border-gray-300 focus:border-themeColor"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={`h-10 w-full tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? '!bg-[#0f766e]' : 'bg-teal-500'} text-white mt-5`}
                                            disabled={loading}
                                        >
                                            {loading && <Spin size="small" className="mr-2" />}
                                            {loading ? 'Changing Password...' : 'Change Password'}
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

export default ChangePassword
