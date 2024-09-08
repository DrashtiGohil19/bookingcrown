import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'
import { getToken, getUserRole } from '../services/authService/AuthService'

function Header() {
    const navigate = useNavigate()
    const token = getToken()
    const role = getUserRole()
    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow z-50">
            <Disclosure as="nav" className="bg-white shadow-xl">
                <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">


                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex gap-4 flex-shrink-0 items-center">
                                <div className=" inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-themeLight0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-themeColor">
                                        <span className="sr-only">Open main menu</span>
                                        <FaBars aria-hidden="true" className="block h-6 w-6 group-open:hidden" />
                                        <IoClose aria-hidden="true" className="hidden h-6 w-6 group-open:block" />
                                    </DisclosureButton>
                                </div>
                                <img
                                    alt="Company"
                                    src={require("../assets/Logo.png")}
                                    className="h-16 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:flex md:space-x-8 space-x-4">
                                <Link
                                    to="home"
                                    smooth={true}
                                    duration={1000}
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor cursor-pointer duration-300"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="about"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    About
                                </Link>
                                <Link
                                    to="service"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Services
                                </Link>
                                <Link
                                    to="feature"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Features
                                </Link>
                                <Link
                                    to="contact"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Contact
                                </Link>
                            </div>
                            <div className="flex items-center ml-auto space-x-2">
                                {token && role ? (
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/${role}/dashboard`)}
                                        className="rounded-lg bg-themeColor text-white focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-offset-2 p-[5px_9px]"
                                    >
                                        Dashboard
                                    </button>
                                ) : (
                                    <>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="rounded-lg bg-themeColor text-white focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-offset-2 p-[5px_9px]"
                                        >
                                            Log in
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/signup")}
                                            className="rounded-lg bg-themeColor text-white focus:outline-none focus:ring-2 focus:ring-themeColor ms-1 md:ms-4 focus:ring-offset-2 p-[5px_9px]"
                                        >
                                            Sign up
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 pb-4 pt-2">
                        <Link
                            to='home'
                            smooth={true}
                            duration={1000}
                            className="block border-l-4 border-themeColor bg-themeLight py-2 pl-3 pr-4 text-base font-medium text-themeColor"
                        >
                            Home
                        </Link>
                        <Link
                            to='about'
                            smooth={true}
                            duration={1000}
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            About
                        </Link>
                        <Link
                            smooth={true}
                            duration={1000}
                            to='service'
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Services
                        </Link>
                        <Link
                            smooth={true}
                            duration={1000}
                            to='feature'
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Features
                        </Link>
                        <Link
                            smooth={true}
                            duration={1000}
                            to='contact'
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Contact
                        </Link>
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

export default Header
