const Testimonials = ({ language = "bn" }) => {
  const content = {
    bn: {
      title: "মানুষের মুখে RoktoDan",
      subtitle:
        "রক্তদাতা ও রক্তগ্রহীতাদের বাস্তব অভিজ্ঞতা যা অনুপ্রেরণা দেয়",
    },
    en: {
      title: "What People Say About RoktoDan",
      subtitle:
        "Real stories from donors and receivers that inspire others",
    },
  };

  const testimonials = [
    {
      nameBn: "মোঃ রাশেদ",
      nameEn: "Md. Rashed",
      roleBn: "রক্তদাতা",
      roleEn: "Blood Donor",
      messageBn:
        "RoktoDan এর মাধ্যমে আমি খুব সহজে একজন রোগীর সাথে যোগাযোগ করতে পেরেছি। আমার রক্তদানের অভিজ্ঞতা সত্যিই অসাধারণ।",
      messageEn:
        "Through RoktoDan, I was able to connect with a patient very easily. Donating blood felt truly meaningful.",
    },
    {
      nameBn: "রুবিনা আক্তার",
      nameEn: "Rubina Akter",
      roleBn: "রক্তগ্রহীতা",
      roleEn: "Blood Receiver",
      messageBn:
        "জরুরি মুহূর্তে RoktoDan আমাদের জন্য আশীর্বাদ হয়ে এসেছে। সময়মতো রক্ত পেয়ে আমার মায়ের জীবন রক্ষা পেয়েছে।",
      messageEn:
        "In an emergency, RoktoDan became a blessing for us. Timely blood donation saved my mother’s life.",
    },
    {
      nameBn: "মোঃ সাকিব",
      nameEn: "Md. Sakib",
      roleBn: "স্বেচ্ছাসেবক",
      roleEn: "Volunteer",
      messageBn:
        "এই প্ল্যাটফর্মটি আমাদের সমাজে রক্তদানের সংস্কৃতি গড়ে তুলতে গুরুত্বপূর্ণ ভূমিকা রাখছে।",
      messageEn:
        "This platform plays an important role in building a blood donation culture in our community.",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-red-50 via-white to-red-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {content[language].title}
          </h2>
          <p className="mt-3 text-gray-600">
            {content[language].subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic mb-6">
                “
                {language === "bn"
                  ? item.messageBn
                  : item.messageEn}
                ”
              </p>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-red-600">
                  {language === "bn" ? item.nameBn : item.nameEn}
                </h4>
                <span className="text-sm text-gray-500">
                  {language === "bn" ? item.roleBn : item.roleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
