/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../../context/LanguageContext";

const PendingDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pending Donations
  const fetchPendingDonations = async () => {
    try {
      const res = await axiosSecure.get("/blood-donations/pending");
      setDonations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  // Approve Donation
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title:
        language === "bn"
          ? "আপনি কি এই ডোনেশন অনুমোদন করবেন?"
          : "Approve this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/blood-donations/${id}`);

      Swal.fire({
        icon: "success",
        title:
          language === "bn"
            ? "অনুমোদন সফল হয়েছে"
            : "Approved successfully",
      });

      fetchPendingDonations();
    } catch (error) {
      Swal.fire("Error", "Something went wrong", error);
    }
  };

  // Delete Donation
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title:
        language === "bn"
          ? "আপনি কি নিশ্চিত?"
          : "Are you sure?",
      text:
        language === "bn"
          ? "এই ডোনেশন মুছে ফেলা হবে!"
          : "This donation will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/admin/delete-donation/${id}`);

      Swal.fire({
        icon: "success",
        title:
          language === "bn"
            ? "ডিলিট সফল হয়েছে"
            : "Deleted successfully",
      });

      fetchPendingDonations();
    } catch (error) {
      Swal.fire("Error", "Something went wrong", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        {language === "bn"
          ? "Pending ডোনেশন তালিকা"
          : "Pending Donation List"} : 
          ({donations.length})
      </h2>

      {donations.length === 0 ? (
        <div className="text-center text-gray-500">
          {language === "bn"
            ? "কোনো Pending ডোনেশন নেই"
            : "No pending donations found"} 
        </div>
      ) : (
        <div>
          <div className="hidden md:block overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm text-left">

              <thead className="bg-linear-to-r from-[#0C2349] to-[#1d4ed8] text-white">
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
                    {language === "bn" ? "তারিখ" : "Date"}
                  </th>
                  <th className="px-4 py-3 text-center">
                    {language === "bn" ? "একশন" : "Action"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className="border-b hover:bg-gray-50 transition text-zinc-800"
                  >
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3">
                      {donation.donorEmail}
                    </td>

                    <td className="px-4 py-3">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {donation.bloodGroup}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {donation.patientName}
                    </td>

                    <td className="px-4 py-3">
                      {donation.hospitalName}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(donation.donatedAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(donation._id)}
                          className="bg-[#0C2349] hover:bg-green-600 text-white p-2 rounded-lg transition"
                        >
                          <FaCheck />
                        </button>

                        <button
                          onClick={() => handleDelete(donation._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {donations.map((donation, index) => (
              <div
                key={donation._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-zinc-800 text-sm">
                    #{index + 1} • {donation.patientName}
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
                    🗓 {new Date(donation.donatedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleApprove(donation._id)}
                    className="bg-[#0C2349] hover:bg-green-600 text-white p-2 rounded-lg transition"
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDonations;
