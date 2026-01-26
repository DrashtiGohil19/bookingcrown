import Header from '../../common/Header';
import Footer from '../../common/Footer';

function PrivacyPolicy() {
    return (
        <div>
            <Header />
            <section className='bg-[#f1fafb] min-h-screen pt-24'>
                <div className='container mx-auto px-4 md:px-8 py-12 max-w-4xl'>
                    <h1 className='text-3xl md:text-4xl font-bold text-themeColor mb-6'>Privacy Policy</h1>
                    <p className='text-slate-600 mb-4'>Last updated: {new Date().toLocaleDateString()}</p>

                    <div style={{ textAlign: 'center', margin: '24px 0' }}>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9954652290347538"
                            crossOrigin="anonymous"></script>
                        <ins className="adsbygoogle"
                            style={{
                                display: 'block'
                            }}
                            data-ad-client="ca-pub-9954652290347538"
                            data-ad-slot="4489052415"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                        <script>
                            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                        </script>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6'>
                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>1. Introduction</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                Welcome to BookingCrown. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our booking management services.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                By using our website and services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>2. Information We Collect</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We collect information that you provide directly to us when you register for an account, make a booking, or contact us for support. This may include:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Personal identification information (name, email address, phone number)</li>
                                <li>Business information (business name, address, type of business)</li>
                                <li>Booking and transaction details</li>
                                <li>Account credentials and preferences</li>
                                <li>Communication records when you contact our support team</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>3. How We Use Your Information</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We use the information we collect to:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Provide, maintain, and improve our booking management services</li>
                                <li>Process your bookings and manage your account</li>
                                <li>Send you important updates, notifications, and confirmations</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Detect, prevent, and address technical issues and security threats</li>
                                <li>Comply with legal obligations and enforce our terms of service</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>4. Cookies and Tracking Technologies</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
                            </p>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until deleted or expired) to:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>Remember your preferences and settings</li>
                                <li>Analyze how you use our website to improve user experience</li>
                                <li>Provide personalized content and advertisements</li>
                                <li>Maintain your login session</li>
                            </ul>
                            <p className='text-slate-600 leading-relaxed mt-4'>
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>5. Third-Party Services and Advertising</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                Our website may use third-party services and display advertisements from third-party ad networks. These services may use cookies, web beacons, and other tracking technologies to collect information about your use of our website and other websites.
                            </p>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
                            </p>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                You may opt out of personalized advertising by visiting Google's Ads Settings. Alternatively, you can opt out of some third-party vendors' uses of cookies for personalized advertising by visiting www.aboutads.info/choices.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                These third-party ad servers or ad networks use technology to send the advertisements and links that appear on our website directly to your browsers. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by third-party ad networks to measure the effectiveness of their advertisements and to personalize the advertising content that you see.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>6. Data Security</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                            <p className='text-slate-600 leading-relaxed'>
                                We use industry-standard encryption technologies when transmitting sensitive information, and we regularly review and update our security practices to address new threats and vulnerabilities.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>7. Data Retention</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>8. Your Rights</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>
                            <ul className='list-disc list-inside text-slate-600 space-y-2 ml-4'>
                                <li>The right to access and receive a copy of your personal data</li>
                                <li>The right to rectify inaccurate or incomplete information</li>
                                <li>The right to request deletion of your personal data</li>
                                <li>The right to object to processing of your personal data</li>
                                <li>The right to data portability</li>
                                <li>The right to withdraw consent at any time</li>
                            </ul>
                            <p className='text-slate-600 leading-relaxed mt-4'>
                                To exercise these rights, please contact us using the contact information provided below.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>9. Children's Privacy</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information from our systems.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>10. Changes to This Privacy Policy</h2>
                            <p className='text-slate-600 leading-relaxed'>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>11. Contact Us</h2>
                            <p className='text-slate-600 leading-relaxed mb-4'>
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <ul className='list-none text-slate-600 space-y-2'>
                                <li><strong>Email:</strong> <a href="mailto:bookingcrown8@gmail.com" className='text-themeColor hover:underline'>bookingcrown8@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+919998883603" className='text-themeColor hover:underline'>+91 99988 83603</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
