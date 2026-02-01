import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingDonors = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/donors/pending")
      .then((res) => res.json())
      .then((data) => setDonors(data.donors || []));
  }, []);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:5000/donors/approve/${id}`, {
      method: "PATCH",
    });
    setDonors(donors.filter((d) => d._id !== id));
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:5000/donors/reject/${id}`, {
      method: "PATCH",
    });
    setDonors(donors.filter((d) => d._id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Donors</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Blood</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-black">{donor.name}</td>
                <td className="p-3 text-center font-bold text-red-600">
                  {donor.bloodGroup}
                </td>
                <td className="p-3 text-center text-black ">{donor.phone}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => setSelectedDonor(donor)}
                    className="text-blue-600 cursor-pointer p-2 bg-white hover:bg-gray-300 rounded-md border-2 border-gray-200"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApprove(donor._id)}
                    className="text-green-600 cursor-pointer p-2 bg-white hover:bg-gray-300 rounded-md border-2 border-gray-200"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleReject(donor._id)}
                    className="text-red-600 cursor-pointer p-2 bg-white hover:bg-gray-300 rounded-md border-2 border-gray-200"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setSelectedDonor(null)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>

            <div className="bg-red-500 px-8 py-6 rounded-md text-center mb-4">
                <h3 className="text-2xl font-semibold mb-4 text-white-">
                Donor Details
                </h3>
            </div>

            <div className="space-y-2 text-sm text-zinc-800 bg-zinc-200 p-8 rounded-md shadow-md border-2 border-zinc-300">
              <p><strong>Name:</strong> {selectedDonor.name}</p>
              <p><strong>Phone:</strong> {selectedDonor.phone}</p>
              <p><strong>Blood Group:</strong> {selectedDonor.bloodGroup}</p>
              <p><strong>Union:</strong> {selectedDonor.union}</p>
              <p><strong>Donor Type:</strong> {selectedDonor.donorType}</p>
              {selectedDonor.lastDonationDate && (
                <p>
                  <strong>Last Donation:</strong> {selectedDonor.lastDonationDate}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDonors;
