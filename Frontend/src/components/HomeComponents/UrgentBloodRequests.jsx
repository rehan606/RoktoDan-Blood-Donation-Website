import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmergencyBloodCard from "../EmargencyBloodCard/EmergencyBloodCard";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from 'react-router';


const UrgentBloodRequests = ( ) => {
    const { language } = useLanguage();

  const { data: requests = [] } = useQuery({
    queryKey: ["urgent-blood-requests"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/blood-requests/latest"
      );
      return res.data;
    },
  });

  const posts = requests || [];
  console.log("Post data", posts.length)

  // const content = {
  //   bn: {
  //     title: "জরুরি রক্তের অনুরোধ",
  //     subtitle: "এই মুহূর্তে রক্ত প্রয়োজন — আপনার সহায়তায় বাঁচতে পারে একটি জীবন",
  //     blood: "রক্তের গ্রুপ",
  //     patient: "রোগীর নাম",
  //     location: "ইউনিয়ন",
  //     contact: "যোগাযোগ",
  //     donate: "রক্ত দিতে যোগাযোগ করুন",
  //     urgent: "জরুরি",
  //   },
  //   en: {
  //     title: "Urgent Blood Requests",
  //     subtitle: "Blood needed urgently — your help can save a life",
  //     blood: "Blood Group",
  //     patient: "Patient Name",
  //     location: "Union",
  //     contact: "Contact",
  //     donate: "Contact to Donate",
  //     urgent: "Urgent",
  //   },
  // };




  return (
    <section className="py-20 bg-linear-to-br from-white via-red-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {language === "bn" ? "জরুরি রক্তের অনুরোধ" : "Urgent Blood Requests" }
          </h2>
          <p className="mt-3 text-gray-600">{language === "bn" ? "এই মুহূর্তে রক্ত প্রয়োজন — আপনার সহায়তায় বাঁচতে পারে একটি জীবন" : "Blood needed urgently — your help can save a life" }</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <EmergencyBloodCard key={idx} post={post} language={language}  />
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-10">
          <Link
            to="/blood-requests"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            {language === "bn" ? "সব অনুরোধ দেখুন" : "See All Requests"}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default UrgentBloodRequests;
