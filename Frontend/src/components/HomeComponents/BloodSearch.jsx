import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import bgImage from "../../assets/images/bgImage.jpg";

const BloodSearch = () => {
  const { language } = useLanguage();
  const [bloodGroup, setBloodGroup] = useState("");
  const [union, setUnion] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const unions = [
    { id: 1, bn: "আমানউল্লাহ ইউনিয়ন", en: "Amanullah Union" },
    { id: 2, bn: "আজিমপুর ইউনিয়ন", en: "Azimpur Union" },
    { id: 3, bn: "বাউরিয়া ইউনিয়ন", en: "Bauria Union" },
    { id: 4, bn: "দীঘাপাড় ইউনিয়ন", en: "Digghapar Union" },
    { id: 5, bn: "গাছুয়া ইউনিয়ন", en: "Gachhua Union" },
    { id: 6, bn: "হারামিয়া ইউনিয়ন", en: "Haramia Union" },
    { id: 7, bn: "হরিসপুর ইউনিয়ন", en: "Harispur Union" },
    { id: 8, bn: "কালাপানিয়া ইউনিয়ন", en: "Kalapania Union" },
    { id: 9, bn: "মাগধারা ইউনিয়ন", en: "Magdhara Union" },
    { id: 10, bn: "মাইতভাঙ্গা ইউনিয়ন", en: "Maitbhanga Union" },
    { id: 11, bn: "মুসাপুর ইউনিয়ন", en: "Musapur Union" },
    { id: 12, bn: "রহমতপুর ইউনিয়ন", en: "Rahmatpur Union" },
    { id: 13, bn: "সন্তোষপুর ইউনিয়ন", en: "Santoshpur Union" },
    { id: 14, bn: "সারিকাইত ইউনিয়ন", en: "Sarikait Union" },
    { id: 15, bn: "উড়িরচর ইউনিয়ন", en: "Urirchar Union" },
  ];

  return (
    <section className="bg-cover bg-center bg-no-repeat py-20" style={{backgroundImage: `url(${bgImage})`}}>
      <div className="max-w-5xl mx-auto px-4">

         <h2 className="text-3xl text-white font-bold text-center mb-6">
            {language === "bn" ? "রক্ত অনুসন্ধান করুন" : "Search Blood Donor"}
          </h2>

        <div className="bg-white  rounded-2xl shadow-md p-6">
          {/* <h2 className="text-2xl font-bold text-center mb-6">
            {language === "bn" ? "রক্ত অনুসন্ধান করুন" : "Search Blood Donor"}
          </h2> */}

          {/* Row Wise Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">
                  {language === "bn" ? "গ্রুপ নির্বাচন করুন" : "Select Blood Group"}
                </option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Union */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {language === "bn" ? "ইউনিয়ন" : "Union"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                value={union}
                onChange={(e) => setUnion(e.target.value)}
              >
                <option className="p-4" value="">
                  {language === "bn" ? "ইউনিয়ন নির্বাচন করুন" : "Select Union"}
                </option>
                {unions.map((u) => (
                  <option key={u.id} value={language === "bn" ? u.bn : u.en}>
                    {language === "bn" ? u.bn : u.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <div className="mt-6 text-center">
              <button className="bg-red-600 w-full hover:bg-red-500 text-white px-10 py-2.5 rounded-lg font-semibold transition cursor-pointer">
                {language === "bn" ? "খুঁজুন" : "Search"}
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default BloodSearch;
