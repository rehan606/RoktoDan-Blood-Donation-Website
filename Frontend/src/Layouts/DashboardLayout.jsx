import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import {FaHome,FaUsers,FaTint,FaPlusCircle,FaChartBar,FaCog,FaBars, FaSignOutAlt, FaUserCircle, FaHistory, FaBell, FaCogs, FaUser, FaUserClock, FaUserCheck, } from "react-icons/fa";


import useAuth from "../Hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import AdminHome from "../Pages/Dashboard/DashboardHome/AdminDashboard";
import useUserRole from "../Hooks/useUserRole";

// ================= Dashboard Layout =================
const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { language, setLanguage } = useLanguage();
    const { role, roleLoading } = useUserRole();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b1c2d] text-white">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }



    const adminMenus = [
        {
        name: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
        to: "/dashboard",
        icon: <FaHome />,
        },
        {
        name: language === "bn" ? "সব দাতা" : "All Donors",
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
        name: language === "bn" ? "নতুন দাতা যোগ" : "Make Admin",
        to: "/dashboard/make-admin",
        icon: <FaPlusCircle />,
        },
        {
        name: language === "bn" ? "রক্তের অনুরোধ" : "Blood Requests",
        to: "/dashboard/requests",
        icon: <FaTint />,
        },
        {
        name: language === "bn" ? "রিপোর্ট" : "Reports",
        to: "/dashboard/reports",
        icon: <FaChartBar />,
        },
        {
        name: language === "bn" ? "সেটিংস" : "Settings",
        to: "/dashboard/settings",
        icon: <FaCog />,
        },
    ];

    const userMenus = [
    // {
    //     name: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
    //     to: "/dashboard",
    //     icon: <FaHome />,
    // },
    {
        name: language === "bn" ? "আমার প্রোফাইল" : "My Profile",
        to: "/dashboard/profile",
        icon: <FaUser />,
    },
    {
        name: language === "bn" ? "রক্তের অনুরোধ" : "Blood Requests",
        to: "/dashboard/requests",
        icon: <FaTint />,
    },
    {
        name: language === "bn" ? "দান ইতিহাস" : "Donation History",
        to: "/dashboard/history",
        icon: <FaHistory />,
    },
    {
        name: language === "bn" ? "নোটিফিকেশন" : "Notifications",
        to: "/dashboard/notifications",
        icon: <FaBell />,
    },
    {
        name: language === "bn" ? "সেটিংস" : "Settings",
        to: "/dashboard/settings",
        icon: <FaCogs />,
    },
    ];
    
    const menus = role === "admin" ? adminMenus : userMenus;
  


    return (
        <div className="min-h-screen flex bg-[#0b1c2d] text-gray-200">
            {/* Sidebar */}
            <aside
                className={`fixed md:static z-40 w-64 bg-[#0f2a44] flex flex-col transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="p-4  text-xl font-bold border-b rounded-b-3xl bg-[#112336]">
                    <Link to="/" className="cursor-pointer flex  items-center justify-center gap-2 hover:scale-110 transition-all duration-300">
                        <FaTint className="text-white w-8 h-8  " />
                        <div>
                            {language === "bn"? <h2>রক্তদান</h2> : <h2>RoktoDaan</h2> }
                        </div>
                    </Link>
                
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
                <div className="p-4 rounded-t-3xl bg-[#112336] border-t ">
                    <div className="flex items-center gap-3 mb-3">
                        {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="user"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        ) : (
                        <FaUserCircle className="text-3xl" />
                        )}
                        <div className="text-sm">
                        <p className="font-semibold">{user?.displayName || "Admin"}</p>
                        <p className="text-xs text-gray-400">{role}</p>
                        </div>
                    </div>

                    <button
                        onClick={logOut}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt />
                        {language === "bn" ? "লগ আউট" : "Logout"}
                    </button>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col bg-[#EAEEF5]">
                {/* Top bar */}
                <header className="h-16.5  flex items-center justify-between px-4 md:px-10 border-b border-blue-900">
                    <div className="flex items-center gap-3">
                        <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-xl"
                        >
                        <FaBars />
                        </button>
                        <div className="flex-col">
                            <h1 className="font-semibold text-lg text-zinc-700 ">
                            {language === "bn" ? "Hello" : "Hello"} <span className="text-md">{user?.displayName }</span> 
                            </h1>
                            <p className="text-zinc-800">Welcome to Dashboard !</p>
                        </div>
                    </div>


                    {/* Language Toggle */}
                    <button
                    onClick={() =>
                        setLanguage(language === "bn" ? "en" : "bn")
                    }
                    className="border px-3 py-2 rounded-md text-[#0b1c2d]  bg-white hover:bg-[#0b1c2d] transition  hover:text-white cursor-pointer"
                    >
                    {language === "bn" ? "English" : "বাংলা"}
                    
                    </button>

                
                </header>
                
                
                    
                

                {/* Content */}
                <main className="flex-1 p-4 md:p-6 bg-[#0b1c2d]">
                <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
