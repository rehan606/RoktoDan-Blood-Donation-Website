/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../../context/LanguageContext";

const CompletedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApprovedDonations = async () => {
    try {
      const res = await axiosSecure.get("/blood-donations/approved");
      setDonations(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedDonations();
  }, []);

  // Search by donor email
  useEffect(() => {
    const result = donations.filter((item) =>
      item.donorEmail.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, donations]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 ">
        <h2 className="text-2xl font-bold mb-4 text-[#7060E9]">
          {language === "bn"
            ? " ডোনেশন ইতিহাস"
            : "All Donation History"} : 

              {filtered.length}
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder={
            language === "bn"
              ? "ডোনার ইমেইল দিয়ে খুঁজুন..."
              : "Search by donor email..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded bg-white text-gray-800  focus:outline-none focus:border-[#7060E9] border-l-6 border-blue-400 cursor-pointer "
        />
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">
          {language === "bn"
            ? "কোনো অনুমোদিত ডোনেশন পাওয়া যায়নি"
            : "No approved donations found"}
        </div>
      ) : (
        <div>
          <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm border">
              <thead className="bg-[#1b6bc0] text-white ">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "ডোনার" : "Donor"}
                  </th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "রক্ত" : "Blood"}
                  </th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "রোগী" : "Patient"}
                  </th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "হাসপাতাল" : "Hospital"}
                  </th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "ডোনেশন তারিখ" : "Donation Date"}
                  </th>
                  <th className="px-4 py-3">
                    {language === "bn" ? "অনুমোদনের তারিখ" : "Approved At"}
                  </th>
                  <th className="px-4 py-3 text-center">
                    {language === "bn" ? "স্ট্যাটাস" : "Status"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className="text-center bg-white text-zinc-800 hover:bg-gray-50 transition "
                  >
                    <td className="px-4 py-3 border-t border-gray-400 text-center">{index + 1}</td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center">
                      {donation.donorEmail}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center font-semibold text-red-600">
                      {donation.bloodGroup}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center">
                      {donation.patientName}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center">
                      {donation.hospitalName}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center">
                      {new Date(donation.donatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400 text-center">
                      {new Date(donation.approvedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-400  text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {language === "bn" ? "অনুমোদিত" : "Approved"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {filtered.map((donation, index) => (
              <div
                key={donation._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-zinc-800 text-sm">
                    #{index + 1} • Patient Name: {donation.patientName}
                  </h3>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                    🩸 {donation.bloodGroup}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p><b>👤 Donor:</b> {donation.donorEmail}</p>
                  <p><b>🏥 Hospital:</b> {donation.hospitalName}</p>

                  <p className="text-xs text-gray-400">
                    🗓 Donation: {new Date(donation.donatedAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    ✅ Approved: {new Date(donation.approvedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-3 flex justify-end">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {language === "bn" ? "অনুমোদিত" : "Approved"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedDonations;
