/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../context/LanguageContext";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { MdPending } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DonorDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { language } = useLanguage();

    const [data, setData] = useState(null);
    const [allDonations, setAllDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
        try {
            const res = await axiosSecure.get("/my-donations");
            setAllDonations(res.data);

            const total = res.data.length;
            const approved = res.data.filter(d => d.status === "approved").length;
            const pending = res.data.filter(d => d.status === "pending").length;

            const lastApproved = res.data
            .filter(d => d.status === "approved")
            .sort((a, b) => new Date(b.donatedAt) - new Date(a.donatedAt))[0];

            setData({
            total,
            approved,
            pending,
            lastApprovedDonation: lastApproved || null,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchDashboard();
    }, []);

    // =========================
    // Eligibility Logic
    // =========================
    let remainingDays = 0;
    let nextEligibleDate = null;
    let progress = 100;
    let isEligible = true;

    if (data?.lastApprovedDonation) {
        const lastDate = new Date(data.lastApprovedDonation.donatedAt);
        const today = new Date();
        const diffTime = today - lastDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 90) {
        remainingDays = Math.ceil(90 - diffDays);
        isEligible = false;

        nextEligibleDate = new Date(lastDate);
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);

        progress = Math.min((diffDays / 90) * 100, 100);
        }
    }

    // =========================
    // Countdown Timer
    // =========================
    useEffect(() => {
        if (!nextEligibleDate) return;

        const interval = setInterval(() => {
        const now = new Date();
        const distance = nextEligibleDate - now;

        if (distance <= 0) {
            setCountdown("00d 00h 00m 00s");
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / 1000 / 60) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setCountdown(
            `${days}d ${hours}h ${minutes}m ${seconds}s`
        );
        }, 1000);

        return () => clearInterval(interval);
    }, [nextEligibleDate]);

    // =========================
    // Monthly Chart Data
    // =========================
    const monthlyData = () => {
        const months = {};

        allDonations
        .filter(d => d.status === "approved")
        .forEach(d => {
            const date = new Date(d.donatedAt);
            const month = date.toLocaleString("default", { month: "short" });

            months[month] = (months[month] || 0) + 1;
        });

        return Object.keys(months).map(month => ({
        month,
        donations: months[month],
        }));
    };

    if (loading) {
        return (
        <div className="text-center py-10">
            {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
        </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-10">

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white ">
                {language === "bn"
                ? "ডোনার ড্যাশবোর্ড"
                : "Donor Dashboard"}
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <div className="flex justify-center">
                        <BiSolidDonateBlood className="text-3xl text-red-500  "/>
                    </div>
                <h3 className="text-gray-500 mt-2">
                    {language === "bn" ? "মোট ডোনেশন" : "Total Donations"}
                </h3>
                <p className="text-3xl font-bold text-red-600">
                    {data.total}
                </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <div className="flex justify-center">
                        <FcApproval className="text-3xl  " />
                    </div>
                <h3 className="text-gray-500 mt-2">
                    {language === "bn" ? "অনুমোদিত" : "Approved"}
                </h3>
                <p className="text-3xl font-bold text-green-600">
                    {data.approved}
                </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <div className="flex justify-center">
                        <MdPending className="text-3xl text-yellow-500 "/>
                    </div>
                <h3 className="text-gray-500 mt-2">
                    {language === "bn" ? "Pending" : "Pending"}
                </h3>
                <p className="text-3xl font-bold text-yellow-500">
                    {data.pending}
                </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <div className="flex justify-center">
                        <FaRegCalendarCheck className="text-3xl text-green-600 "/>
                    </div>
                <h3 className="text-gray-500 mt-2">
                    {language === "bn" ? "শেষ ডোনেশন" : "Last Donation"}
                </h3>
                <p className="text-sm font-semibold text-green-600">
                    {data.lastApprovedDonation
                    ? new Date(
                        data.lastApprovedDonation.donatedAt
                        ).toLocaleDateString()
                    : language === "bn"
                    ? "এখনো নেই"
                    : "No donation yet"}
                </p>
                </div>
            </div>

            {/* Eligibility Section */}
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

                {isEligible ? (
                <p className="text-green-600 font-semibold text-lg text-center">
                    {language === "bn"
                    ? "আপনি এখন রক্তদান করতে পারবেন ❤️"
                    : "You are eligible to donate ❤️"}
                </p>
                ) : (
                <>
                    <p className="text-red-600 font-semibold text-center">
                    {language === "bn"
                        ? `আর ${remainingDays} দিন পরে রক্তদান করতে পারবেন`
                        : `You can donate after ${remainingDays} days`}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-red-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                    </div>

                    {/* Countdown */}
                    <p className="text-center text-gray-600 font-mono text-lg">
                    {countdown}
                    </p>
                </>
                )}
            </div>

            {/* Monthly Chart */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                {language === "bn"
                    ? "মাসভিত্তিক ডোনেশন"
                    : "Monthly Donations"}
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData()}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#4a25ec" />
                </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};



export default DonorDashboard;
