import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../../context/LanguageContext";
import bgImage from "../../assets/images/bgImage.jpg";
import useBloodGroups from "../../Hooks/useBloodGroups";
import useUnions from "../../Hooks/useUnions";
import DonorCard from "../DonorCard/DonorCard";
import useAxios from "../../Hooks/useAxios";
import { FiRefreshCw } from "react-icons/fi"; // reset icon

// 🔹 API fetcher
const fetchDonors = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const axiosInstance = useAxios();

  const query = new URLSearchParams({
    bloodGroup: params.bloodGroup,
    union: params.union,
    page: 1,
  }).toString();

  const res = await axiosInstance.get(`/donors?${query}`);
  return res.data; // axios response
};

const BloodSearch = () => {
  const { language } = useLanguage();
  const { bloodGroups } = useBloodGroups();
  const { unions } = useUnions();

  const [bloodGroup, setBloodGroup] = useState("");
  const [union, setUnion] = useState("");
  const [searchParams, setSearchParams] = useState(null);

  // 🔹 TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["donors", searchParams],
    queryFn: fetchDonors,
    enabled: !!searchParams,
  });

  const results = data?.data || [];

  const handleSearch = () => {
    setSearchParams({
      bloodGroup,
      union,
    });
  };

  const handleReset = () => {
    setBloodGroup("");
    setUnion("");
    setSearchParams(null); // query disabled
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          {language === "bn" ? "রক্ত অনুসন্ধান করুন" : "Search Blood Donor"}
        </h2>

        {/* 🔍 Search Box */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-3"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">
                  {language === "bn"
                    ? "গ্রুপ নির্বাচন করুন"
                    : "Select Blood Group"}
                </option>
                {bloodGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.value}
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
                className="w-full border rounded-lg px-3 py-3"
                value={union}
                onChange={(e) => setUnion(e.target.value)}
              >
                <option value="">
                  {language === "bn"
                    ? "ইউনিয়ন নির্বাচন করুন"
                    : "Select Union"}
                </option>
                {unions.map((u) => (
                  <option key={u.id} value={u.en}>
                    {language === "bn" ? u.bn : u.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg font-semibold transition cursor-pointer"
              >
                {language === "bn" ? "খুঁজুন" : "Search"}
              </button>

              { results.length > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-black p-2.5 cursor-pointer rounded-lg"
                  title={language === "bn" ? "রিসেট" : "Reset"}
                >
                  <FiRefreshCw size={20} /> {language === "bn" ? "রিসেট" : "Reset"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 🔽 Results */}
        <div className="mt-8">
          {isLoading && (
            <p className="text-center text-white">Loading...</p>
          )}

          {isError && (
            <p className="text-center text-white">Something went wrong!</p>
          )}

          {!isLoading && searchParams && results.length === 0 && (
            <p className="text-center text-white">
              {language === "bn" ? "কোনো ডোনার পাওয়া যায়নি" : "No donor found"}
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((donor) => (
                <DonorCard key={donor.email} donor={donor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BloodSearch;
