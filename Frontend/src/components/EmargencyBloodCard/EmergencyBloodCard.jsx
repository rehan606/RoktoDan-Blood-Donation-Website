import React, { useState } from "react";
import getTimeAgo from "../../utils/getTimeAgo";

const EmergencyBloodCard = ({ post, language }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔴 CARD */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
          {getTimeAgo(post.createdAt, language)}
        </span>

        <h3 className="text-2xl font-bold text-red-600 mb-3">
          {post.bloodGroup}
        </h3>

        <p>
          <strong>{language === "bn" ? "রোগীর নাম" : "Patient Name"}:</strong>{" "}
          {post.name}
        </p>

        <p>
          <strong>{language === "bn" ? "ইউনিয়ন" : "Union"}:</strong>{" "}
          {post.union}
        </p>

        {/* <p>
          <strong>{language === "bn" ? "যোগাযোগ" : "Contact"}:</strong>{" "}
          {post.phone}
        </p> */}

        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
        </button>
      </div>

      {/* 🪟 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-5 text-gray-500 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="text-2xl font-bold text-red-600  mb-1 ">
              {post.bloodGroup}
            </h3>

            <div className="flex items-start justify-between mt-4 border border-gray-200 rounded-lg p-4">
                {/* Details */}
                <div className="space-y-2 text-gray-700">
                <p>
                    <strong>{language === "bn" ? "রোগীর নাম" : "Patient Name"}:</strong>{" "}
                    {post.name}
                </p>

                <p>
                    <strong>{language === "bn" ? "ইউনিয়ন" : "Union"}:</strong>{" "}
                    {post.union}
                </p>

                <p>
                    <strong>{language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}:</strong>{" "}
                    {post.bloodGroup}
                </p>

                <p>
                    <strong>{language === "bn" ? "যোগাযোগ" : "Contact"}:</strong>{" "}
                    {post.phone}
                </p>

                {post.message && (
                    <p>
                    <strong>{language === "bn" ? "বার্তা" : "Message"}:</strong>{" "}
                    {post.message}
                    </p>
                )}
                </div>

                <div>
                    <p className="text-sm  mb-4   pl-2 text-gray-500 border-l-4 border-green-500">
                        <strong>{language === "bn" ? "পোস্ট হয়েছে" : "Post Time:"}:</strong>{" "}
                        {getTimeAgo(post.createdAt, language)}
                    </p>
                </div>
            </div>
            

            {/* Call button */}
            <a
              href={`tel:${post.phone}`}
              className="mt-6 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {language === "bn" ? "এখনই কল করুন" : "Call Now"}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyBloodCard;