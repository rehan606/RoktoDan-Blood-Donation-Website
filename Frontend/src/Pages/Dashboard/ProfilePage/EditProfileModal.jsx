import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";
import useUnions from "../../../Hooks/useUnions";

const EditProfileModal = ({ close, profile, email }) => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const { unions  } = useUnions();

//   const role = profile?.role; 
  const isDonor = !!profile?.donor;


  // ---------- USER STATE ----------
  const [userData, setUserData] = useState({
    name: profile?.donor?.name || profile?.user?.name || "",
    image: profile?.user?.image || "",
  });

  // ---------- DONOR STATE ----------
  const [donorData, setDonorData] = useState({
    phone: profile?.donor?.phone || "",
    union: profile?.donor?.union || "",
    lastDonationDate: profile?.donor?.lastDonationDate || "",
  });

  const [uploading, setUploading] = useState(false);

  // ---------- IMAGE UPLOAD (imgbb) ----------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setUserData((prev) => ({
        ...prev,
        image: data.data.display_url,
      }));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  // ---------- UPDATE PROFILE ----------
  const mutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.put(`/profile/${email}`, {
        user: userData,
        donor: isDonor ? donorData : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", email]);
      close();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-zinc-900">
          Update Profile
        </h3>

        {/* ---------- NAME ---------- */}
        <label className="block text-sm mb-1 text-zinc-800">Name</label>
        <input
          className="w-full border p-2 mb-3 rounded outline-none text-zinc-800"
          value={userData?.name}
          onChange={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
        />

        {/* ---------- IMAGE ---------- */}
        <label className="block text-sm mb-1 text-zinc-800">Profile Image</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="w-full border p-2 mb-3 rounded text-zinc-800"
        />

        {userData.image && (
          <img
            src={userData.image}
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
        )}

        {uploading && (
          <p className="text-sm text-gray-500 mb-2">Uploading image...</p>
        )}

        {/* ---------- DONOR ONLY ---------- */}
        {isDonor && (
            <>
                {/* PHONE */}
                <label className="block text-sm mb-1 text-zinc-800">Phone</label>
                <input
                className="w-full border p-2 mb-3 rounded outline-none text-zinc-800"
                value={donorData.phone}
                onChange={(e) =>
                    setDonorData({ ...donorData, phone: e.target.value })
                }
                />

                {/* UNION */}
                <label className="block text-sm mb-1 text-zinc-800">Union</label>
                <select
                className="w-full border p-2 mb-3 rounded outline-none text-zinc-800"
                value={donorData.union}
                onChange={(e) =>
                    setDonorData({ ...donorData, union: e.target.value })
                }
                >
                <option value="">Select Union</option>
                {unions.map((u) => (
                    <option key={u.id} value={u.en}>
                    {u.en}
                    </option>
                ))}
                </select>

                {/* LAST DONATION DATE */}
                <label className="block text-sm mb-1 text-zinc-800">
                Last Donation Date
                </label>
                <input
                type="date"
                className="w-full border p-2 mb-3 rounded outline-none text-zinc-800"
                value={donorData.lastDonationDate}
                onChange={(e) =>
                    setDonorData({
                    ...donorData,
                    lastDonationDate: e.target.value,
                    })
                }
                />
            </>
        )}


        {/* ---------- ACTIONS ---------- */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => mutation.mutate()}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Save Changes
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-200 py-2 rounded text-zinc-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
