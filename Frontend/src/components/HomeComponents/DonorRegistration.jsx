const DonorRegistration = ({ language = "bn" }) => {
  const unions = {
    bn: [
      "আমেনুল্লাহ",
      "আজিমপুর",
      "বাউরিয়া",
      "দীঘাপাড়",
      "গাছুয়া",
      "হারামিয়া",
      "হারিসপুর",
      "কালাপানিয়া",
      "মাগধারা",
      "মাইতভাঙ্গা",
      "মুসাপুর",
      "রহমতপুর",
      "সন্তোষপুর",
      "সারিকাইত",
      "উড়িরচর",
    ],
    en: [
      "Amanullah",
      "Azimpur",
      "Bauria",
      "Digghapar",
      "Gachhua",
      "Haramia",
      "Harispur",
      "Kalapania",
      "Magdhara",
      "Maitbhanga",
      "Musapur",
      "Rahmatpur",
      "Santoshpur",
      "Sarikait",
      "Urirchar",
    ],
  };

  const content = {
    bn: {
      title: "রক্তদাতা হিসেবে নিবন্ধন করুন",
      subtitle: "আপনার একটি সিদ্ধান্ত বাঁচাতে পারে একটি জীবন",
      name: "পূর্ণ নাম",
      bloodGroup: "রক্তের গ্রুপ",
      phone: "মোবাইল নাম্বার",
      location: "ইউনিয়ন নির্বাচন করুন",
      lastDonation: "সর্বশেষ রক্তদান তারিখ",
      submit: "নিবন্ধন করুন",
    },
    en: {
      title: "Register as a Donor",
      subtitle: "One decision can save a life",
      name: "Full Name",
      bloodGroup: "Blood Group",
      phone: "Phone Number",
      location: "Select Union",
      lastDonation: "Last Donation Date",
      submit: "Register Now",
    },
  };

  const t = content[language];

  return (
    <section className="py-20 bg-linear-to-br from-red-50 via-white to-red-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {t.title}
          </h2>
          <p className="mt-3 text-gray-600">{t.subtitle}</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder={t.name}
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400"
            />

            <select className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400">
              <option>{t.bloodGroup}</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (bg) => (
                  <option key={bg}>{bg}</option>
                )
              )}
            </select>

            <input
              type="tel"
              placeholder={t.phone}
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400"
            />

            {/* Union Select */}
            <select className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400">
              <option>{t.location}</option>
              {unions[language].map((union, index) => (
                <option key={index}>{union}</option>
              ))}
            </select>

            <input
              type="date"
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonorRegistration;
