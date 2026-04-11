import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaUserSlash, FaPhoneAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTint  } from "react-icons/fa";

import { BiSolidUserCheck } from "react-icons/bi";
import { useState } from "react";

import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

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
    <div className="p-2 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#7060E9]">Pending Donors : ( {pendingDonors.length} ) </h2>

      {/* ================= DESKTOP TABLE (lg+) =================  */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm border">
          
          <thead className="bg-[#1b6bc0] text-white">
            <tr>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border">Blood</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Union</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pendingDonors.map((donor) => (
              <tr
                key={donor._id}
                className="text-center bg-white text-zinc-800 hover:bg-gray-50 transition"
              >
                <td className="p-3 border-t border-gray-400 text-left font-medium">
                  {donor.name}
                </td>

                <td className="p-3 border-t border-gray-400 font-semibold text-red-500">
                  {donor.bloodGroup}
                </td>

                <td className="p-3 border-t border-gray-400">
                  <a href={`tel:${donor.phone}`} className="text-blue-600">
                    {donor.phone}
                  </a>
                </td>

                <td className="p-3 border-t border-gray-400">{donor.union}</td>

                <td className="p-3 border-t border-gray-400">
                  <div className="flex justify-center gap-2">
                    
                    <button
                      onClick={() => setSelectedDonor(donor)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleApprove(donor._id)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer"
                    >
                      <BiSolidUserCheck />
                    </button>

                    <button
                      onClick={() => handleReject(donor._id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
                    >
                      <FaUserSlash />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE + TABLET CARD ================= */}

      <div className="lg:hidden space-y-4">
        {pendingDonors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
          >
            
            {/* Top Section */}
            <div className="flex justify-between items-start">
              
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  {donor.name}
                </h2>

                <div className="flex items-center justify-between  mt-4 rounded-lg">
                  <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                       <span className="font-sm text-gray-500">
                      {donor.union}, {donor.upazila}
                  </span>
                  </div>
                 
                </div>
              </div>

              {/* Blood Badge */}
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                {donor.bloodGroup}
              </span>
            </div>

            {/* Pending Status */}
            <div className="mt-3 ">
              ⏳
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                 Pending Approval
              </span>
            </div>

            {/* Phone */}
            <div className="mt-3 flex justify-between items-center text-md">
              
                <span className="text-gray-500 font-medium flex items-center gap-3"> <FaPhoneAlt className="text-xs" /> Phone</span>
              
              <a
                href={`tel:${donor.phone}`}
                className="flex items-center gap-1 text-blue-600 font-medium"
              >
                
                {donor.phone}
              </a>
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              
              <button
                onClick={() => setSelectedDonor(donor)}
                className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-medium"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => handleApprove(donor._id)}
                className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-medium"
              >
                <BiSolidUserCheck /> Approve
              </button>

              <button
                onClick={() => handleReject(donor._id)}
                className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-medium"
              >
                <FaUserSlash /> Reject
              </button>

            </div>
          </div>
        ))}
      </div>




      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          
          {/* Modal */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
            
            {/* Header */}
            <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-center">
              <h3 className="text-xl font-semibold text-white">
                Donor Details
              </h3>
              <p className="text-sm text-red-100 mt-1">
                {selectedDonor.name}
              </p>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3 text-sm text-gray-700">
              
              {/* Blood Group */}
              <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <FaTint />
                  Blood Group
                </div>
                <span className="font-bold text-red-600">
                  {selectedDonor.bloodGroup}
                </span>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" />
                  Email
                </div>
                <span className="font-medium text-xs break-all">
                  {selectedDonor.email}
                </span>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-green-500" />
                  Phone
                </div>
                <a
                  href={`tel:${selectedDonor.phone}`}
                  className="text-green-600 font-medium"
                >
                  {selectedDonor.phone}
                </a>
              </div>

              {/* Location */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Location
                </div>
                <span className="text-right">
                  {selectedDonor.upazila}, {selectedDonor.union}
                </span>
              </div>

              {/* Donor Type */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">Donor Type</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                  {selectedDonor.donorType}
                </span>
              </div>

              {/* Last Donation */}
              {selectedDonor.lastDonationDate && (
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">Last Donation</span>
                  <span className="text-xs">
                    {new Date(selectedDonor.lastDonationDate).toDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 flex gap-3 border-t">
              
              {/* Call */}
              <a
                href={`tel:${selectedDonor.phone}`}
                className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
              >
                📞 Call
              </a>

              {/* Close */}
              <button
                onClick={() => setSelectedDonor(null)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDonors;
