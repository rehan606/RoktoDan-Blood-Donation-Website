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
      <div className="text-center py-10">
        {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 ">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {language === "bn"
            ? "অনুমোদিত ডোনেশন ইতিহাস"
            : "Approved Donation History"} : 

             ({filtered.length})
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
          className="border px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-green-400 outline-none"
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
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0C2349] text-white border ">
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
                  className="border-b hover:bg-gray-50 transition text-gray-800 "
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {donation.donorEmail}
                  </td>
                  <td className="px-4 py-3 font-semibold text-red-600">
                    {donation.bloodGroup}
                  </td>
                  <td className="px-4 py-3">
                    {donation.patientName}
                  </td>
                  <td className="px-4 py-3">
                    {donation.hospitalName}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(donation.donatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(donation.approvedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {language === "bn" ? "অনুমোদিত" : "Approved"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedDonations;
