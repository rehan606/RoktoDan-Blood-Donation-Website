import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import DonorCard from "../../components/DonorCard/DonorCard";
import useUnions from "../../Hooks/useUnions";
import useBloodGroups from "../../Hooks/useBloodGroups";
// import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Donors = () => {
  const { language } = useLanguage();
  const { unions } = useUnions();
  const { bloodGroups } = useBloodGroups();

  const [filters, setFilters] = useState({
    bloodGroup: "",
    union: "",
  });

  // ✅ TanStack Query
  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["donors", filters],
    queryFn: async () => {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.union) params.union = filters.union;

      const res = await axios.get("http://localhost:5000/donors", { params });

      // ⚠️ backend যদি { donors: [] } পাঠায়
      return res.data.donors || res.data;

      
    },
  });
  console.log('Donors', donors)

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          {language === "bn" ? "রক্তদাতাদের তালিকা" : "Blood Donors"}
        </h2>

        {/* 🔍 Search Section */}
        <div className="bg-white rounded-xl shadow p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Blood Group */}
            <div>
              <label className="text-sm font-semibold">
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={filters.bloodGroup}
                onChange={(e) =>
                  setFilters({ ...filters, bloodGroup: e.target.value })
                }
              >
                <option value="">
                  {language === "bn" ? "সব গ্রুপ" : "All Groups"}
                </option>
                {bloodGroups.map((bg) => (
                  <option key={bg.value} value={bg.value}>
                    {bg.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Union */}
            <div>
              <label className="text-sm font-semibold">
                {language === "bn" ? "ইউনিয়ন" : "Union"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={filters.union}
                onChange={(e) =>
                  setFilters({ ...filters, union: e.target.value })
                }
              >
                <option value="">
                  {language === "bn" ? "সব ইউনিয়ন" : "All Unions"}
                </option>
                {unions.map((u) => (
                  <option key={u.id} value={u.en}>
                    {language === "bn" ? u.bn : u.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Button  */}
            {/* Button */}
            <button className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
              {language === "bn" ? "খুঁজুন" : "Search"}
            </button>

            {/* Info */}
            {/* <div className="text-sm text-gray-500">
              {language === "bn"
                ? "ফিল্টার পরিবর্তন করলেই ফলাফল আপডেট হবে"
                : "Results update automatically"}
            </div> */}
          </div>
        </div>

        {/* 👥 Donor List */}
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(donors) && donors.length > 0 ? (
              donors.map((donor) => (
                <DonorCard key={donor._id} donor={donor} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                {language === "bn"
                  ? "কোনো রক্তদাতা পাওয়া যায়নি"
                  : "No donors found"}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Donors;
