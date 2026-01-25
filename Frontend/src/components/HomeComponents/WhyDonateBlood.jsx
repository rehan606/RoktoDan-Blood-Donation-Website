import React from "react";
import { FaHeartbeat, FaUserFriends, FaTint } from "react-icons/fa";

const WhyDonateBlood = ({ language }) => {
  const isBangla = language === "bn";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isBangla ? "font-bn" : "font-en"} text-red-600`}>
          {isBangla ? "কেন রক্ত দান করবেন?" : "Why Donate Blood?"}
        </h2>

        {/* Subtitle / Description */}
        <p className={`text-gray-700 mb-12 ${isBangla ? "font-bn" : "font-en"} text-lg max-w-3xl mx-auto`}>
          {isBangla
            ? "আপনার একটি রক্তদান অনেক জীবনের জন্য নতুন সম্ভাবনা তৈরি করতে পারে। নিচে রক্তদানের গুরুত্বপূর্ণ কারণগুলো দেখুন।"
            : "A single blood donation can create new possibilities for many lives. Check out the important reasons to donate blood below."}
        </p>

        {/* Key Points / Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaHeartbeat className="text-red-600 w-12 h-12 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "জীবন রক্ষা" : "Save Lives"}
            </h3>
            <p className={`text-gray-600 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "প্রতিটি রক্তদান কারো জীবন বাঁচাতে সাহায্য করে।" : "Every donation helps save a life."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaUserFriends className="text-red-600 w-12 h-12 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "কমিউনিটি সহায়তা" : "Community Support"}
            </h3>
            <p className={`text-gray-600 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "রক্তদান সমাজের মানুষের প্রতি আপনার সহানুভূতি প্রকাশ করে।" : "Donating shows your care for the community."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaTint className="text-red-600 w-12 h-12 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "স্বাস্থ্য সুবিধা" : "Health Benefits"}
            </h3>
            <p className={`text-gray-600 ${isBangla ? "font-bn" : "font-en"}`}>
              {isBangla ? "নিয়মিত রক্তদান রক্ত তৈরি প্রক্রিয়া ও স্বাস্থ্যের জন্য ভালো।" : "Regular donation is good for blood production and overall health."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
