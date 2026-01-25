import React, { useEffect, useState } from "react";
import { FaUsers, FaHeartbeat, FaTint } from "react-icons/fa";

const Statistics = ({ language }) => {
  const isBangla = language === "bn";

  // Dummy counter values
  const stats = [
    {
      icon: <FaUsers className="text-red-600 w-12 h-12 mx-auto mb-3" />,
      label: isBangla ? "মোট রক্তদাতা" : "Total Donors",
      value: 125,
    },
    {
      icon: <FaTint className="text-red-600 w-12 h-12 mx-auto mb-3" />,
      label: isBangla ? "সংগৃহীত রক্ত (ml)" : "Blood Collected (ml)",
      value: 78000,
    },
    {
      icon: <FaHeartbeat className="text-red-600 w-12 h-12 mx-auto mb-3" />,
      label: isBangla ? "জীবন বাঁচানো হয়েছে" : "Lives Saved",
      value: 19,
    },
  ];

  // Count-up animation
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) => (val < stats[i].value ? val + Math.ceil(stats[i].value / 200) : stats[i].value))
      );
    }, 30);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${isBangla ? "font-bn" : "font-en"} text-red-600`}>
          {isBangla ? "আমাদের কার্যক্রম" : "Our Impact"}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              {stat.icon}
              <p className={`text-3xl font-bold text-red-600 mb-2 ${isBangla ? "font-bn" : "font-en"}`}>
                {counts[idx].toLocaleString()}
              </p>
              <p className={`text-gray-700 ${isBangla ? "font-bn" : "font-en"}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
