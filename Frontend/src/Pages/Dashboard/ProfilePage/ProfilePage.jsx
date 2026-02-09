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
  
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };


  return (
    <div className="max-w-5xl mx-auto ">
      <div className=" flex items-center gap-4 shadow-xl rounded-2xl p-6 bg-[#0F2A44]">

        {/* HEADER */}
        <div className="text-center bg-white p-6 rounded-lg text-zinc-900 w-sm ">
          <img
            src={
              typeof user?.image === "string" && user.image.trim() !== ""
                ? user.image
                : profileIcon
            }
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full object-cover border-8 border-red-300"
          />
          <h2 className="text-2xl font-bold mt-2">
            {donor?.name || user.name}
          </h2>
          <p className="text-red-500 capitalize">{role}</p>

          {/* USER INFO */}
          <div className="mt-2 space-y-2">
            <p><b>Email:</b> {user.email}</p>
            <p>
              <b>Joined:</b>{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <button
              onClick={() => setOpen(true)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg cursor-pointer hover:bg-red-700"
            >
              Edit Profile
            </button>
          </div>
        </div>

        

        {/* DONOR INFO */}
        {role === "donor" && donor && (
        <div className="bg-white p-6 rounded-lg  flex-1  ">
          <h2 className="text-2xl font-semibold text-red-500">Personal Details</h2>
            <div className="mt-4 border-t pt-4 space-y-2 text-zinc-900">
              <p className="text-red-600"><b>Blood Group:</b> {donor.bloodGroup}</p>
              <p><b>Phone:</b> {donor.phone}</p>
              <p><b>Upazila:</b> {donor.upazila}</p>
              <p><b>Union:</b> {donor.union}</p>
              <p><b>Last Donation Date:</b> {formatDateForInput(donor.lastDonationDate)}</p>
              <p>
                <b>Available:</b>{" "}
                {donor.isAvailable ? "Yes" : "No"}
              </p>
              <p><b className="text-green-600">ApprovedAt:</b> {formatDateForInput(donor.approvedAt)}</p>
            </div>
        </div>
        )}

        
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
