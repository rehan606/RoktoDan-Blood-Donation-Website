import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAxios from "../../../Hooks/useAxios";
import { useLanguage } from "../../../context/LanguageContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  // 🔹 Fetch profile
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        bloodGroup: data.bloodGroup || "",
        union: data.union || "",
        image: data.image || "",
      });
    },
  });

  // 🔹 Update profile
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosInstance.put(`/users/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      setMessage(language === "bn" ? "প্রোফাইল সফলভাবে আপডেট হয়েছে" : "Profile updated successfully");
    },
    onError: () => {
      setMessage(language === "bn" ? "আপডেট করতে সমস্যা হয়েছে" : "Failed to update profile");
    },
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    setMessage("");
    mutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {language === "bn" ? "প্রোফাইল" : "Profile"}
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        {/* Image */}
        <div className="text-center">
          <img
            src={formData.image || "/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto object-cover"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">{language === "bn" ? "নাম" : "Name"}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">{language === "bn" ? "ইমেইল" : "Email"}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-1">{language === "bn" ? "ফোন" : "Phone"}</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Donor fields */}
        {user?.role === "donor" && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-1">{language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">{language === "bn" ? "ইউনিয়ন" : "Union"}</label>
              <input
                type="text"
                name="union"
                value={formData.union}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </>
        )}

        <button
          onClick={handleUpdate}
          disabled={mutation.isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold mt-2"
        >
          {mutation.isLoading
            ? language === "bn" ? "আপডেট হচ্ছে..." : "Updating..."
            : language === "bn" ? "আপডেট করুন" : "Update Profile"}
        </button>

        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
