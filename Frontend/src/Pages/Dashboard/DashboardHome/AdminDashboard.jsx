import React from 'react'
import { useLanguage } from '../../../context/LanguageContext';
import { FaCheckCircle, FaHourglassHalf, FaTint, FaUsers, } from 'react-icons/fa';
import { PieChart,  Pie, Cell, BarChart, Bar, XAxis,YAxis,Tooltip, ResponsiveContainer,} from "recharts";



const AdminDashboard = () => {
    const { language,  } = useLanguage();
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
        <div>
            <div className="p-10 space-y-6">
                {/* ===== Cards ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 ">
                    {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-[#FEFFFF] border shadow-lg border-blue-900 rounded-xl p-5 flex items-center gap-4 hover:scale-[1.02] transition"
                    >
                        <div className="text-3xl text-red-500">{card.icon}</div>
                        <div>
                        <p className="text-sm text-gray-400">{card.title}</p>
                        <h2 className="text-2xl font-bold text-zinc-800">
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
        </div>
    )
}

export default AdminDashboard
