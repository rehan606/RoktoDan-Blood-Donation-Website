import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useLanguage } from "../../../../context/LanguageContext";
import useAuth from "../../../../Hooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [role, setRole] = useState("all");
  const [search, setSearch] = useState("");

  // ===============================
  // Fetch Users
  // ===============================
  const { data } = useQuery({
    queryKey: ["users", page, role, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${page}&limit=${limit}&role=${role}&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // ===============================
  // Delete Mutation
  // ===============================
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // ===============================
  // Status Mutation
  // ===============================
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/users/status/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = (id, email) => {
    if (email === user.email) {
      Swal.fire("Error", "You cannot delete yourself", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

//   if (isLoading) return <div  className='text-center py-20'>Loading...</div>;

  return (
    <div className="p-4 md:p-8 text-white space-y-6">

      <h2 className="text-2xl font-bold">
        {language === "bn" ? "সব ব্যবহারকারী" : "All Users"} : {users.length}

      </h2>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between ">
        <div className="w-full ">
          <input
            type="text"
            placeholder={language === "bn" ? "ইমেইল খুঁজুন..." : "Search email"}
            className="px-4 py-2 rounded bg-[#112336] w-full  border-l-6 border-blue-500 focus:outline-none focus:border-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full ">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 rounded bg-[#112336]  w-full "
          >
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="donor">Donor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b6bc0] text-white ">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Created</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="mt-4">
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-800">{u.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      u.status === "active"
                        ? "bg-green-600"
                        : u.status === "suspended"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>

                <td className="text-gray-800">{u.role}</td>

                <td className="text-gray-800">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>

                <td className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        id: u._id,
                        status: "suspended",
                      })
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Suspend
                  </button>

                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        id: u._id,
                        status: "banned",
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Ban
                  </button>

                  <button
                    onClick={() => handleDelete(u._id, u.email)}
                    className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
    <div className="lg:hidden space-y-4">
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center mt-3">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800 break-all">{u.name}</p>
            </div>
            

            <div>
              <p className="text-xs text-gray-500 text-right">Role</p>
              <p className={`text-sm font-medium px-2 py-1 rounded-md text-white ${
                  u.role === "user"
                    ? "bg-green-600"
                    : u.role === "donor"
                    ? "bg-blue-500"
                    : "bg-red-600"
                }`}>{u.role}</p>
            </div>

          </div>
          {/* Status + Role */}
          <div className="flex justify-between items-center mt-3">
            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800 break-all">{u.email}</p>
            </div>

            {/* Created */}
            <div>
              <p className="text-xs text-gray-500 text-right">Created</p>
              <p className="text-sm text-gray-800">
                {new Date(u.created_at).toLocaleDateString()}
              </p>
            </div>
           

          </div>

          

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() =>
                statusMutation.mutate({
                  id: u._id,
                  status: "suspended",
                })
              }
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 rounded text-xs"
            >
              Suspend
            </button>

            <button
              onClick={() =>
                statusMutation.mutate({
                  id: u._id,
                  status: "banned",
                })
              }
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-xs"
            >
              Ban
            </button>
          </div>

          <button
            onClick={() => handleDelete(u._id, u.email)}
            className="w-full mt-2 bg-red-700 hover:bg-red-800 text-white py-1.5 rounded text-xs"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`px-3 py-1 rounded ${
              page === n + 1 ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
