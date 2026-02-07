import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../../context/LanguageContext";
import useAxios from "../../Hooks/useAxios";
import EmergencyBloodCard from "../../components/EmargencyBloodCard/EmergencyBloodCard";

const AllBloodRequest = () => {
    const { language } = useLanguage();
    const axiosInstance = useAxios();

    const { data: requests = [] } = useQuery({
        queryKey: ["urgent-blood-requests"],
        queryFn: async () => {
        const res = await axiosInstance.get(
            "/blood-requests"
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

            </div>
        </section>
    );
}

export default AllBloodRequest
