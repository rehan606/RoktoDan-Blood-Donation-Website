import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaTrash, FaPhoneAlt } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const BloodRequestPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const limit = 10;

  // 🔥 React Query
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminBloodRequests", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/blood-requests?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/admin/blood-requests/${id}`
        );
        if (res.data.success) {
          Swal.fire("Deleted!", "Request has been deleted.", "success");
          refetch(); // 🔁 refetch after delete
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const requests = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Blood Request Posts
      </h2>

      {/* Table */}
      {/* <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 rounded-lg bg-white text-zinc-900">
          <thead className="bg-gray-100 text-zinc-800 py-3">
            <tr>
              <th className="border border-gray-300 p-3">Patient Name</th>
              <th className="border border-gray-300 p-3">Age</th>
              <th className="border border-gray-300 p-3">Blood Group</th>
              <th className="border border-gray-300 p-3">Phone</th>
              <th className="text-center border border-gray-300 p-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 p-3">{item.name}</td>
                <td className="border border-gray-300 p-3">{item.age}</td>
                <td className="border border-gray-300 p-3 font-semibold ">{item.bloodGroup}</td>
                <td className="border border-gray-300 p-3">{item.phone}</td>
                <td className="p-2 border border-gray-300">
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => setSelected(item)}
                            className="bg-blue-600 p-2 text-white rounded cursor-pointer"
                        >
                            <FaEye />
                        </button>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 p-2 text-white rounded cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}


      {/* ================= DESKTOP TABLE VIEW =================   */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white text-zinc-900">
          
          <thead className="bg-gray-100 text-zinc-800">
            <tr>
              <th className="p-3 border">Patient Name</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Blood Group</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Request Time</th> {/* 🆕 */}
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item) => (
              <tr key={item._id} className="text-center hover:bg-gray-50 transition">
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.age}</td>

                <td className="p-3 border font-semibold text-red-600">
                  {item.bloodGroup}
                </td>

                <td className="p-3 border">{item.phone}</td>

                {/* 🆕 Request Time */}
                <td className="p-3 border text-sm text-gray-600">
                  {formatDateTime(item.createdAt)}
                </td>

                <td className="p-3 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg transition"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-lg transition"
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

        {/* ================= MOBILE + TABLET CARD VIEW  =================  */}
      <div className="grid gap-4 lg:hidden">
        {requests.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-red-600">
                {item.name}
              </h3>
              <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                {item.bloodGroup}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p><b>Age:</b> {item.age}</p>
              <p><b>Phone:</b> {item.phone}</p>

              {/* 🆕 Request Time */}
              <p className="text-xs text-gray-400">
                🕒 {formatDateTime(item.createdAt)}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelected(item)}
                className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg transition"
              >
                <FaEye />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-lg transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1 rounded ${
              page === num + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {/* Modal */}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          
          {/* Modal Card */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

            {/* Header */}
            <div className="relative bg-linear-to-r from-red-500 to-rose-600 text-white px-6 py-5">
              
              <h3 className="text-xl font-bold text-center uppercase tracking-wide">
                Blood Request Details
              </h3>

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 transition p-2 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm text-zinc-700">

              {/* Name + Status */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-zinc-800">
                  {selected.name}
                </h2>

                {/* 🟢 Active */}
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>

              {/* Blood Group Badge */}
              <div>
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-semibold">
                  🩸 {selected.bloodGroup}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <p><b>📧 Email:</b><br /> {selected.email}</p>

                <p><b>🎂 Age:</b><br /> {selected.age}</p>

                <p>
                  <b>📍 Location:</b><br />
                  {selected.union}
                </p>

                <p>
                  <b>📞 Phone:</b><br />
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {selected.phone}
                  </a>
                </p>

                <p>
                  <b>👤 Role:</b><br />
                  <span className="text-red-500 font-semibold uppercase">
                    {selected.role}
                  </span>
                </p>

              </div>

              {/* Message */}
              {selected.message && (
                <div className="bg-gray-100 p-4 rounded-xl border text-sm">
                  <b>💬 Message:</b>
                  <p className="mt-1 text-gray-600">{selected.message}</p>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <a
                  href={`tel:${selected.phone}`}
                  className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium transition"
                >
                  📞 Call Now
                </a>

                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodRequestPosts;
