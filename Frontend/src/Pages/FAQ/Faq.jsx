import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const faqs = {
  bn: [
    {
      question: "রক্তদান কি নিরাপদ?",
      answer:
        "হ্যাঁ, রক্তদান সম্পূর্ণ নিরাপদ। প্রতিবার রক্তদানের জন্য নতুন ও জীবাণুমুক্ত সরঞ্জাম ব্যবহার করা হয়।",
    },
    {
      question: "কতদিন পর পর রক্তদান করা যায়?",
      answer:
        "একজন সুস্থ পুরুষ ৩ মাস পর পর এবং একজন সুস্থ নারী ৪ মাস পর পর রক্তদান করতে পারেন।",
    },
    {
      question: "রক্তদান করতে কত সময় লাগে?",
      answer:
        "সাধারণত ১০–১৫ মিনিটের মধ্যেই রক্তদান সম্পন্ন হয়।",
    },
    {
      question: "রক্তদান করলে শরীর দুর্বল হয়ে যায় কি?",
      answer:
        "না, রক্তদানের পর শরীর দ্রুত নতুন রক্তকণিকা তৈরি করে এবং কোনো স্থায়ী দুর্বলতা হয় না।",
    },
    {
      question: "রক্তদানের আগে কী করা উচিত?",
      answer:
        "পর্যাপ্ত ঘুম, হালকা খাবার গ্রহণ এবং পর্যাপ্ত পানি পান করা উচিত।",
    },
    {
      question: "রক্তদানের পর কী করা উচিত?",
      answer:
        "বেশি পানি পান করতে হবে, ভারী কাজ এড়িয়ে চলতে হবে এবং বিশ্রাম নিতে হবে।",
    },
  ],

  en: [
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is completely safe. Sterile and disposable equipment is used every time.",
    },
    {
      question: "How often can someone donate blood?",
      answer:
        "A healthy male can donate every 3 months and a healthy female every 4 months.",
    },
    {
      question: "How long does blood donation take?",
      answer:
        "The actual donation process usually takes 10–15 minutes.",
    },
    {
      question: "Does donating blood make the body weak?",
      answer:
        "No, the body quickly replaces donated blood and does not cause long-term weakness.",
    },
    {
      question: "What should I do before donating blood?",
      answer:
        "Get enough sleep, eat light food, and drink plenty of water.",
    },
    {
      question: "What should I do after donating blood?",
      answer:
        "Drink more fluids, avoid heavy work, and take proper rest.",
    },
  ],
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl text-center mx-auto font-bold text-red-600">
          {language === "bn"
            ? "❓ সাধারণ প্রশ্নোত্তর (FAQ)"
            : "❓ Frequently Asked Questions"}
        </h1>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs[language].map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-gray-800">
                {item.question}
              </span>
              <span className="text-red-500 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-4 py-3 text-gray-600 bg-white">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
