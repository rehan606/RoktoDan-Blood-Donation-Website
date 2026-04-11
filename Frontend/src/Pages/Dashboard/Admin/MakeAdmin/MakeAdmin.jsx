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

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 ">
        <h2 className="text-2xl font-bold mb-4 text-[#7060E9] ">
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
          className="w-full lg:w-1/2 px-4 py-2 rounded bg-white text-gray-800  border-l-6 border-blue-400 focus:outline-none focus:border-[#7060E9]"
        />
      </div>

      {/* {isPending && <p>Loading...</p>} */}

      {/* Table */}

      {/* ================= DESKTOP TABLE ================= */}
      {users.length > 0 && (
        <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm border">
            
            <thead className="bg-[#1b6bc0] text-white">
              <tr>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border">Role</th>
                <th className=" p-3 border text-center ">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="text-center bg-white text-zinc-800 hover:bg-gray-50 transition"
                >
                  <td className="border-t border-gray-400 p-3 text-left font-medium">
                    {user.email}
                  </td>

                  <td className="border-t border-gray-400 p-3 text-left font-medium">
                    {formatDate(user.created_at)}
                  </td>

                  <td className="border-t border-gray-400 p-3 text-center font-medium">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="border-t border-gray-400 p-3  font-medium">
                    <button
                      onClick={() => handleRoleChange(user)}
                      className={`px-4 py-1.5 rounded-md text-white text-sm cursor-pointer ${
                        user.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
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

      {/* ================= MOBILE + TABLET CARD ================= */}
      <div className="lg:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
          >
            
            {/* Top */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold text-gray-800 break-all">
                  {user.email}
                </p>
              </div>
              

              {/* Role Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.role}
              </span>
            </div>

            {/* Created */}
            <div className="mt-3 text-sm flex justify-between">
              <span className="text-gray-500">Created</span>
              <span className="font-medium text-gray-800">
                📅 {formatDate(user.created_at)}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Action */}
            <button
              onClick={() => handleRoleChange(user)}
              className={`w-full py-2 rounded-lg text-white font-medium text-sm ${
                user.role === "admin"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
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
          </div>
        ))}
      </div>

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
