const UrgentBloodRequests = ({ language = "bn" }) => {

  
  const content = {
    bn: {
      title: "জরুরি রক্তের অনুরোধ",
      subtitle: "এই মুহূর্তে রক্ত প্রয়োজন — আপনার সহায়তায় বাঁচতে পারে একটি জীবন",
      blood: "রক্তের গ্রুপ",
      patient: "রোগীর নাম",
      location: "ইউনিয়ন",
      contact: "যোগাযোগ",
      donate: "রক্ত দিতে যোগাযোগ করুন",
      urgent: "জরুরি",
    },
    en: {
      title: "Urgent Blood Requests",
      subtitle: "Blood needed urgently — your help can save a life",
      blood: "Blood Group",
      patient: "Patient Name",
      location: "Union",
      contact: "Contact",
      donate: "Contact to Donate",
      urgent: "Urgent",
    },
  };

  const t = content[language];

  // dummy data (later backend/API)
  const requests = [
    {
      id: 1,
      blood: "O+",
      patient: language === "bn" ? "আব্দুল করিম" : "Abdul Karim",
      union: language === "bn" ? "উড়িরচর" : "Urirchar",
      phone: "01XXXXXXXXX",
    },
    {
      id: 2,
      blood: "A-",
      patient: language === "bn" ? "রেহানা বেগম" : "Rehana Begum",
      union: language === "bn" ? "সন্তোষপুর" : "Santoshpur",
      phone: "01XXXXXXXXX",
    },
    {
      id: 3,
      blood: "B+",
      patient: language === "bn" ? "মোঃ হাসান" : "Md. Hasan",
      union: language === "bn" ? "হারামিয়া" : "Haramia",
      phone: "01XXXXXXXXX",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-white via-red-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {t.title}
          </h2>
          <p className="mt-3 text-gray-600">{t.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="relative bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500"
            >
              {/* Urgent badge */}
              <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                {t.urgent}
              </span>

              <h3 className="text-2xl font-bold text-red-600 mb-3">
                {req.blood}
              </h3>

              <p className="text-gray-700">
                <strong>{t.patient}:</strong> {req.patient}
              </p>

              <p className="text-gray-700">
                <strong>{t.location}:</strong> {req.union}
              </p>

              <p className="text-gray-700">
                <strong>{t.contact}:</strong> {req.phone}
              </p>

              <a
                href={`tel:${req.phone}`}
                className="mt-4 inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
              >
                {t.donate}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrgentBloodRequests;
