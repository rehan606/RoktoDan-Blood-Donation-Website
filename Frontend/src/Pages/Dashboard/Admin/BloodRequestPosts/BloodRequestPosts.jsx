import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Blood Request Posts
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 rounded-lg bg-white text-zinc-900">
          <thead className="bg-gray-100 text-zinc-800 py-3">
            <tr>
              <th className="border border-gray-300 p-3">Name</th>
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
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
      { selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-md  relative shadow-lg text-zinc-800">
            <div className="bg-blue-500 text-center text-white py-4 rounded-t-lg">
                <h3 className="font-bold text-lg mb-2 uppercase">
                Blood Request Details
                </h3>
            </div>

            <div className="bg-white rounded-lg p-6 text-zinc-800">
                <p><b>Name:</b> {selected.name}</p>
                <p><b>Email:</b> {selected.email}</p>
                <p><b>Age:</b> {selected.age}</p>
                <p className="text-red-500 font-black"><b>Blood Group:</b> {selected.bloodGroup}</p>
                <p><b>Union:</b> {selected.union}</p>
                <p><b>Phone:</b> {selected.phone}</p>
                <p><b>Message:</b> {selected.message}</p>

                <div className="mt-5 text-center">
                <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 w-full bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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
