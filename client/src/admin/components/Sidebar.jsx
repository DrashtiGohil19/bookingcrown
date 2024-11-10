import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoClose, IoHome } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetBookingData } from '../../features/bookings/BookingSlice';
import { fetchUserData, resetAllUserData } from '../../features/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUserAccess } from '../../services/userAccessContext/UserAccessContext';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: IoHome },
]

const userNavigation = [
    { name: 'Change Password', href: '/change-password' },
    { name: 'Log out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, status } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    const { resetUserAccess } = useUserAccess();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData())
        }
    }, [dispatch, status])

    const handleLogOut = async () => {
        dispatch(resetAllUserData());
        dispatch(resetBookingData());
        resetUserAccess();
        await localStorage.clear()
        navigate("/")
    }

    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <IoClose aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-themeColor px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center border-b-[1px]">
                                    <img
                                        alt="Company"
                                        src={require("../../assets/Logo3.jpg")}
                                        className="h-12 w-auto"
                                    />
                                    <h1 className='ms-3 cursor-pointer font-bold text-white text-[20px]'>Booking Crown</h1>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                location.pathname === item.href
                                                                    ? 'bg-[#029584] text-white'
                                                                    : 'text-white hover:bg-[#029584] hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    location.pathname === item.href ? 'text-white' : 'text-white group-hover:text-white',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[16rem] lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-themeColor px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center border-b-[1px]">
                            <img
                                alt="Company"
                                src={require("../../assets/Logo3.jpg")}
                                className="h-12 w-auto"
                            />
                            <h1 className='ms-3 cursor-pointer font-bold text-white text-[20px]'>Booking Crown</h1>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-2">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href
                                                            ? 'bg-[#029584] text-white'
                                                            : 'text-white hover:bg-[#029584] hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            location.pathname === item.href ? 'text-white' : 'text-white group-hover:text-white',
                                                            'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-[15rem]">
                    <div className="sticky top-0 z-40 flex justify-between lg:justify-end h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <FaBars aria-hidden="true" className="h-6 w-6" />
                        </button>
                        <div className="flex items-center lg:hidden">
                            <img
                                src={require("../../assets/Logo.png")}
                                alt="logo"
                                className='h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16'
                            />
                            <h1 className='ml-2 sm:ml-3 cursor-pointer font-bold text-themeColor text-base sm:text-lg md:text-xl'>
                                Booking Crown
                            </h1>
                        </div>

                        <div className="flex gap-x-4 self-stretch lg:gap-x-6">
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <span aria-hidden="true" className="mr-4 text-sm font-semibold leading-6 text-gray-900">
                                            {user.data?.name}
                                        </span>
                                        <img
                                            alt="user"
                                            src={require("../../assets/user.png")}
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <FaAngleDown aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-3 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {item.name === 'Log out' ? (
                                                    <Link
                                                        to={item.href}
                                                        onClick={handleLogOut}
                                                        className="block px-3 py-1 text-md leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to={item.href}
                                                        className="block px-3 py-1 text-md leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
