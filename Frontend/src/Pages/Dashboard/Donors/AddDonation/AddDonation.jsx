import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import {useLanguage} from "../../../../context/LanguageContext";
import useBloodGroups from "../../../../Hooks/useBloodGroups";
import { useNavigate } from "react-router";


const AddDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { language } = useLanguage();
    const { bloodGroups } = useBloodGroups()
    const { navigate } = useNavigate()

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
            navigate("/dashboard/profile");
            
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
        <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold  mb-6 text-[#0C2349]">
            {language === "bn"
                ? "নতুন রক্তদান যুক্ত করুন"
                : "Add New Donation"}
            </h2>

            <form onSubmit={handleSubmit}
                className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                    {/* Patient Name */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {language === "bn" ? "রোগীর নাম" : "Patient Name"}
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        placeholder={
                        language === "bn" ? "রোগীর নাম লিখুন" : "Enter Patient Name"
                        }
                        required
                        className="w-full border border-gray-300 text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition"
                    />
                    </div>

                    {/* Hospital */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {language === "bn" ? "হাসপাতালের নাম" : "Hospital Name"}
                    </label>
                    <input
                        type="text"
                        name="hospitalName"
                        placeholder={
                        language === "bn" ? "হাসপাতালের নাম লিখুন" : "Enter Hospital Name"
                        }
                        required
                        className="w-full border border-gray-300 text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition"
                    />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                    {/* Blood Group */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                    </label>
                    <select
                        name="bloodGroup"
                        required
                        className="w-full border border-gray-300 text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition"
                    >
                        <option value="">Select</option>
                        {bloodGroups.map((bg) => (
                        <option key={bg.lebel} value={bg.value}>
                            {bg.value}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Donation Date */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {language === "bn" ? "ডোনেশনের তারিখ" : "Donation Date"}
                    </label>
                    <input
                        type="date"
                        name="donatedAt"
                        required
                        className="w-full border border-gray-300 text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition"
                    />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-end">
                    
                    {/* Donation Type */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {language === "bn" ? "ডোনেশন টাইপ" : "Donation Type"}
                    </label>
                    <select
                        name="donationType"
                        className="w-full border border-gray-300 text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition"
                    >
                        <option value="direct">
                        {language === "bn" ? "ডাইরেক্ট কল" : "Direct Call"}
                        </option>
                        <option value="request">
                        {language === "bn" ? "রিকোয়েস্ট ভিত্তিক" : "Request Based"}
                        </option>
                    </select>
                    </div>

                    {/* Submit Button */}
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 disabled:opacity-60"
                    >
                    {loading
                        ? language === "bn"
                        ? "অপেক্ষা করুন..."
                        : "Please wait..."
                        : language === "bn"
                        ? "ডোনেশন সাবমিট করুন"
                        : "Submit Donation"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddDonation;