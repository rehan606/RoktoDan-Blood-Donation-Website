import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../../context/LanguageContext";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ===============================
  // Fetch Users
  // ===============================
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ===============================
  // Delete User
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
  // Change Role
  // ===============================
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/role/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // ===============================
  // Filter Logic
  // ===============================
  const filteredUsers = users.filter((user) => {
    const matchRole =
      roleFilter === "all" ? true : user.role === roleFilter;

    const matchSearch = user.email
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchRole && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-white">
        {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 text-white">

      {/* Title */}
      <h2 className="text-2xl font-bold">
        {language === "bn"
          ? "ব্যবহারকারী ব্যবস্থাপনা"
          : "User Management"}
      </h2>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">

        {/* Search */}
        <input
          type="text"
          placeholder={
            language === "bn"
              ? "ইমেইল দিয়ে খুঁজুন..."
              : "Search by email..."
          }
          className="px-4 py-2 rounded-md bg-[#112336] border border-gray-600 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Role Filter */}
        <select
          className="px-4 py-2 rounded-md bg-[#112336] border border-gray-600 w-full md:w-48"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">
            {language === "bn" ? "সব ভূমিকা" : "All Roles"}
          </option>
          <option value="user">User</option>
          <option value="donor">Donor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#0f2a44] rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-left">

          <thead className="bg-[#112336] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">
                {language === "bn" ? "ইমেইল" : "Email"}
              </th>
              <th className="px-6 py-3">
                {language === "bn" ? "ভূমিকা" : "Role"}
              </th>
              <th className="px-6 py-3">
                {language === "bn" ? "তৈরি তারিখ" : "Created"}
              </th>
              <th className="px-6 py-3 text-center">
                {language === "bn" ? "অ্যাকশন" : "Actions"}
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-700 hover:bg-[#112336] transition"
              >
                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-red-600"
                        : user.role === "donor"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 flex gap-3 justify-center">

                  {/* Role Change */}
                  <select
                    className="bg-[#112336] border border-gray-600 px-2 py-1 rounded-md text-xs"
                    value={user.role}
                    onChange={(e) =>
                      roleMutation.mutate({
                        id: user._id,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="user">User</option>
                    <option value="donor">Donor</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Delete */}
                  <button
                    onClick={() => deleteMutation.mutate(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-400">
          {language === "bn"
            ? "কোনো ব্যবহারকারী পাওয়া যায়নি"
            : "No users found"}
        </p>
      )}
    </div>
  );
};

export default AllUsers;
