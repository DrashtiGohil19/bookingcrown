import { Link } from 'react-router-dom';
import { SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_LINK } from '../content/siteData';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0b1f1f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.8fr,1fr] lg:px-8">
        <div>
          <h2 className="font-['Crimson_Text'] text-3xl font-semibold">{SITE_NAME}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            BookingCrown helps service businesses manage bookings with clearer workflows, stronger customer communication, and practical educational content that supports better operations.
          </p>
          <div className="mt-5 space-y-2 text-sm text-white/80">
            <p>
              Email:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href={`tel:${SUPPORT_PHONE_LINK}`} className="hover:text-white">
                {SUPPORT_PHONE}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Company</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <Link to="/" className="block hover:text-white">Home</Link>
            <Link to="/about-us" className="block hover:text-white">About us</Link>
            <Link to="/blog" className="block hover:text-white">Blog</Link>
            <Link to="/contact-us" className="block hover:text-white">Contact us</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Legal</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <Link to="/privacy-policy" className="block hover:text-white">Privacy policy</Link>
            <Link to="/terms-and-conditions" className="block hover:text-white">Terms and conditions</Link>
            <Link to="/disclaimer" className="block hover:text-white">Disclaimer</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Why this site is different</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
            <li>Original educational content for booking-focused businesses</li>
            <li>Visible contact details and trust-first navigation</li>
            <li>Ads intended only for substantial editorial pages</li>
            <li>Public pages built for readability on mobile and desktop</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/60 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
