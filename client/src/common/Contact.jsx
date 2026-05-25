import { useState } from 'react';
import { Button, Form, Input, Select, Spin } from 'antd';
import { IoCall } from 'react-icons/io5';
import { MdEmail, MdOutlineAccessTime } from 'react-icons/md';
import { submitContactForm } from '../api/Contact';
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_LINK } from '../content/siteData';

const businessOptions = [
  'Box Cricket',
  'Cafe or Restaurant',
  'Hotel',
  'Farm',
  'Event Space',
  'Other Service Business',
];

function Contact() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await submitContactForm(values);
      form.resetFields();
    } catch (error) {
      console.log('Contact form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-themeLight p-3 text-2xl text-themeColor">
              <MdEmail />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Email support</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Best for account questions, product inquiries, partnership requests, and follow-up after you sign up.
              </p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-3 inline-block font-semibold text-themeColor hover:text-themeDark">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-themeLight p-3 text-2xl text-themeColor">
              <IoCall />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Phone support</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use phone support for urgent booking workflow questions or account access issues that need a quicker reply.
              </p>
              <a href={`tel:${SUPPORT_PHONE_LINK}`} className="mt-3 inline-block font-semibold text-themeColor hover:text-themeDark">
                {SUPPORT_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-themeLight p-3 text-2xl text-themeColor">
              <MdOutlineAccessTime />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Business hours</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Monday to Friday, 9:00 AM to 6:00 PM IST. Messages received outside business hours are reviewed on the next working day.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                BookingCrown currently supports customers remotely through email and phone.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
        <h3 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">Send a message</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Tell us what type of business you run, what you want to improve, and where you need help. Clear inquiries help us respond faster and more usefully.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name.' }]}
            >
              <Input placeholder="Your full name" className="h-11" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email.' },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            >
              <Input placeholder="you@example.com" className="h-11" />
            </Form.Item>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Optional phone number" className="h-11" />
            </Form.Item>

            <Form.Item label="Business type" name="businessType">
              <Select
                placeholder="Select your business type"
                options={businessOptions.map((item) => ({ label: item, value: item }))}
                className="h-11"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="How can we help?"
            name="message"
            rules={[
              { required: true, message: 'Please share a short message.' },
              { min: 30, message: 'Please provide at least 30 characters so we can understand your request.' },
            ]}
          >
            <Input.TextArea
              rows={6}
              placeholder="Explain your booking workflow, current challenge, or question."
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className={`h-11 rounded-xl px-6 ${loading ? '!bg-themeDark' : 'bg-themeColor'} text-white`}
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : 'Send inquiry'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
