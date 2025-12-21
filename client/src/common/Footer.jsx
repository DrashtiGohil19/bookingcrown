import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="bg-themeColor py-6 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="text-white/80 hover:text-white text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/privacy-policy" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:bookingcrown8@gmail.com" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Email Support
                                </a>
                            </li>
                            <li>
                                <a href="tel:+919998883603" className="text-white/80 hover:text-white text-sm transition-colors">
                                    Phone: +91 99988 83603
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">About</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                            BookingCrown is your trusted partner for efficient booking management solutions.
                        </p>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-4">
                    <div className="text-center text-[14px] text-white/80">
                        <p>© BookingCrown 2024-25, All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
