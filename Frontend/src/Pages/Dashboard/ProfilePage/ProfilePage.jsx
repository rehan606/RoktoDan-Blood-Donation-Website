import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import EditProfileModal from "./EditProfileModal";
import useAuth from "../../../Hooks/useAuth";
import profileIcon from "../../../assets/images/profile-icon.png";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const { user: authUser, loading } = useAuth(); // 🔥 source of truth
  const axiosInstance = useAxios();
  const [open, setOpen] = useState(false);
  

  const email = authUser?.email;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", email],
    enabled: !!email && !loading, // 🔥 CRITICAL
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/${email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <p className="text-center">Loading profile...</p>;
  }

  if (isError) {
    return <p className="text-center">Failed to load profile</p>;
  }

  if (!data) {
    return <p className="text-center">No profile data</p>;
  }

  const { user, donor } = data;
  const role = user.role;
  
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };


  return (
    <div className=" mx-auto mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ================= PROFILE CARD ================= */}
          <div className="lg:col-span-1">
            <div className="relative p-[1px] rounded-2xl bg-linear-to-r from-green-400 via-blue-500 to-purple-500 shadow-lg">
              
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center">

                {/* Profile Image */}
                <div className="relative w-fit mx-auto">
                  <img
                    src={
                      typeof user?.image === "string" && user.image.trim() !== ""
                        ? user.image || user.photoURL 
                        : profileIcon
                    }
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800">
                  {donor?.name || user.name}
                </h2>

                {/* Role Badge */}
                <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 capitalize">
                  {role}
                </span>

                {/* Info */}
                <div className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Joined</span>
                    <span className="font-medium">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => setOpen(true)}
                  className="mt-5 cursor-pointer w-full bg-linear-to-r from-red-500 to-pink-500 text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* ================= DONOR INFO ================= */}
          {role === "donor" && donor && (
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl p-[1px] bg-linear-to-r from-red-500 via-pink-500 to-blue-500 shadow-lg">
                
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5">

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                      🩸 Donor Details
                    </h2>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        donor.isAvailable
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {donor.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>

                  {/* Grid Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base">

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Blood Group</p>
                      <p className="font-bold text-red-600 text-lg">
                        {donor.bloodGroup}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4  rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Phone</p>
                      <p className="font-medium text-gray-600">{donor.phone}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Union</p>
                      <p className="font-medium text-gray-600">{donor.union}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Upazila</p>
                      <p className="font-medium text-gray-600">{donor.upazila}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Last Donation</p>
                      <p className="font-medium text-gray-600">
                        {formatDateForInput(donor.lastDonationDate)}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                      <p className="text-gray-400 text-xs">Approved At</p>
                      <p className="font-medium text-green-600">
                        {formatDateForInput(donor.approvedAt)}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {open && (
        <EditProfileModal
          close={() => setOpen(false)}
          profile={data}
          email={email}
        />
      )}
    </div>
  );
};

export default ProfilePage;
