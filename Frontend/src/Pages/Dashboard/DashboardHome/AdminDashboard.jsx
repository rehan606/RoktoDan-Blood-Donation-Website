/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaUserCheck,
  FaTint,
  FaHandHoldingMedical,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLanguage } from "../../../context/LanguageContext";

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#facc15"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  const { overview, growth } = data;

  // ✅ FIXED DATA MAPPING
  const bloodGroupData = data.bloodGroupStats.map((item) => ({
    name: item._id,
    total: item.total,
  }));

  const unionData = data.unionDonorStats.map((item) => ({
    name: item._id,
    total: item.totalDonors,
  }));

  const monthlyData = data.monthlyDonations.map((m) => ({
    month: `${m._id.month}/${m._id.year}`,
    total: m.total,
  }));



  return (
    <div className="p-6 space-y-8 text-white">

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

            <Card
            title={language === "bn" ? "মোট ব্যবহারকারী" : "Total Users"}
            value={overview.totalUsers}
            icon={<FaUsers />}
            />

            <Card
            title={language === "bn" ? "মোট ডোনার" : "Total Donors"}
            value={overview.totalDonors}
            icon={<FaUserCheck />}
            />

            <Card
            title={language === "bn" ? "সক্রিয় ডোনার" : "Active Donors"}
            value={overview.availableDonors}
            icon={<FaUserCheck />}
            />

            <Card
            title={language === "bn" ? "মোট রিকোয়েস্ট" : "Total Requests"}
            value={overview.totalRequests}
            icon={<FaHandHoldingMedical />}
            />

            <Card
            title={language === "bn" ? "মোট ডোনেশন" : "Total Donations"}
            value={overview.totalDonations}
            icon={<FaTint />}
            // growth={growth?.donationGrowth}
            />

        </div>

      

        {/* ================= Bar Charts ================= */}
        <div className="grid md:grid-cols-2 gap-6">

            {/* Blood Group Chart */}
            <ChartBox title="Blood Group Distribution">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bloodGroupData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
            </ChartBox>

            {/* Union Chart */}
            <ChartBox title="Union Wise Donors">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={unionData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
            </ChartBox>

        </div>


        <div className="grid md:grid-cols-2 gap-6">
            {/* ================= Monthly Line Chart ================= */}
            <ChartBox title="Monthly Donations">
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#ef4444" />
                </LineChart>
                </ResponsiveContainer>
            </ChartBox>

            {/* ================= Pie Chart ================= */}
            <ChartBox title="Request Status">
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={data.requestStatusStats}
                    dataKey="total"
                    nameKey="_id"
                    outerRadius={100}
                    label
                    >
                    {data.requestStatusStats.map((entry, index) => (
                        <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </ChartBox>
        </div>
        {/* ================= TOP DONORS ================= */}
        <ChartBox title="Top Donors">
            {data.topDonors.map((donor, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-700 text-green-600">
                <span>{donor._id}</span>
                <span>{donor.name}</span>
                <span>{donor.totalDonations}</span>
            </div>
            ))}
        </ChartBox>

    </div>
  );
};

const Card = ({ title, value, icon, growth }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex flex-col items-center justify-center">
        <div className="text-3xl text-red-500">{icon}</div>
        <div className="text-center mt-3">
            <p className="text-sm text-zinc-800">{title}</p>
            <h2 className="text-2xl font-bold text-zinc-800 mt-2">{value}</h2>
            {growth && (
            <span className={`text-xs ${growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                {growth}% from last month
            </span>
            )}
        </div>
      
    </div>
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="mb-4 font-semibold text-zinc-800">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;
