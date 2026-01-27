import { useState } from "react";
import { FaTint, FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const BecomeDonor = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    upazila: "Sandwip",
    union: "",
  });

  const unions = [
    { bn: "আমানউল্লাহ", en: "Amanullah" },
    { bn: "আজিমপুর", en: "Azimpur" },
    { bn: "বাউরিয়া", en: "Bauria" },
    { bn: "দীঘাপাড়", en: "Digghapar" },
    { bn: "গাছুয়া", en: "Gachhua" },
    { bn: "হারামিয়া", en: "Haramia" },
    { bn: "হারিসপুর", en: "Harispur" },
    { bn: "কালাপানিয়া", en: "Kalapania" },
    { bn: "মগধরা", en: "Magdhara" },
    { bn: "মাইটভাঙ্গা", en: "Maitbhanga" },
    { bn: "মুসাপুর", en: "Musapur" },
    { bn: "রহমতপুর", en: "Rahmatpur" },
    { bn: "সন্তোষপুর", en: "Santoshpur" },
    { bn: "সারিকাইত", en: "Sarikait" },
    { bn: "উড়িরচর", en: "Urirchar" },
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donor Data:", formData);
    // backend POST api call here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FaTint className="text-red-600 text-4xl mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-red-600">
            {language === "bn" ? "রক্তদাতা হন" : "Become a Blood Donor"}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "bn"
              ? "আপনার একটি সিদ্ধান্তই বাঁচাতে পারে একটি জীবন"
              : "Your single decision can save a life"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "bn" ? "নাম" : "Full Name"}
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={language === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "bn" ? "মোবাইল নম্বর" : "Phone Number"}
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
            </label>
            <select
              name="bloodGroup"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            >
              <option value="">
                {language === "bn" ? "রক্তের গ্রুপ নির্বাচন করুন" : "Select Blood Group"}
              </option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {language === "bn" ? "উপজেলা" : "Upazila"}
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value="Sandwip"
                  disabled
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {language === "bn" ? "ইউনিয়ন" : "Union"}
              </label>
              <select
                name="union"
                required
                value={formData.union}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">
                  {language === "bn" ? "ইউনিয়ন নির্বাচন করুন" : "Select Union"}
                </option>
                {unions.map((u, index) => (
                  <option key={index} value={u.en}>
                    {language === "bn" ? u.bn : u.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            {language === "bn" ? "রেজিস্ট্রেশন করুন" : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonor;
