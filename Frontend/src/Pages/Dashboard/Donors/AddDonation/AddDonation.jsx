import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import {useLanguage} from "../../../../context/LanguageContext";

const AddDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const donationData = {
      donorId: user?.uid, // অথবা তোমার donor _id
      bloodGroup: form.bloodGroup.value,
      patientName: form.patientName.value,
      hospitalName: form.hospitalName.value,
      donationType: form.donationType.value,
      donatedAt: form.donatedAt.value,
    };

    try {
      const res = await axiosSecure.post(
        "/blood-donations",
        donationData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title:
            language === "bn"
              ? "সফলভাবে সাবমিট হয়েছে!"
              : "Submitted Successfully!",
          text:
            language === "bn"
              ? "আপনার ডোনেশন রিকোয়েস্ট এডমিন অনুমোদনের জন্য পাঠানো হয়েছে।"
              : "Your donation is sent for admin approval.",
        });

        form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          language === "bn"
            ? "ত্রুটি হয়েছে!"
            : "Error!",
        text:
          error?.response?.data?.message ||
          (language === "bn"
            ? "কিছু ভুল হয়েছে"
            : "Something went wrong"),
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-red-600">
          {language === "bn"
            ? "নতুন রক্তদান যুক্ত করুন"
            : "Add New Donation"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Blood Group */}
          <div>
            <label className="block mb-1 font-medium">
              {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
            </label>
            <select
              name="bloodGroup"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Patient Name */}
          <div>
            <label className="block mb-1 font-medium">
              {language === "bn" ? "রোগীর নাম" : "Patient Name"}
            </label>
            <input
              type="text"
              name="patientName"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block mb-1 font-medium">
              {language === "bn" ? "হাসপাতালের নাম" : "Hospital Name"}
            </label>
            <input
              type="text"
              name="hospitalName"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Donation Type */}
          <div>
            <label className="block mb-1 font-medium">
              {language === "bn" ? "ডোনেশন টাইপ" : "Donation Type"}
            </label>
            <select
              name="donationType"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="direct">
                {language === "bn" ? "ডাইরেক্ট কল" : "Direct Call"}
              </option>
              <option value="request">
                {language === "bn" ? "রিকোয়েস্ট ভিত্তিক" : "Request Based"}
              </option>
            </select>
          </div>

          {/* Donation Date */}
          <div>
            <label className="block mb-1 font-medium">
              {language === "bn" ? "ডোনেশনের তারিখ" : "Donation Date"}
            </label>
            <input
              type="date"
              name="donatedAt"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-60"
          >
            {loading
              ? language === "bn"
                ? "অপেক্ষা করুন..."
                : "Please wait..."
              : language === "bn"
              ? "ডোনেশন সাবমিট করুন"
              : "Submit Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;