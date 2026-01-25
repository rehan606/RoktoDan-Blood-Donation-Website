import { useState } from "react";
import { Link } from "react-router";
// import { MdBloodtype } from "react-icons/md";
import {FaTint } from "react-icons/fa";

const Navbar = ({ language, setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white text-zinc-800 sticky top-0 z-50 border-b shadow-md border-red-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                
                {/* Logo */}
                <Link to={'/'} className="flex items-center gap-1">
                    {/* <MdBloodtype className="text-red-600 text-3xl " /> */}
                    <FaTint className="text-red-600 w-8 h-8 mx-auto " />
                    <div>
                        {language === "bn" ?
                            <h1 className="text-xl md:text-2xl text-zinc-700 font-bold tracking-wide">রক্ত<span className="text-red-600">দান</span>
                            </h1> :
                            <h1 className="text-xl text-zinc-800 uppercase font-bold tracking-wide ">Rokto<span className="text-red-600">Dan</span>
                            </h1>
                        }
                    </div>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-6 text-md uppercase">
                    <Link to={'/'} className="hover:text-red-600 cursor-pointer ">
                    {language === "bn" ? "হোম" : "Home"}
                    </Link>
                    <Link to={'/allDonors'} className="hover:text-red-600 cursor-pointer ">
                    {language === "bn" ? "রক্তদাতা" : "Donors"}
                    </Link>
                    <Link to={'/bloodRequest'} className="hover:text-red-600 cursor-pointer ">
                    {language === "bn" ? "রক্ত অনুরোধ" : "Request Blood"}
                    </Link>
                    <Link to={'/contact'} className="hover:text-red-600 cursor-pointer ">
                    {language === "bn" ? "যোগাযোগ" : "Contact"}
                    </Link>

                    {/* Language Toggle */}
                    <button
                    onClick={() =>
                        setLanguage(language === "bn" ? "en" : "bn")
                    }
                    className="border px-3 py-1 rounded hover:bg-white hover:text-red-600 transition"
                    >
                    {language === "bn" ? "EN" : "BN"}
                    </button>
                </ul>

                {/* Mobile Button */}
                <button
                    className="md:hidden"
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
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-red-700 px-4 pb-4 space-y-3">
                <p>{language === "bn" ? "হোম" : "Home"}</p>
                <p>{language === "bn" ? "রক্তদাতা" : "Donors"}</p>
                <p>{language === "bn" ? "রক্ত অনুরোধ" : "Request Blood"}</p>
                <p>{language === "bn" ? "যোগাযোগ" : "Contact"}</p>

                <button
                    onClick={() =>
                    setLanguage(language === "bn" ? "en" : "bn")
                    }
                    className="border px-3 py-1 rounded w-fit"
                >
                    {language === "bn" ? "EN" : "BN"}
                </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
