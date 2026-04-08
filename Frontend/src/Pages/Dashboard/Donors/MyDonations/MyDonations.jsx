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
        <div className="w-full">

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left bg-white">
              
              <thead className="bg-gradient-to-r from-[#0C2349] to-[#1E3A8A] text-white">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">{language === "bn" ? "রক্তের গ্রুপ " : "Blood Group"}</th>
                  <th className="px-4 py-3">{language === "bn" ? "রোগীর নাম " : "Patient"}</th>
                  <th className="px-4 py-3">{language === "bn" ? "মোবাইল নং " : "Mobile No"}</th>
                  <th className="px-4 py-3">{language === "bn" ? "হাসপাতাল" : "Hospital"}</th>
                  <th className="px-4 py-3">{language === "bn" ? "তারিখ" : "Donation Date"}</th>
                  <th className="px-4 py-3 text-center">{language === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className="border-b hover:bg-gray-50 text-gray-600 transition duration-200"
                  >
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3 font-bold text-red-600">
                      {donation.bloodGroup}
                    </td>

                    <td className="px-4 py-3 text-gray-600">{donation.patientName}</td>

                    <td className="px-4 py-3 text-gray-600">{donation.phone}</td>

                    <td className="px-4 py-3 text-gray-600">{donation.hospitalName}</td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(donation.donatedAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          donation.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {donation.status === "approved"
                          ? language === "bn"
                            ? "অনুমোদিত"
                            : "Approved"
                          : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE & TABLET CARD ================= */}
          <div className="grid grid-cols-1  gap-5 lg:hidden">
            {donations.map((donation, index) => (
              
              <div
                key={donation._id}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 shadow-md"
              >
                <div className="bg-white rounded-2xl p-5 space-y-3">

                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-red-600">
                      🩸 {donation.bloodGroup}
                    </h3>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        donation.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {donation.status === "approved"
                        ? language === "bn"
                          ? "অনুমোদিত"
                          : "Approved"
                        : "Pending"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="text-gray-400">👤</span> {donation.patientName}</p>
                    <p><span className="text-gray-400">📞</span> {donation.phone}</p>
                    <p><span className="text-gray-400">🏥</span> {donation.hospitalName}</p>
                    <p><span className="text-gray-400">📅</span> {new Date(donation.donatedAt).toLocaleDateString()}</p>
                  </div>

                  {/* Footer */}
                  <div className="text-xs text-gray-400">
                    #{index + 1}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default MyDonations;
