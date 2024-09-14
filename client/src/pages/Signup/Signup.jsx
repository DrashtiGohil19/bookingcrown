import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { Form, Input, Button, Select, Spin, Col, Row } from 'antd';
import { signup } from '../../api/Auth'
import Footer from '../../common/Footer'
import io from 'socket.io-client';
import "../../App.css"

const socket = io(process.env.REACT_APP_BACKEND_URL);

const { Option } = Select;

const business = [
    { id: 2, name: 'Box Cricket' },
    { id: 3, name: 'Cafe/Restuarant' },
    { id: 4, name: 'Hotel management' },
    { id: 3, name: 'Farm' },
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
            <section className="flex items-center justify-center py-12 min-h-screen px-4">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                    <div className="lg:col-span-6 md:col-span-6 hidden lg:flex justify-center">
                        <img
                            src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
                            alt=""
                            className="w-full h-[580px] max-w-[500px]"
                        />
                    </div>
                    <div className="lg:col-span-6 md:col-span-12 flex items-center justify-center md:p-0 p-6">
                        <div className="max-w-[600px] w-full bg-white rounded-md shadow p-6">
                            <div className="pb-6 text-center">
                                <h3 className="font-semibold text-2xl leading-normal mb-4">Register Your Account</h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Please add your business details to register your account. After creating your account, please contact BookingCrown to request access permissions.
                                </p>
                            </div>
                            <Form
                                layout="vertical"
                                onFinish={onFinish}
                                className="max-w-lg mx-auto"
                            >
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[{ required: true, message: 'Please input your name!' }]}
                                        >
                                            <Input
                                                placeholder="Name"
                                                className={`h-10`}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Please input your email!' },
                                                { type: 'email', message: 'The input is not valid E-mail!' }
                                            ]}
                                        >
                                            <Input
                                                placeholder="Email"
                                                className={`h-10`}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="mobilenu"
                                            rules={[
                                                { required: true, message: 'Please input your mobile number!' },
                                                {
                                                    pattern: /^[0-9]{10}$/,
                                                    message: 'Mobile number must be exactly 10 digits!'
                                                }
                                            ]}
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Phone Nu"
                                                className={`h-10`}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Bussiness Type"
                                            name="businessType"
                                            rules={[{ required: true, message: 'Please select a business type!' }]}
                                        >
                                            <Select
                                                className={`h-10`}
                                                placeholder="Bussiness Type"
                                                suffixIcon={<RiExpandUpDownFill className="text-gray-400" />}
                                            >
                                                {business.map(person => (
                                                    <Option key={person.id} value={person.name}>
                                                        {person.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Business Name"
                                            name="businessName"
                                            rules={[{ required: true, message: 'Please input your business name!' }]}
                                        >
                                            <Input
                                                placeholder="Business Name"
                                                className={`h-10`}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                            rules={[{ required: true, message: 'Please input your address!' }]}
                                        >
                                            <Input
                                                placeholder="Address"
                                                className={`h-10`}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={`h-10 w-full tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? '!bg-[#0f766e]' : 'bg-teal-500'} text-white mt-5`}
                                        disabled={loading}
                                    >
                                        {loading && <Spin size="small" className="mr-2" />}
                                        {loading ? 'Submitting...' : 'Sign up'}
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="mt-6 text-center">
                                <p className="text-slate-600">Already have an account? <Link to="/login" className="text-teal-500 hover:text-teal-700 font-semibold">Login</Link></p>
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
