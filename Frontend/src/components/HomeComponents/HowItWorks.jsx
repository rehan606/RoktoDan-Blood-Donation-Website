import React from "react";
import { FaUserPlus,  FaSyringe, FaHeartbeat } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

const HowItWorks = ({ language }) => {
  const isBangla = language === "bn";

  const steps = [
    {
      icon: <FaUserPlus className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "ডোনার রেজিস্ট্রেশন" : "Register as Donor",
      desc: isBangla
        ? "কয়েকটি সহজ ধাপে রক্তদাতা হিসাবে নিবন্ধন করুন। আপনার রক্তের গ্রুপ, অবস্থান এবং যোগাযোগের তথ্য প্রদান করুন। "
        : "Register as a blood donor in a few simple steps. Provide your blood type, location, and contact information.",
    },
    {
      icon: <MdPostAdd className="text-red-600 w-10 h-10 mb-4 mx-auto" />,
      title: isBangla ? "রক্তের অনুরোধ" : "Request Blood",
      desc: isBangla
        ? "আপনার প্রয়োজনীয় রক্তের জন্য একটি অনুরোধ পোস্ট করুন এবং ডোনারদের সাথে সংযোগ করুন।"
        : "Post a request for the blood you need and connect with donors.",
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
        ? "আপনার রক্তদান কারো জীবন বাঁচাতে সহায়তা করবে। "
        : "Your donation helps save someone's life.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isBangla ? "font-bn" : "font-en"} text-red-600`}>
          {isBangla ? "কিভাবে কাজ করে" : "How It Works"}
        </h2>
        <p className={`text-gray-700 ${isBangla ? "font-bn" : "font-en"} mb-10`}>
          {isBangla
            ? "রক্তদান একটি সহজ প্রক্রিয়া যা জীবন বাঁচাতে সাহায্য করতে পারে।"
            : "Blood donation is a simple process that can help save lives."}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 border border-gray-200 p-6 rounded-lg">
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
