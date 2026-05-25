import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken, getUserRole } from '../services/authService/AuthService';
import { resetUserData } from '../features/user/UserSlice';
import { resetBookingData } from '../features/bookings/BookingSlice';

const publicLinks = [
  { label: 'Home', section: 'home', path: '/' },
  { label: 'About', section: 'about', path: '/about-us' },
  { label: 'Services', section: 'services', path: '/#services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', section: 'contact', path: '/contact-us' },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getToken();
  const role = getUserRole();
  const isHomePage = location.pathname === '/';

  const handleLogOut = () => {
    dispatch(resetUserData());
    dispatch(resetBookingData());
    localStorage.clear();
    navigate('/');
  };

  const handleSectionNavigation = (section) => {
    if (isHomePage) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(`/#${section}`);
  };

  const renderNavItem = (item, mobile = false) => {
    const baseClass = mobile
      ? 'block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-slate-700 transition-colors hover:bg-themeLight hover:text-themeColor'
      : 'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-themeLight hover:text-themeColor';

    if (item.section && isHomePage) {
      return (
        <ScrollLink
          key={item.label}
          to={item.section}
          smooth
          duration={700}
          className={`${baseClass} cursor-pointer`}
        >
          {item.label}
        </ScrollLink>
      );
    }

    if (item.section) {
      return (
        <button
          key={item.label}
          type="button"
          onClick={() => handleSectionNavigation(item.section)}
          className={baseClass}
        >
          {item.label}
        </button>
      );
    }

    return (
      <RouterLink key={item.label} to={item.path} className={baseClass}>
        {item.label}
      </RouterLink>
    );
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur shadow-sm">
      <Disclosure as="nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <DisclosureButton className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-themeColor sm:hidden">
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-5 w-5 group-open:hidden" />
              <IoClose className="hidden h-5 w-5 group-open:block" />
            </DisclosureButton>

            <RouterLink to="/" className="flex items-center gap-3">
              <img
                alt="BookingCrown logo"
                src={require('../assets/Logo.png')}
                className="h-12 w-auto rounded-xl"
              />
              <div>
                <p className="font-['Crimson_Text'] text-2xl font-semibold leading-none text-slate-900">
                  BookingCrown
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Booking operations, simplified
                </p>
              </div>
            </RouterLink>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {publicLinks.map((item) => renderNavItem(item))}
          </div>

          <div className="flex items-center gap-2">
            {token && role ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(`/${role}/dashboard`)}
                  className="rounded-full border border-themeColor px-4 py-2 text-sm font-semibold text-themeColor transition-colors hover:bg-themeLight"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="rounded-full bg-themeColor px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-themeDark"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-themeColor hover:text-themeColor"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="rounded-full bg-themeColor px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-themeDark"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>

        <DisclosurePanel className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">
          <div className="space-y-2">
            {publicLinks.map((item) => renderNavItem(item, true))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export default Header;
