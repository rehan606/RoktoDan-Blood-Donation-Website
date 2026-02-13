/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../../context/LanguageContext";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyDonations = async () => {
    try {
      const res = await axiosSecure.get("/my-donations");
      setDonations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

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
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        {language === "bn"
          ? "আমার ডোনেশন ইতিহাস"
          : "My Donation History"}
      </h2>

      {donations.length === 0 ? (
        <div className="text-center text-gray-500">
          {language === "bn"
            ? "আপনি এখনো কোনো ডোনেশন করেননি"
            : "You have not made any donations yet"}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0C2349] text-white border ">
              <tr>
                <th className="px-4 py-3">#</th>
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
                  {language === "bn" ? "তারিখ" : "Date"}
                </th>
                <th className="px-4 py-3 text-center">
                  {language === "bn" ? "স্ট্যাটাস" : "Status"}
                </th>
              </tr>
            </thead>

            <tbody>
              {donations.map((donation, index) => (
                <tr
                  key={donation._id}
                  className="border-b hover:bg-gray-50 transition text-gray-800"
                >
                  <td className="px-4 py-3">{index + 1}</td>

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

                  <td className="px-4 py-3 text-center">
                    {donation.status === "approved" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {language === "bn" ? "অনুমোদিত" : "Approved"}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {language === "bn" ? "Pending" : "Pending"}
                      </span>
                    )}
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

export default MyDonations;
