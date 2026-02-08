import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../../context/LanguageContext";
import bgImage from "../../assets/images/bgImage.jpg";
import useBloodGroups from "../../Hooks/useBloodGroups";
import useUnions from "../../Hooks/useUnions";
import DonorCard from "../DonorCard/DonorCard";

// 🔹 API fetcher (SAFE + ENCODED)
const fetchDonors = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const query = new URLSearchParams({
    bloodGroup: params.bloodGroup,
    union: params.union,
    page: 1,
  }).toString();

  const res = await fetch(`http://localhost:5000/donors?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch donors");
  }

  return res.json();
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
    enabled: !!searchParams, // 🔥 button click ছাড়া call হবে না
  });

  const results = data?.data || [];

  const handleSearch = () => {
    setSearchParams({
      bloodGroup,
      union,
    });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Button */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
                className="bg-red-600 w-full hover:bg-red-500 text-white py-2.5 rounded-lg font-semibold"
              >
                {language === "bn" ? "খুঁজুন" : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* 🔽 Results */}
        <div className="mt-8">
          {isLoading && (
            <p className="text-center text-white">Loading...</p>
          )}

          {isError && (
            <p className="text-center text-white">
              Something went wrong!
            </p>
          )}

          {!isLoading && searchParams && results.length === 0 && (
            <p className="text-center text-white">
              {language === "bn"
                ? "কোনো ডোনার পাওয়া যায়নি"
                : "No donor found"}
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((donor) => (
                <DonorCard donor={donor} />

                // <div
                //   key={donor.email}
                //   className="bg-white p-5 rounded-xl shadow text-center"
                // >
                //   <img
                //     src={donor.image || "/profile-icon.png"}
                //     alt={donor.name}
                //     className="w-20 h-20 mx-auto rounded-full object-cover"
                //   />
                //   <h3 className="font-bold mt-3">{donor.name}</h3>
                //   <p className="text-red-600 font-semibold">
                //     {donor.bloodGroup}
                //   </p>
                //   <p className="text-sm">{donor.union}</p>

                //   <a
                //     href={`tel:${donor.phone}`}
                //     className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                //   >
                //     {language === "bn" ? "কল করুন" : "Call Now"}
                //   </a>
                // </div>
                
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BloodSearch;
