import { useState } from "react";
import { Link,  NavLink } from "react-router";
import {FaTint } from "react-icons/fa";
import UserButton from "../Buttons/UserButton"
import useAuth from "../../Hooks/useAuth";

const Navbar = ({ language, setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {user, } = useAuth();
    



    return (
        <nav className="bg-white text-gray-800 sticky top-0 z-50 border-b shadow-md border-red-200">
            <div className="max-w-7xl mx-auto px-4 ">
                <div className="flex justify-between  items-center h-20 ">

                    {/* Mobile Button */}
                <button
                    className="md:hidden "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                        isOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16M4 18h16"
                        }
                    />
                    </svg>
                </button>
                
                {/* Logo */}
                <Link to={'/'} className="flex items-center gap-1">
                    {/* <MdBloodtype className="text-red-600 text-3xl " /> */}
                    <FaTint className="text-red-600 w-8 h-8 mx-auto " />
                    <div>
                        <div>
                            {language === "bn" ?
                            <h1 className="text-xl md:text-2xl text-zinc-700 font-bold tracking-wide">রক্ত<span className="text-red-600">দান</span>
                            </h1> :
                            <h1 className="text-xl text-zinc-800 uppercase font-bold tracking-wide ">Rokto<span className="text-red-600">Dan</span>
                            </h1>
                        }
                        </div>
                        <div className="-mt-2">
                            {language === "bn" ?
                            <h1 className="text-sm md:text-md text-zinc-700  tracking-wide">মানবতার সেবায় 
                            </h1> :
                            <h1 className="text-xl text-zinc-800 uppercase font-bold tracking-wide ">   Serving Humanity
                            </h1>
                        }
                        </div>
                        
                    </div>
                </Link>
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-4 text-md uppercase  ">
                        <NavLink to={'/'} className={({ isActive }) => isActive
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 hover:text-red-600 cursor-pointer"
                        }>
                            {language === "bn" ? "হোম" : "Home"}
                        </NavLink>
                        <NavLink to={'/register-donor'} className={({ isActive }) => isActive
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 hover:text-red-600 cursor-pointer"
                        }>
                            {language === "bn" ? "রক্তদাতা হোন  " : "Register Donor"}
                        </NavLink>

                        <NavLink to={'/all-donors'} className={({ isActive }) => isActive
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 hover:text-red-600 cursor-pointer"
                        }>
                            {language === "bn" ? "রক্তদাতা খুঁজুন " : "Search Donors"}
                        </NavLink>
                        <NavLink to={'/request-blood'} className={({ isActive }) => isActive
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 hover:text-red-600 cursor-pointer"
                        }>
                            {language === "bn" ? "রক্তের অনুরোধ" : "Request Blood"}
                        </NavLink>
                        <NavLink to={'/contact'} className={({ isActive }) => isActive
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 hover:text-red-600 cursor-pointer"
                        }>
                            {language === "bn" ? "যোগাযোগ" : "Contact"}
                        </NavLink>

                        
                    </ul>
                
                    
                    <div className="flex gap-3">

                        {/* Profile Button  */}
                        
                        { !user? ( <Link to={'/register'} className="bg-red-500 text-white py-2 px-4 rounded-md border hover:bg-white hover:text-red-500 hover:border-red-500 transition-all duration-300  "> {language === "bn" ? "সাইন আপ " : "Sign Up"}</Link> ) : (<UserButton />) }
                        
                        {/* Language Toggle */}
                        <button
                            onClick={() =>
                                setLanguage(language === "bn" ? "en" : "bn")
                            }
                            className="border hidden md:flex px-3 py-2 rounded bg-white text-red-600 transition hover:bg-red-500 hover:text-white cursor-pointer"
                            >
                            {language === "bn" ? "EN" : "BN"}
                        </button>
                    </div>
                
                
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col md:hidden bg-gray-200 shadow-2xl  border-t-2 border-red-500 text-white px-6 py-8 space-y-3">

                    <NavLink to={'/'} className={({ isActive }) => isActive
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-red-600 cursor-pointer"
                    }>
                        {language === "bn" ? "হোম" : "Home"}
                    </NavLink>
                    <NavLink to={'/all-donors'} className={({ isActive }) => isActive
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-red-600 cursor-pointer"
                    }>
                        {language === "bn" ? "রক্তদাতা খুঁজুন " : "Search Donors"}
                    </NavLink>
                    <NavLink to={'/request-blood'} className={({ isActive }) => isActive
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-red-600 cursor-pointer"
                    }>
                        {language === "bn" ? "রক্ত অনুরোধ" : "Request Blood"}
                    </NavLink>
                    <NavLink to={'/contact'} className={({ isActive }) => isActive
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-red-600 cursor-pointer"
                    }>
                        {language === "bn" ? "যোগাযোগ" : "Contact"}
                    </NavLink>

                <button
                    onClick={() =>
                    setLanguage(language === "bn" ? "en" : "bn")
                    }
                    className="border bg-red-500 px-3 py-1 rounded w-fit text-white"
                >
                    {language === "bn" ? "EN" : "BN"}
                </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
