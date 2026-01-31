import { useState } from "react";
import { FaTint, FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import useAuth from "../../Hooks/useAuth";

const BecomeDonor = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const upazilaName = language === "bn" ? "সন্দ্বীপ" : "Sandwip";

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    bloodGroup: "",
    donorType: "old", // default
    lastDonationDate: "",
    upazila: "Sandwip",
    union: "",
    isAvailable: true,
  });

  const unions = [
    { bn: "আমানউল্লাহ", en: "Amanullah" },
    { bn: "আজিমপুর", en: "Azimpur" },
    { bn: "বাউরিয়া", en: "Bauria" },
    { bn: "দীর্ঘাপাড়", en: "Dirghapar" },
    { bn: "গাছুয়া", en: "Gachhua" },
    { bn: "হারামিয়া", en: "Haramia" },
    { bn: "হরিশপুর", en: "Harispur" },
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

    const donorData = {
      ...formData,
      lastDonationDate:
        formData.donorType === "old" ? formData.lastDonationDate : null,
      createdAt: new Date(),
    };

    console.log("Donor Data:", donorData);
    // POST donorData to backend
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

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Donor Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === "bn" ? "আপনি কি আগে রক্ত দিয়েছেন ?" : "Donate Blood Before ?"}
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="donorType"
                  value="old"
                  checked={formData.donorType === "old"}
                  onChange={handleChange}
                />
                {language === "bn" ? "হ্যাঁ  " : "Yes"}
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="donorType"
                  value="new"
                  checked={formData.donorType === "new"}
                  onChange={handleChange}
                />
                {language === "bn" ? "না" : "No"}
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "bn" ? "নাম" : "Full Name"}
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                disabled
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "bn" ? "ইমেইল " : "Email"}
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100"
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
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
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">
                {language === "bn" ? "রক্তের গ্রুপ নির্বাচন করুন" : "Select Blood Group"}
              </option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Last Donation Date (Only Old Donor) */}
          {formData.donorType === "old" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {language === "bn"
                  ? "সর্বশেষ রক্তদানের তারিখ"
                  : "Last Blood Donation Date"}
              </label>
              <input
                type="date"
                name="lastDonationDate"
                required
                value={formData.lastDonationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <input disabled value={upazilaName} className="border p-2 rounded-lg bg-gray-100" />

            <select
              name="union"
              required
              value={formData.union}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">
                {language === "bn" ? "ইউনিয়ন নির্বাচন করুন" : "Select Union"}
              </option>
              {unions.map((u, i) => (
                <option key={i} value={u.en}>
                  {language === "bn" ? u.bn : u.en}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full bg-red-600 text-white py-3 rounded-lg">
            {language === "bn" ? "নিবন্ধন করুন" : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonor;
