import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";

const EditProfileModal = ({ close, profile, email }) => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const role = profile.user.role;

  const [userData, setUserData] = useState({
    image: profile.user.image || "",
  });

  const [donorData, setDonorData] = useState({
    phone: profile.donor?.phone || "",
    union: profile.donor?.union || "",
    bloodGroup: profile.donor?.bloodGroup || "",
    isAvailable: profile.donor?.isAvailable ?? true,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.put(`/profile/${email}`, {
        user: userData,
        donor: role === "donor" ? donorData : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", email]);
      close();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">

        <h3 className="text-xl font-bold mb-4">Update Profile</h3>

        {/* USER */}
        <input
          className="w-full border p-2 mb-3 rounded"
          value={userData.image}
          onChange={(e) =>
            setUserData({ ...userData, image: e.target.value })
          }
          placeholder="Profile Image URL"
        />

        {/* DONOR */}
        {role === "donor" && (
          <>
            <input
              className="w-full border p-2 mb-2 rounded"
              value={donorData.phone}
              onChange={(e) =>
                setDonorData({ ...donorData, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <input
              className="w-full border p-2 mb-2 rounded"
              value={donorData.union}
              onChange={(e) =>
                setDonorData({ ...donorData, union: e.target.value })
              }
              placeholder="Union"
            />
          </>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={mutation.mutate}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={close}
            className="flex-1 border py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
