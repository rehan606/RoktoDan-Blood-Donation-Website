import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useLanguage } from "../../../../context/LanguageContext";

const MakeAdmin = () => {
  const { language } = useLanguage();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    enabled: !!search,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/search?query=${search}`
      );
      return res.data;
    },
  });

  // Role Change Handler
  const handleRoleChange = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    Swal.fire({
      title:
        language === "bn"
          ? "আপনি কি নিশ্চিত?"
          : "Are you sure?",
      text:
        language === "bn"
          ? `এই ইউজারের role ${newRole} করতে চান?`
          : `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        language === "bn" ? "হ্যাঁ" : "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(
          `/users/role/${user._id}`,
          { role: newRole }
        );
        refetch();
        Swal.fire("Updated!", "", "success");
      }
    });
  };

  // FOrmate Date
    const formatDate = (dateString) => {
        return dateString.split("T")[0];
    };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {language === "bn"
          ? "অ্যাডমিন ম্যানেজমেন্ট"
          : "Admin Management"}
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder={
          language === "bn"
            ? "ইমেইল দিয়ে খুঁজুন..."
            : "Search by email..."
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 border p-2 rounded-lg mb-4"
      />

      {isPending && <p>Loading...</p>}

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-400 rounded-lg bg-white text-zinc-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Created_At</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center bg-white text-zinc-800 ">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{formatDate(user.created_at)}</td>
                  <td className="p-2 border " > <span className={`${
                        user.role === "admin"
                          ? "bg-red-500 text-white rounded-full px-4 py-2 uppercase"
                          : "bg-green-500 rounded-full px-4 py-2"
                      }`}>{user.role}</span> </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleRoleChange(user)}
                      className={`btn btn-sm bg-green-500 px-6 py-2 rounded-md text-white cursor-pointer ${
                        user.role === "admin"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {user.role === "admin"
                        ? language === "bn"
                          ? "User করুন"
                          : "Make User"
                        : language === "bn"
                        ? "Admin করুন"
                        : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isPending && users.length === 0 && search && (
        <p className="text-gray-500">
          {language === "bn"
            ? "কোনো ইউজার পাওয়া যায়নি"
            : "No users found"}
        </p>
      )}
    </div>
  );
};

export default MakeAdmin;
