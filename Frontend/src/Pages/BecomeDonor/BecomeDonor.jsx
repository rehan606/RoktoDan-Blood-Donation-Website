import { useState } from "react";
import {FaTint, FaUser, FaPhoneAlt,} from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import useAuth from "../../Hooks/useAuth";
import useUnions from "../../Hooks/useUnions";
import useBloodGroups from "../../Hooks/useBloodGroups";

const BecomeDonor = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { unions, } = useUnions();
  const {bloodGroups, } = useBloodGroups();

  

  const [formData, setFormData] = useState({
    donorType: "old", // new | old (default old)
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    bloodGroup: "",
    lastDonationDate: "",
    upazila: "Sandwip",
    union: "",
    available: true, // backend auto-calc করবে চাইলে
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const donorPayload = {
      ...formData,
      role: "donor",
      createdAt: new Date(),
    };

    if (formData.donorType === "new") {
      delete donorPayload.lastDonationDate;
    }

    console.log("Donor Payload:", donorPayload);
    // POST to backend: /donors
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg ">
        {/* Header */}
        <div className="text-center mb-8 bg-linear-to-br from-red-500 via-white to-red-500 py-10 rounded-2xl">
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

        <form onSubmit={handleSubmit} className="space-y-5 px-8 pb-10">
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
                disabled
                value={formData.name}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <input type="hidden" name="name" value={formData.name} />
            <input type="hidden" name="email" value={formData.email} />
          </div>

          <div className="flex items-center justify-between gap-4"> 
            {/* Phone */}
            <div className="flex-1/2">
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
            <div className="flex-1/2">
              <label className="block text-sm font-medium mb-1">
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </label>
              <select
                name="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border px-2 py-3 rounded-lg"
              >
                <option value="">
                  {language === "bn"
                    ? "রক্তের গ্রুপ নির্বাচন করুন"
                    : "Select Blood Group"}
                </option>
                {bloodGroups.map((bg) => (
                  <option key={bg.value} value={bg.value}>
                    {bg.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Last Donation Date (Old Donor only) */}
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
                className="w-full border p-2 rounded-lg"
              />
            </div>
          )}

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {language === "bn" ? "উপজেলা" : "Upazila"}
              </label>
              <div className="relative">
                <FaLocationDot className="absolute left-3 top-3 text-gray-400" />
                <input
                  disabled
                  value={language === "bn" ? "সন্দ্বীপ" : "Sandwip"}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <input type="hidden" name="upazila" value="Sandwip" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {language === "bn" ? "ইউনিয়ন" : "Union"}
              </label>
              <div className="relative flex items-center">
                <RiUserLocationFill className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="union"
                  required
                  value={formData.union}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg"
                >
                  <option value="">
                    {language === "bn"
                      ? "ইউনিয়ন নির্বাচন করুন"
                      : "Select Union"}
                  </option>
                  {unions.map((u, i) => (
                    <option key={i} value={u.en}>
                      {language === "bn" ? u.bn : u.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            {language === "bn" ? "নিবন্ধন করুন" : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonor;
