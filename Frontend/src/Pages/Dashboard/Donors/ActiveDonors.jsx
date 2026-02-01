import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaUserSlash } from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ActiveDonors = () => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchBlood, setSearchBlood] = useState("");
  const [searchUnion, setSearchUnion] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: activeDonors = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["activeDonors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors/active");
      return res.data;
    },
  });

  // Deactivate donor
  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: "Deactivate donor?",
      text: "This donor will be removed from active list",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, deactivate",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(
        `/donors/deactivate/${id}`
      );

      await refetch();

      Swal.fire("Deactivated!", "Donor deactivated", "success");
    }
  };

  // Search filter
  const filteredDonors = activeDonors.filter((donor) => {
    const bloodMatch = donor.bloodGroup
      ?.toLowerCase()
      .includes(searchBlood.toLowerCase());

    const unionMatch = donor.union
      ?.toLowerCase()
      .includes(searchUnion.toLowerCase());

    return bloodMatch && unionMatch;
  });

  if (isPending) {
    return <p className="text-center py-10">Loading active donors...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Donors</h2>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by blood group"
          value={searchBlood}
          onChange={(e) => setSearchBlood(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        <input
          type="text"
          placeholder="Search by union"
          value={searchUnion}
          onChange={(e) => setSearchUnion(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Blood</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Union</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor._id} className="text-center">
                <td className="p-2 border">{donor.name}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">{donor.union}</td>

                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => setSelectedDonor(donor)}
                    className="p-2 bg-blue-600 text-white rounded"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleDeactivate(donor._id)}
                    className="p-2 bg-red-600 text-white rounded"
                  >
                    <FaUserSlash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Donor Details</h3>

            {Object.entries(selectedDonor).map(([key, value]) => (
              key !== "_id" && (
                <p key={key}>
                  <b>{key}:</b>{" "}
                  {value instanceof Date
                    ? new Date(value).toDateString()
                    : String(value)}
                </p>
              )
            ))}

            <button
              onClick={() => setSelectedDonor(null)}
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveDonors;
