import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import {FaHome,FaUsers,FaTint,FaPlusCircle,FaChartBar,FaCog,FaBars, FaSignOutAlt, FaUserCircle,FaHourglassHalf, FaCheckCircle, } from "react-icons/fa";

import { PieChart,  Pie, Cell, BarChart, Bar, XAxis,YAxis,Tooltip, ResponsiveContainer,} from "recharts";
import useAuth from "../Hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";

// ================= Dashboard Layout =================
const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { language, setLanguage } = useLanguage();

    // default role → admin
    const role = "admin";

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menus = [
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
        name: language === "bn" ? "নতুন দাতা যোগ" : "Add Donor",
        to: "/dashboard/add-donor",
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

    // ---- Cards Data ----
    const cards = [
        {
        id: 1,
        title: language === "bn" ? "মোট রক্তদাতা" : "Total Donors",
        value: 128,
        icon: <FaUsers />,
        },
        {
        id: 2,
        title: language === "bn" ? "মোট অনুরোধ" : "Total Requests",
        value: 64,
        icon: <FaTint />,
        },
        {
        id: 3,
        title: language === "bn" ? "চলমান অনুরোধ" : "Pending Requests",
        value: 14,
        icon: <FaHourglassHalf />,
        },
        {
        id: 4,
        title: language === "bn" ? "সম্পন্ন অনুরোধ" : "Completed",
        value: 50,
        icon: <FaCheckCircle />,
        },
    ];

    // ---- Charts Data ----
    const bloodGroupData = [
        { name: "A+", value: 35 },
        { name: "B+", value: 25 },
        { name: "O+", value: 45 },
        { name: "AB+", value: 15 },
    ];

    const monthlyRequestData = [
        { month: "Jan", requests: 8 },
        { month: "Feb", requests: 12 },
        { month: "Mar", requests: 6 },
        { month: "Apr", requests: 15 },
        { month: "May", requests: 10 },
    ];


    return (
        <div className="min-h-screen flex bg-[#0b1c2d] text-gray-200">
            {/* Sidebar */}
            <aside
                className={`fixed md:static z-40 w-64 bg-[#0f2a44] flex flex-col transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="p-4 flex  items-center justify-center gap-2 text-xl font-bold border-b border-blue-900">
                    <FaTint className="text-red-600 w-8 h-8  " />
                    <div>

                    {language === "bn"? <h2>রক্তদান</h2> : <h2>RoktoDaan</h2> }
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
                <div className="p-4 border-t border-blue-900">
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
                        <p className="text-xs text-gray-400">Admin</p>
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
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <header className="h-16.5  flex items-center justify-between px-4 md:px-10 border-b border-blue-900">
                    <div className="flex items-center gap-3">
                        <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-xl"
                        >
                        <FaBars />
                        </button>
                        <h1 className="font-semibold text-lg ">
                        {language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
                        </h1>
                    </div>

                    {/* Language Toggle */}
                    <button
                    onClick={() =>
                        setLanguage(language === "bn" ? "en" : "bn")
                    }
                    className="border px-3 py-2 rounded-md text-[#0b1c2d]  bg-white hover:bg-[#0b1c2d] transition  hover:text-white cursor-pointer"
                    >
                    {language === "bn" ? "English" : "বাংলা"}
                    {/* {language === "bn" ? "EN" : "BN"} */}
                    </button>

                
                </header>

                <div className="p-10 space-y-6">
                    {/* ===== Cards ===== */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-[#0f2a44] border border-blue-900 rounded-xl p-5 flex items-center gap-4 hover:scale-[1.02] transition"
                        >
                            <div className="text-3xl text-blue-400">{card.icon}</div>
                            <div>
                            <p className="text-sm text-gray-400">{card.title}</p>
                            <h2 className="text-2xl font-bold text-white">
                                {card.value}
                            </h2>
                            </div>
                        </div>
                        ))}
                    </div>


                    {/* ===== Charts ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-[#0f2a44] border border-blue-900 rounded-xl p-5">
                        <h3 className="mb-4 font-semibold text-white">
                            {language === "bn"
                            ? "রক্তের গ্রুপ অনুযায়ী দাতা"
                            : "Donors by Blood Group"}
                        </h3>

                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                            <Pie
                                data={bloodGroupData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                            >
                                {bloodGroupData.map((_, index) => (
                                <Cell key={index} fill="#3b82f6" />
                                ))}
                            </Pie>
                            <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-[#0f2a44] border border-blue-900 rounded-xl p-5">
                        <h3 className="mb-4 font-semibold text-white">
                            {language === "bn"
                            ? "মাসিক রক্তের অনুরোধ"
                            : "Monthly Blood Requests"}
                        </h3>

                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={monthlyRequestData}>
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Bar dataKey="requests" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <main className="flex-1 p-4 md:p-6 bg-[#0b1c2d]">
                <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
