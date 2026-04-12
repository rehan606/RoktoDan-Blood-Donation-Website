
import { useLanguage } from "../../context/LanguageContext";

const DonationBenefits = () => {


  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
            {/* Content */}
            {language === "bn" ? (
                <>
                <div className="text-center md:w-[500px] mx-auto">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        🩸 রক্ত দানের উপকারিতা
                    </h1>

                    <p className="text-gray-700 mb-6">
                        রক্তদান একটি মহৎ মানবিক কাজ। একজন সুস্থ মানুষ তার সামান্য রক্তদানের
                        মাধ্যমে অন্য একজন মানুষের জীবন বাঁচাতে পারে।
                    </p>
                </div>

                <ul className="space-y-4 text-gray-700 border-t border-zinc-200 pt-10">
                    <li>
                    ✅ <strong>জীবন রক্ষা করে:</strong> এক ব্যাগ রক্ত দিয়ে ৩ জন পর্যন্ত
                    মানুষের জীবন বাঁচানো সম্ভব।
                    </li>
                    <li>
                    ✅ <strong>হৃদরোগের ঝুঁকি কমায়:</strong> শরীরের অতিরিক্ত আয়রন কমাতে
                    সাহায্য করে।
                    </li>
                    <li>
                    ✅ <strong>নতুন রক্তকণিকা তৈরি হয়:</strong> শরীর দ্রুত নতুন রক্ত
                    তৈরি করে।
                    </li>
                    <li>
                    ✅ <strong>শরীর সুস্থ রাখে:</strong> রক্ত সঞ্চালন ভালো হয়।
                    </li>
                    <li>
                    ✅ <strong>বিনামূল্যে স্বাস্থ্য পরীক্ষা:</strong> হিমোগ্লোবিন,
                    রক্তচাপ ইত্যাদি চেক করা হয়।
                    </li>
                    <li>
                    ✅ <strong>মানসিক প্রশান্তি:</strong> কারো জীবন বাঁচানোর আনন্দ
                    আত্মতৃপ্তি এনে দেয়।
                    </li>
                </ul>

                <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-sm text-gray-700">“আপনার এক ফোঁটা রক্ত, দিতে পারে কারো নতুন জীবন।”</p>
                </div>

                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-sm text-gray-700">নিয়মিত রক্তদানে অভ্যস্ত মানুষের উচ্চ রক্তচাপ, ডায়াবেটিস, উচ্চ কোলেস্টেরল, হার্টের রোগের ঝুঁকি কমে।</p>
                </div>

                <p></p>
                </>
            ) : (
                <>
                <div className="text-center md:w-[500px] mx-auto">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        🩸 Benefits of Blood Donation
                    </h1>

                    <p className="text-gray-700 mb-6">
                         Blood donation is a noble humanitarian act. A healthy person can
                    save lives by donating blood.
                    </p>
                </div>
                
                <ul className="space-y-4 text-gray-700 border-t border-zinc-200 pt-10">
                    <li>
                    ✅ <strong>Saves Lives:</strong> One unit of blood can save up to
                    three lives.
                    </li>
                    <li>
                    ✅ <strong>Reduces Heart Disease Risk:</strong> Helps lower excess
                    iron levels.
                    </li>
                    <li>
                    ✅ <strong>Creates New Blood Cells:</strong> Keeps the body fresh
                    and active.
                    </li>
                    <li>
                    ✅ <strong>Improves Health:</strong> Enhances blood circulation.
                    </li>
                    <li>
                    ✅ <strong>Free Health Check:</strong> Includes hemoglobin and
                    blood pressure checks.
                    </li>
                    <li>
                    ✅ <strong>Mental Satisfaction:</strong> Saving lives brings peace
                    and happiness.
                    </li>
                </ul>

                <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-sm text-gray-700">“A drop of your blood can give someone a new life.”</p>
                </div>

                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-sm text-gray-700">"People who regularly donate blood have a reduced risk of high blood pressure, diabetes, high cholesterol, and heart disease."</p>
                </div>
                </>
            )}
        </div>
    </div>
  );
};

export default DonationBenefits;
