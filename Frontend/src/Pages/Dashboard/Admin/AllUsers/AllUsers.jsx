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
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder={language === "bn" ? "ইমেইল খুঁজুন..." : "Search email"}
          className="px-4 py-2 rounded bg-[#112336]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 rounded bg-[#112336]"
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="donor">Donor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white  rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b6bc0]">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-700">
                <td className="px-4 py-3 text-gray-800">{u.email}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    u.status === "active"
                      ? "bg-green-600"
                      : u.status === "suspended"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}>
                    {u.status || "active"}
                  </span>
                </td>

                <td className='text-gray-800'>{u.role}</td>
                <td className='text-gray-800' >{new Date(u.created_at).toLocaleDateString()}</td>

                <td className="flex items-center justify-center gap-2 ">

                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        id: u._id,
                        status: "suspended",
                      })
                    }
                    className="bg-yellow-600 px-2 py-1 rounded text-xs cursor-pointer mt-2.5"
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
                    className="bg-red-600 px-2 py-1 rounded text-xs cursor-pointer mt-2.5 "
                  >
                    Ban
                  </button>

                  <button
                    onClick={() => handleDelete(u._id, u.email)}
                    className="bg-red-700 px-2 py-1 rounded text-xs cursor-pointer mt-2.5 "
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
