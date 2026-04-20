import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";

const DevSupportSection = ({ language }) => {
  const isBangla = language === "bn";

  const content = {
    badge: isBangla ? "টেকনিক্যাল সাপোর্ট" : "Technical Support",

    title: isBangla
      ? "ডেভেলপমেন্ট ও কারিগরি সহযোগিতা"
      : "Development & Technical Support",

    description: isBangla
      ? "এই রক্তদান প্ল্যাটফর্মটি মানুষের জীবন বাঁচানোর লক্ষ্য নিয়ে তৈরি করা হয়েছে। আমরা নিয়মিত নতুন ফিচার যুক্ত করে এটিকে আরও উন্নত করার চেষ্টা করছি।"
      : "This blood donation platform is built to help save lives. We are continuously improving it with new features.",

    name: isBangla ? "কে এইচ রিহান" : "K.H. Rehan",

    role: isBangla ? "ওয়েব ডেভেলপার" : "Web Developer",

    quote: isBangla
      ? "জনদুর্ভোগ নিরসনে একটি প্রযুক্তিনির্ভর প্রয়াস।"
      : "A technology-driven initiative to reduce public suffering.",

    supportText: isBangla
      ? "এই সিস্টেমের উন্নয়ন চলমান রয়েছে। এটিকে আরও কার্যকর ও ব্যবহারবান্ধব করতে সবার সহযোগিতা আন্তরিকভাবে কাম্য।"
      : "We are continuously improving this system. Your support helps us make it more effective and user-friendly.",
  };

  return (
    <section className="w-full py-14 md:py-20 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {content.badge}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            {content.title}
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            {content.description}
          </p>
        </div>

        {/* Card */}
        <div className="bg-red-50 rounded-3xl shadow-xl border  border-red-500 p-6 sm:p-8 md:p-10 text-center hover:shadow-2xl transition duration-300 relative overflow-hidden">
          <div className="
              w-72 h-72 md:w-96 md:h-96 
              rounded-full bg-red-500 opacity-60 overflow-hidden

              absolute

              /* Mobile (default) → center */
              top-[-210px] left-1/2 -translate-x-1/2

              /* Medium+ → top right */
              md:top-[-200px] md:right-[-200px] 
              md:left-auto md:translate-x-0
            ">

            </div>

          {/* Profile Icon */}
          <div className="group w-20 h-20 mx-auto rounded-full relative overflow-hidden shadow-lg border-4 border-red-500">

            {/* IMAGE */}
            <img
              src="https://i.ibb.co.com/LMfX884/1776419350893.jpg"
              alt="Developer"
              className="w-full h-full object-cover rounded-full absolute inset-0 
                        opacity-0 group-hover:opacity-100 transition duration-500"
            />

            {/* ICON */}
            <div className="absolute inset-0 flex items-center justify-center 
                            bg-gradient-to-br from-red-500 to-pink-500 
                            text-white text-3xl 
                            opacity-100 group-hover:opacity-0 transition duration-500">
              <GrPersonalComputer />
            </div>

          </div>

          {/* Name */}
          <h3 className="mt-5 text-xl md:text-2xl font-semibold text-gray-800">
            {content.name}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-700 mt-1 px-4 py-2 rounded-full bg-red-200 inline-block">{content.role}</p>

          {/* Quote */}
          <p className="mt-4 text-gray-600 italic text-sm sm:text-base max-w-xl mx-auto">
            “{content.quote}”
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-5 mt-6 text-xl">
            <a
              href="https://facebook.com/kh.rehan207"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-red-100 hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.linkedin.com/in/kh-rehan207/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-red-100 hover:bg-blue-600 hover:text-white transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://kh-rehan-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-red-100 hover:bg-gray-800 hover:text-white transition"
            >
              <FaGithub />
            </a>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* Support Box */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 text-green-700 text-sm sm:text-base leading-relaxed">
            {content.supportText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevSupportSection;
