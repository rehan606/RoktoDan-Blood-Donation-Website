import {Link} from "react-router";
import { useLanguage } from "../../context/LanguageContext";

const DonorRegistration = () => {

  const { language } = useLanguage();


  return (
    <section className="py-20 bg-linear-to-br from-red-50 via-white to-red-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {language === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Register as a Donor" }
            
          </h2>
          <p className="mt-3 text-gray-600">
            {language === "bn" ? "আপনার একটি সিদ্ধান্ত বাঁচাতে পারে একটি জীবন" : "One decision can save a life" }
          </p>
        </div>
       

        <div className=" flex justify-center">
          <Link
            to="/register-donor"
            className=" px-10 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-center"
          >
            {language === "bn" ? "নিবন্ধন করুন" : "Register Now" }
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DonorRegistration;
