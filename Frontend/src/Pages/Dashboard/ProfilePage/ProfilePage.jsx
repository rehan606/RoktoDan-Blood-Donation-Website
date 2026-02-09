import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import EditProfileModal from "./EditProfileModal";
import useAuth from "../../../Hooks/useAuth";
import profileIcon from "../../../assets/images/profile-icon.png";

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
  
  console.log("USER IMAGE:", user.image);


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center">
          <img
            src={
              typeof user?.image === "string" && user.image.trim() !== ""
                ? user.image
                : profileIcon
            }
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold mt-2">
            {donor?.name || user.email}
          </h2>
          <p className="text-gray-500 capitalize">{role}</p>
        </div>

        {/* USER INFO */}
        <div className="mt-6 space-y-2">
          <p><b>Email:</b> {user.email}</p>
          <p>
            <b>Joined:</b>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* DONOR INFO */}
        {role === "donor" && donor && (
          <div className="mt-4 border-t pt-4 space-y-2">
            <p><b>Blood Group:</b> {donor.bloodGroup}</p>
            <p><b>Phone:</b> {donor.phone}</p>
            <p><b>Union:</b> {donor.union}</p>
            <p>
              <b>Available:</b>{" "}
              {donor.isAvailable ? "Yes" : "No"}
            </p>
          </div>
        )}

        <button
          onClick={() => setOpen(true)}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Edit Profile
        </button>
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
