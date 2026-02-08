import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Contact = () => {
  const { language } = useLanguage();

  const text = {
    bn: {
      title: "যোগাযোগ করুন",
      subtitle: " রক্তদান টিমের সাথে যোগাযোগ করুন",
      addressTitle: "📌 আমাদের ঠিকানা",
      messageTitle: "✉️ আমাদের মেসেজ পাঠান",
      name: "নাম",
      phone: "মোবাইল",
      email: "ইমেইল",
      message: "বার্তা",
      namePlaceholder: "আপনার নাম লিখুন",
      phonePlaceholder: "01XXXXXXXXX",
      emailPlaceholder: "example@email.com",
      messagePlaceholder: "আপনার বার্তা লিখুন...",
      send: "পাঠান",
      address: "সন্দ্বীপ , চট্টগ্রাম , বাংলাদেশ । ",
      quote:
        "🩸 রক্তদান একটি মহান মানবিক কাজ। আপনার একটি সিদ্ধান্তই বাঁচাতে পারে একটি জীবন।",
      footer: "Saving Lives Together",
    },

    en: {
      title: "Contact Us",
      subtitle: "Contact with RoktoDan Team",
      addressTitle: "📌 Our Address",
      messageTitle: "✉️ Send Us a Message",
      name: "Name",
      phone: "Phone",
      email: "Email",
      message: "Message",
      namePlaceholder: "Enter your name",
      phonePlaceholder: "01XXXXXXXXX",
      emailPlaceholder: "example@email.com",
      messagePlaceholder: "Write your message...",
      send: "Send",
      address: "Sandwip, Chattogram, Bangladesh",
      quote:
        "🩸 Blood donation is a noble humanitarian act. One decision can save a life.",
      footer: "Saving Lives Together",
    },
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600">
            {t.title}
          </h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t.addressTitle}
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500" />
                {t.address}
              </p>

              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-500" />
                +880 17XXXXXXXX
              </p>

              <p className="flex items-center gap-3">
                <FaEnvelope className="text-red-500" />
                support@roktodan.com
              </p>
            </div>

            <div className="mt-6 bg-red-50 p-4 rounded-lg text-sm text-gray-700">
              <p>{t.quote}</p>
            </div>
            
            <div className="w-full overflow-hidden rounded-lg mt-4">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29479.877580933262!2d91.465730264959!3d22.54224597592269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acb5b5f0111e71%3A0x505ea6f5b085d268!2sGasua!5e0!3m2!1sen!2sbd!4v1770574589769!5m2!1sen!2sbd" width="600" height="250"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t.messageTitle}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.name}
                </label>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.phone}
                </label>
                <input
                  type="text"
                  placeholder={t.phonePlaceholder}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.email}
                </label>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.message}
                </label>
                <textarea
                  rows="4"
                  placeholder={t.messagePlaceholder}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {t.send} <FaHeart />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} RoktoDan — {t.footer} 🩸
        </p>
      </div>
    </div>
  );
};

export default Contact;
