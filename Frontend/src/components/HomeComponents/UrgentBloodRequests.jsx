import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import EmergencyBloodCard from "../EmargencyBloodCard/EmergencyBloodCard";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from 'react-router';
import useAxios from "../../Hooks/useAxios";


const UrgentBloodRequests = ( ) => {
    const { language } = useLanguage();
    const axiosInstance = useAxios();

    const { data: requests = [] } = useQuery({
      queryKey: ["urgent-blood-requests"],
      queryFn: async () => {
        const res = await axiosInstance.get(
          "/blood-requests/latest"
        );
        return res.data;
      },
    });

    const posts = requests || [];



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
              to="/all-blood-requests"
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
