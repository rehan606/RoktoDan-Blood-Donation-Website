import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Eligibility = () => {
  const { language } = useLanguage();

  const conditions = {
    bn: {
      title: "রক্তদানের শর্তসমূহ",
      subtitle:
        "নিরাপদ ও সুস্থ রক্তদানের জন্য নিচের শর্তগুলো অবশ্যই পূরণ করতে হবে",
      list: [
        "রক্তদাতার বয়স অবশ্যই ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে",
        "ওজন কমপক্ষে ৫০ কেজি হতে হবে",
        "রক্তচাপ ও হিমোগ্লোবিন স্বাভাবিক থাকতে হবে",
        "গত ৩ মাসের মধ্যে রক্তদান করা যাবে না",
        "জ্বর, সর্দি, কাশি বা কোনো সংক্রমণ থাকলে রক্তদান করা যাবে না",
        "গর্ভবতী বা সদ্য সন্তান প্রসবকারী নারী রক্তদান করতে পারবেন না",
        "হেপাটাইটিস বি/সি, এইডস বা মারাত্মক রোগ থাকলে রক্তদান নিষিদ্ধ",
        "রক্তদানের আগে পর্যাপ্ত ঘুম ও হালকা খাবার গ্রহণ করা জরুরি",
      ],
      note:
        "⚠️ রক্তদান একটি মহান মানবিক কাজ, তবে নিজের ও গ্রহীতার নিরাপত্তাই সর্বাধিক গুরুত্বপূর্ণ।",

      description: "রক্তদানের শর্তগুলো পূরণ হয়ে থাকলে যেকোনো সুস্থ ব্যক্তি তিন-চার মাস পর এক ব্যাগ (৪৫০ মিলিলিটার) রক্ত দিতে পারবেন। এক ব্যাগ রক্ত শরীরের মোট রক্তের মাত্র ২ থেকে ৩ শতাংশ। এই পরিমাণ রক্ত কাউকে দিলে কোনো ক্ষতির আশঙ্কা নেই। প্রত্যেক সুস্থ মানুষের শরীরের লোহিত রক্তকণিকাগুলো স্বাভাবিক প্রক্রিয়ায় ৮০ থেকে ১২০ দিন পরপর ধ্বংস হয় এবং প্রতিনিয়ত নতুন নতুন রক্তকণিকা তৈরি হতে থাকে।"
    },
    en: {
      title: "Blood Donation Eligibility",
      subtitle:
        "To ensure safe and healthy blood donation, the following conditions must be met",
      list: [
        "Donor must be between 18 and 60 years of age",
        "Minimum weight should be at least 50 kg",
        "Blood pressure and hemoglobin level must be normal",
        "Donation gap must be at least 3 months",
        "Donor should not have fever, cold, cough, or infection",
        "Pregnant or recently delivered women are not eligible",
        "Donors with Hepatitis B/C, AIDS, or serious illness are not allowed",
        "Adequate sleep and light meal before donation is required",
      ],
      note:
        "⚠️ Blood donation is a noble act, but safety of both donor and recipient comes first.",

      description: "If the eligibility conditions are met, any healthy individual can donate one bag (450 ml) of blood every three to four months. One bag of blood constitutes only 2 to 3 percent of the total blood volume in the body. There is no risk of harm to anyone by donating this amount of blood. The red blood cells in a healthy person's body are naturally destroyed every 80 to 120 days, and new red blood cells are continuously produced."
    },
  };

  const t = conditions[language];

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 text-center">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 mt-2 mb-8">
          {t.subtitle}
        </p>

        {/* Conditions List */}
        <ul className="space-y-4 border-t border-zinc-200 pt-10">
          {t.list.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700"
            >
              <FaCheckCircle className="text-red-500 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        
        {/* description: */}
        <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-sm text-gray-700">{t.description}</p>
        </div>
        
        {/* Note */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-gray-700">{t.note}</p>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
