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
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0C2349] text-white">
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
                  <td className="px-4 py-3 flex justify-center gap-3">

                    {/* Approve */}
                    <button
                      onClick={() => handleApprove(donation._id)}
                      className="bg-[#0C2349] text-white p-2 rounded hover:bg-green-600 transition cursor-pointer "
                    >
                      <FaCheck />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(donation._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition cursor-pointer "
                    >
                      <FaTrash />
                    </button>

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

export default PendingDonations;
