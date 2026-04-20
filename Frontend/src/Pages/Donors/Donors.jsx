import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import DonorCard from "../../components/DonorCard/DonorCard";
import useUnions from "../../Hooks/useUnions";
import useBloodGroups from "../../Hooks/useBloodGroups";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";

const Donors = () => {
  const { language } = useLanguage();
  const { unions } = useUnions();
  const { bloodGroups } = useBloodGroups();

  const [filters, setFilters] = useState({
    bloodGroup: "",
    union: "",
  });

  const [page, setPage] = useState(1);

  // ✅ TanStack Query (UPDATED)
  const { data, isLoading } = useQuery({
    queryKey: ["donors", filters, page],
    queryFn: async () => {
      const params = {
        page,
      };

      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.union) params.union = filters.union;

      const res = await axios.get("http://localhost:5000/donors", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const donors = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        {/* <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          {language === "bn" ? "রক্তদাতাদের তালিকা" : "Blood Donors"}
        </h2> */}

        {/* 🔍 Search Section */}
        <div className="bg-white rounded-xl shadow-lg px-5 py-10 mb-12">
            <h2 className="text-2xl text-red-500 mb-5 font-bold flex items-center gap-3"> <IoSearchOutline />  {language === "bn" ? "রক্তদাতা খুঁজুন" : "Search Blood Donors"} </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Blood Group */}
              <div className="relative">
                <label className="text-sm md:text-md ">
                  {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                </label>

                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 appearance-none focus:outline-red-500 focus:border-red-500"
                  value={filters.bloodGroup}
                  onChange={(e) => {
                    setPage(1); // 🔁 filter change হলে page reset
                    setFilters({ ...filters, bloodGroup: e.target.value });
                  }}
                >
                  <option className="px-4" value="">
                    {language === "bn" ? " -- নির্বাচন করুন  --" : " -- Select Groups --"}
                  </option>
                  {bloodGroups.map((bg) => (
                    <option key={bg.value} value={bg.value}>
                      {bg.value}
                    </option>
                  ))}
                </select>


                {/* Dropdown arrow */}
                <div className="absolute inset-y-0 right-3 top-7 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Union */}
              <div className="relative">
                <label className="text-sm md:text-md ">
                  {language === "bn" ? "ইউনিয়ন" : "Union"}
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 appearance-none focus:outline-red-500 focus:border-red-500"
                  value={filters.union}
                  onChange={(e) => {
                    setPage(1);
                    setFilters({ ...filters, union: e.target.value });
                  }}
                >
                  <option value="">
                    {language === "bn" ? "-- নির্বাচন করুন  --" : "-- Select Unions --"}
                  </option>
                  {unions.map((u) => (
                    <option key={u.id} value={u.en}>
                      {language === "bn" ? u.bn : u.en}
                    </option>
                  ))}
                </select>

                {/* Dropdown arrow */}
                <div className="absolute inset-y-0 right-3 top-7 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Button (UI only) */}
              <button className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                <IoSearchOutline className="text-lg" /> {language === "bn" ? "রক্তদাতা খুঁজুন " : "Search Donors"}
              </button>
            </div>
        </div>

        {/* 👥 Donor List */}
        {isLoading ? (
          <p className="text-center text-gray-600">{language === "bn" ? "লোডিং হচ্ছে ..." : "Loading ..."}</p>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 ">
                 <h2 className="text-xl text-gray-600   flex items-center gap-3">
                     {language === "bn" ? "রক্তদাতাদের তালিকা" : "Blood Donors List"}
                  </h2>

                <div>
                  <p className="text-gray-600">{language === "bn" ? `মোট রক্তদাতা: ${donors.length} জন` : `Total Blood Donors: ${donors.length}`}</p>
                </div>

              </div>
              
            
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-bl-lg border-br-lg bg-white p-5 shadow">
                {donors.length > 0 ? (
                  donors.map((donor, idx) => (
                    <DonorCard key={idx} donor={donor} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    {language === "bn"
                      ? "কোনো রক্তদাতা পাওয়া যায়নি"
                      : "No donors found"}
                  </p>
                )}
              </div>
            </div>

            {/* 📄 Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num + 1)}
                    className={`px-4 py-2 rounded ${
                      page === num + 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Donors;
