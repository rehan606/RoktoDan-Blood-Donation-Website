import React from "react";
import { FaUserPlus, FaCalendarAlt, FaSyringe, FaHeartbeat } from "react-icons/fa";

const HowItWorks = ({ language }) => {
  const isBangla = language === "bn";

  const steps = [
    {
      icon: <FaUserPlus className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "ডোনার রেজিস্ট্রেশন" : "Register as Donor",
      desc: isBangla
        ? "সরাসরি প্ল্যাটফর্মে রেজিস্ট্রেশন করুন। আপনার তথ্য নিরাপদ থাকবে।"
        : "Sign up on the platform. Your details are safe.",
    },
    {
      icon: <FaCalendarAlt className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "অ্যাপয়েন্টমেন্ট বুকিং" : "Book an Appointment",
      desc: isBangla
        ? "রক্তদানের জন্য একটি সুবিধাজনক সময় বুক করুন।"
        : "Book a convenient time for your blood donation.",
    },
    {
      icon: <FaSyringe className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "রক্তদান" : "Donate Blood",
      desc: isBangla
        ? "নিরাপদ পরিবেশে রক্তদান করুন এবং জীবনের জন্য অবদান রাখুন।"
        : "Donate blood safely and contribute to saving lives.",
    },
    {
      icon: <FaHeartbeat className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "জীবন বাঁচান" : "Save Lives",
      desc: isBangla
        ? "আপনার রক্তদান কারো জীবন বাঁচাতে সহায়তা করবে।"
        : "Your donation helps save someone's life.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${isBangla ? "font-bn" : "font-en"} text-red-600`}>
          {isBangla ? "কিভাবে কাজ করে" : "How It Works"}
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              {step.icon}
              <h3 className={`text-xl font-semibold mb-2 ${isBangla ? "font-bn" : "font-en"}`}>{step.title}</h3>
              <p className={`text-gray-700 ${isBangla ? "font-bn" : "font-en"}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
