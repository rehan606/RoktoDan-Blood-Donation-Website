import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingDonors = () => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch pending donors
  const {
    data: pendingDonors = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pendingDonors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors/pending");
      return res.data;
    },
  });

  // Approve
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve donor?",
      text: "This donor will be marked as approved",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/donors/approve/${id}`);
      Swal.fire("Approved!", "Donor approved successfully", "success");
      refetch();
    }
  };

  // Reject
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject donor?",
      text: "This donor will be rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/donors/reject/${id}`);
      Swal.fire("Rejected!", "Donor rejected", "success");
      refetch();
    }
  };

  if (isPending) {
    return <p className="text-center py-10">Loading pending donors...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Donors : ( {pendingDonors.length} ) </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 rounded-lg bg-white text-zinc-900">
          <thead className="bg-gray-100 text-red-500">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Blood Group</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Union</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pendingDonors.map((donor) => (
              <tr key={donor._id} className="text-center">
                <td className="p-2 border">{donor.name}</td>
                <td className="p-2 border font-semibold text-red-500">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">{donor.union}</td>

                <td className="p-2 border  ">
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => setSelectedDonor(donor)}
                            className="p-2 bg-blue-600 text-white rounded cursor-pointer"
                        >
                            <FaEye />
                        </button>

                        <button
                            onClick={() => handleApprove(donor._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => handleReject(donor._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                        >
                            Reject
                        </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">

            <div className="bg-red-500 px-8 py-6 rounded-md text-center mb-4">
                <h3 className="text-2xl font-semibold  text-white-">
                Donor Details
                </h3>
            </div>

            <div className="space-y-2 text-sm text-zinc-800 bg-zinc-200 p-8 rounded-md shadow-md border-2 border-zinc-300">

                <p><b>Name:</b> {selectedDonor.name}</p>
                <p><b>Blood Group:</b> {selectedDonor.bloodGroup}</p>
                <p><b>Phone:</b> {selectedDonor.phone}</p>
                <p><b>Upazila:</b> {selectedDonor.upazila}</p>
                <p><b>Union:</b> {selectedDonor.union}</p>
                <p><b>Donor Type:</b> {selectedDonor.donorType}</p>

                {selectedDonor.lastDonationDate && (
                <p>
                    <b>Last Donation:</b>{" "}
                    {new Date(selectedDonor.lastDonationDate).toDateString()}
                </p>
                )}
            </div>

            <button
              onClick={() => setSelectedDonor(null)}
              className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDonors;
