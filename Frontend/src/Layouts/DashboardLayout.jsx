
import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import {FaHome,FaUsers,FaTint,FaPlusCircle,FaChartBar,FaCog,FaBars, FaSignOutAlt, FaUserCircle, FaHistory, FaBell, FaCogs, FaUser, FaUserClock, FaUserCheck, } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import useAuth from "../Hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import useUserRole from "../Hooks/useUserRole";
import DashboardLoader from "../components/Loader/DashboardLoader";

// ================= Dashboard Layout =================
const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { language, setLanguage } = useLanguage('bn');
    const { role, roleLoading } = useUserRole();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (roleLoading) {
        return (
            <DashboardLoader />
        );
    }



    const adminMenus = [
        {
        name: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
        to: "/dashboard",
        icon: <FaHome />,
        },
        {
        name: language === "bn" ? "সব দাতা" : "All Users",
        to: "/dashboard/donors",
        icon: <FaUsers />,
        },
        {
        name: language === "bn" ? "সক্রিয় দাতা" : "Active Donors",
        to: "/dashboard/active-donors",
        icon: <FaUserCheck />,
        },
        {
        name: language === "bn" ? "অপেক্ষামান দাতা " : "Pending Donors",
        to: "/dashboard/pending-donors",
        icon: <FaUserClock />,
        },
        {
        name: language === "bn" ? "এডমিন যোগ" : "Make Admin",
        to: "/dashboard/make-admin",
        icon: <FaPlusCircle />,
        },
        {
        name: language === "bn" ? "রক্তের অনুরোধ" : "Blood Requests",
        to: "/dashboard/request-blood-posts",
        icon: <FaTint />,
        },
        {
        name: language === "bn" ? "অপেক্ষামান দান" : "Pending Donations",
        to: "/dashboard/pending-donations",
        icon: <BiSolidDonateBlood />,
        },
        {
        name: language === "bn" ? "সব দান" : "All Donations",
        to: "/dashboard/all-donations",
        icon: <BiSolidDonateBlood />,
        },
        {
        name: language === "bn" ? "রিপোর্ট" : "Reports",
        to: "/dashboard/reports",
        icon: <FaChartBar />,
        },
        // {
        // name: language === "bn" ? "সেটিংস" : "Settings",
        // to: "/dashboard/settings",
        // icon: <FaCog />,
        // },
    ];

    const donorMenus = [
        {
            name: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
            to: "/dashboard",
            icon: <FaHome />,
        },
        {
            name: language === "bn" ? "আমার প্রোফাইল" : "My Profile",
            to: "/dashboard/profile",
            icon: <FaUser />,
        },
        {
            name: language === "bn" ? "ডোনেশন যোগ করুন " : "Add Donation",
            to: "/dashboard/add-donation",
            icon: <FaPlusCircle />,
        },
        {
            name: language === "bn" ? "দান ইতিহাস" : "Donation History",
            to: "/dashboard/my-donations",
            icon: <FaHistory />,
        },
        {
            name: language === "bn" ? "আমার অনুরোধ" : "My Requests",
            to: "/dashboard/my-requests",
            icon: <FaTint />,
        },
        {
            name: language === "bn" ? "নোটিফিকেশন" : "Notifications",
            to: "/dashboard/notification",
            icon: <FaBell />,
        },
        {
            name: language === "bn" ? "সেটিংস" : "Settings",
            to: "/dashboard/settings",
            icon: <FaCogs />,
        },
    ];

    const userMenus = [
        {
            name: language === "bn" ? "আমার প্রোফাইল" : "My Profile",
            to: "/dashboard/profile",
            icon: <FaUser />,
        },
        {
            name: language === "bn" ? "আমার অনুরোধ" : "My Requests",
            to: "/dashboard/my-requests",
            icon: <FaTint />,
        },
        {
            name: language === "bn" ? "নোটিফিকেশন" : "Notifications",
            to: "/dashboard/notification",
            icon: <FaBell />,
        },
        {
            name: language === "bn" ? "সেটিংস" : "Settings",
            to: "/dashboard/settings",
            icon: <FaCogs />,
        },
    ];
    
    const menus = role === "admin" ? adminMenus : role === "donor" ? donorMenus :  userMenus;
  


    return (
        <div className={ language === "bn" ? "font-bn" : "font-en"} >
            <div className="h-screen flex bg-[#0b1c2d] text-gray-200 overflow-hidden" >
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#0f2a44] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} 
                >
                    <div className="p-4  text-xl font-bold border-b  bg-[#112336]" >
                        <Link to="/" className="cursor-pointer flex  items-center justify-center gap-2 hover:scale-110 transition-all duration-300">
                            <FaTint className="text-white w-8 h-8  " />
                            <div>
                                {language === "bn"? <h2>রক্তদান</h2> : <h2>RoktoDaan</h2> }
                            </div>
                        </Link>
                    
                    </div>

                    <div className="mx-auto">
                        <div className="flex flex-col items-center justify-center mt-3">
                            {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="user"
                                className="w-12 h-12 rounded-full object-cover border-4 border-gray-200"
                            />
                            ) : (
                            <FaUserCircle className="text-3xl" />
                            )}
                            <div className="text-sm text-center">
                            <p className="font-semibold">{user?.displayName || "Admin"}</p>
                            <p className="text-xs text-gray-400">{role}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 ">
                        
                        {menus.map((menu) => (
                            <NavLink
                            key={menu.to}
                            to={menu.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                                isActive
                                    ? "bg-[#0b1c2d] text-white"
                                    : "hover:bg-[#0b1c2d]"
                                }`
                            }
                            >
                            {menu.icon}
                            {menu.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User section bottom */}
                    <div className="p-4  bg-[#112336] border-t ">
                        

                        <button
                            onClick={logOut}
                            className="flex items-center gap-2 w-full cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-200 hover:text-red-500 transition"
                        >
                            <FaSignOutAlt />
                            {language === "bn" ? "লগ আউট" : "Logout"}
                        </button>
                    </div>
                </aside>

                {/* Main area */}
                <div className="flex-1 flex flex-col md:ml-64 h-screen">
                    {/* Top bar */}
                    <header  className="fixed top-0 left-0 md:left-64 right-0 h-16 flex items-center justify-between px-4 md:px-8 bg-[#0F2A44] z-30">
                        <div className="flex items-center gap-3">
                            <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden text-xl"
                            >
                            <FaBars />
                            </button>
                            <div className="flex-col">
                                <h1 className="font-semibold text-lg text-white ">
                                {language === "bn" ? "হ্যালো" : "Hello"} <span className="text-md"> {user?.displayName } </span> 
                                </h1>
                                <p className="text-white">
                                    {language === 'bn' ? 'ড্যাশবোর্ডে স্বাগতম ' : 'Welcome to Dashboard '}
                                    !
                                </p>
                            </div>
                        </div>


                        <div className="">
                            
                            
                            {/* Language Toggle */}
                            <button
                            onClick={() =>
                                setLanguage(language === "bn" ? "en" : "bn")
                            }
                            className="border px-3 py-2 rounded-md text-white  bg-[#3B82F6] hover:bg-[#1462df] transition  hover:text-white cursor-pointer"
                            >
                            {language === "bn" ? "English" : "বাংলা"}
                            
                            </button>
                        </div>
                    
                    </header>
                    

                    {/* Content */}
                    <main className="mt-16 flex-1 overflow-y-auto bg-[#0b1c2d] p-4 md:p-6">
                    <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
