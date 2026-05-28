import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiExpandUpDownFill } from 'react-icons/ri';
import { Form, Input, Button, Select, Spin, Col, Row } from 'antd';
import io from 'socket.io-client';
import { signup } from '../../api/Auth';
import Footer from '../../common/Footer';
import Seo from '../../common/Seo';
import '../../App.css';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const { Option } = Select;

const business = [
  { id: 2, name: 'Box Cricket' },
  { id: 3, name: 'Cafe/Restaurant' },
  { id: 4, name: 'Hotel management' },
  { id: 5, name: 'Farm' },
];

function Signup() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinRoom', 'signupRoom');
    return () => {
      socket.off('joinRoom', 'signupRoom');
    };
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await signup(
        values.name,
        values.mobilenu,
        values.email,
        values.businessType,
        values.businessName,
        values.address
      );

      if (data.success) {
        form.resetFields();
        socket.emit('userSignedUp');
        navigate('/signup-confirmation');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Sign Up"
        description="Create a BookingCrown account for your business."
        path="/signup"
        robots="noindex,nofollow"
      />

      <section className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="grid items-center md:grid-cols-12">
          <div className="hidden justify-center md:col-span-6 lg:flex">
            <img
              src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
              alt="Business signup illustration"
              className="h-[580px] w-full max-w-[500px]"
            />
          </div>

          <div className="flex items-center justify-center p-6 md:col-span-12 md:p-0 lg:col-span-6">
            <div className="w-full max-w-[600px] rounded-md bg-white p-6 shadow">
              <div className="pb-6 text-center">
                <h1 className="mb-4 text-2xl font-semibold leading-normal">Register Your Account</h1>
                <p className="mx-auto max-w-xl text-slate-400">
                  Add your business details to create your account. If you need help with onboarding or account access after signup, you can contact the BookingCrown team directly.
                </p>
              </div>

              <Form layout="vertical" onFinish={onFinish} className="mx-auto max-w-lg" form={form}>
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                      <Input placeholder="Name" className="h-10" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' },
                      ]}
                    >
                      <Input placeholder="Email" className="h-10" />
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
                          message: 'Mobile number must be exactly 10 digits!',
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Phone Number" className="h-10" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12}>
                    <Form.Item
                      label="Business Type"
                      name="businessType"
                      rules={[{ required: true, message: 'Please select a business type!' }]}
                    >
                      <Select
                        className="h-10"
                        placeholder="Business Type"
                        suffixIcon={<RiExpandUpDownFill className="text-gray-400 flex items-center" />}
                      >
                        {business.map((person) => (
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
                      <Input placeholder="Business Name" className="h-10" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                      <Input placeholder="Address" className="h-10" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={`mt-5 inline-flex h-10 w-full items-center justify-center rounded-md font-medium tracking-wide ${loading ? '!bg-themeDark' : 'bg-themeColor'} text-white`}
                    disabled={loading}
                  >
                    {loading && <Spin size="small" className="mr-2" />}
                    {loading ? 'Submitting...' : 'Sign up'}
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-themeColor hover:text-themeDark">
                    Login
                  </Link>
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

export default Signup;
