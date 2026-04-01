import { FaFacebook, FaGithub, FaLinkedin, FaWeebly } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
// import { useEffect, useState } from "react";

// ⚠️ IMPORTANT:
// This uses CountAPI (free public API) for live visitor count
// No backend needed ✅

const DevSupportSection = ({ language }) => {
  const isBangla = language === "bn";

  const content = {
    title: isBangla
      ? "ডেভেলপমেন্ট ও কারিগরি সহযোগিতা"
      : "Development & Technical Support",

    description: isBangla
      ? "এই রক্তদান প্ল্যাটফর্মটি মানুষের জীবন বাঁচানোর লক্ষ্য নিয়ে তৈরি করা হয়েছে। আমরা নিয়মিত নতুন ফিচার যুক্ত করে এটিকে আরও উন্নত করার চেষ্টা করছি।"
      : "This blood donation platform is built to help save lives. We are continuously working to improve it with new features.",

    subTitle: isBangla ? "ডেভেলপমেন্ট ও কারিগরি সহযোগিতায়" : "Development & Technical Support",

    name: isBangla ? "কে এইচ রিহান " : "K.H. Rehan",
    developerText: isBangla ? "জনদুর্ভোগ লাঘবে আমার একটি ক্ষুদ্র প্রয়াস। " : "A humble effort to ease public suffering",

    supportText: isBangla
      ? "এই সিস্টেমটির ডেভেলপমেন্ট নিয়ে আমরা কাজ করে যাচ্ছি, তাই সকলের সহযোগিতা কাম্য।"
      : "We are continuously working on improving this system, so your support is highly appreciated.",

    visitors: isBangla ? "মোট ভিজিটর" : "Total Visitors",
  };

  // const [visitors, setVisitors] = useState(0);

  // useEffect(() => {

  //   const namespace = "roktodan";
  //   const key = "main-site";

  //   fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVisitors(data.value);
  //     })
  //     .catch(() => {
  //       console.log("Visitor count error");
  //     });
  // }, []);

  return (
    <div className="w-full py-16 bg-linear-to-br from-red-50 via-white to-red-100">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-red-600 mb-4">
          {content.title}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          {content.description}
        </p>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-center text-center border border-red-100 hover:shadow-red-200 transition duration-300">

          {/* SubTitle */}
          <p className="text-lg text-green-400 mb-4 italic mt-2">
            "{content.subTitle}"
          </p>
          {/* Developer Name */}
          <h3 className="text-xl md:text-2xl font-semibold text-green-600">
            {content.name}
          </h3>
          {/* Developer Quote */}
          <p className="text-lg text-gray-600 italic mt-2">
            "{content.developerText}"
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 mt-5 text-2xl text-gray-600">
            <a href="https://facebook.com/kh.rehan207" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:scale-125 transition duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/kh-rehan207/" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:scale-125 transition duration-300" />
            </a>
            <a href="https://kh-rehan-portfolio.netlify.app/" target="_blank" rel="noreferrer">
              <GrPersonalComputer className="hover:scale-125 transition duration-300" />
            
            </a>
          </div>

          {/* Support Text */}
          <p className="mt-6 text-green-600 bg-green-100 px-6 py-2 rounded-full border-2 border-green-300 max-w-2xl leading-relaxed">
            {content.supportText}
          </p>

          {/* Visitor Badge */}
          {/* <div className="mt-10">
            <div className="bg-linear-to-r from-green-500 to-green-600 text-white px-8 py-2 rounded-full text-lg font-semibold shadow-lg animate-pulse">
              {content.visitors}: {visitors.toLocaleString()}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DevSupportSection;
