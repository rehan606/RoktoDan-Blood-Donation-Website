import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import {useLanguage} from "../../../../context/LanguageContext";
import useBloodGroups from "../../../../Hooks/useBloodGroups";

const AddDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { language } = useLanguage();
    const { bloodGroups } = useBloodGroups()

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
            <h2 className="text-2xl md:text-3xl font-bold  mb-6 text-[#0C2349]">
            {language === "bn"
                ? "নতুন রক্তদান যুক্ত করুন"
                : "Add New Donation"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div className=" flex items-center justify-between gap-6">
                    {/* Patient Name */}
                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium text-zinc-800">
                        {language === "bn" ? "রোগীর নাম" : "Patient Name"}
                        </label>
                        <input
                        type="text"
                        name="patientName"
                        placeholder={ language === "bn" ? "রোগীর নাম " : "Enter Patient Name"}
                        required
                        className="w-full border border-gray-300 bg-[#FAFAFA] rounded-sm px-4 py-2 focus:none focus:ring-gray-400 outline-none text-zinc-700"
                        />
                    </div>

                    {/* Hospital */}

                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium text-zinc-800">
                        {language === "bn" ? "হাসপাতালের নাম" : "Hospital Name"}
                        </label>
                        <input
                        type="text"
                        name="hospitalName"
                        placeholder={ language === "bn" ? " হাসপাতালের নাম" : "Enter Hospital Name"}
                        required
                        className="w-full border border-gray-300 bg-[#FAFAFA] rounded-sm px-4 py-2 focus:none focus:ring-gray-400 outline-none text-zinc-700"
                        />
                    </div>

                </div>

                <div className=" flex items-center justify-between gap-6">
                    
                    {/* Blood Group */}
                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium text-zinc-800">
                        {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                        </label>
                        <select
                        name="bloodGroup"
                        required
                        className="w-full border border-gray-300 bg-[#FAFAFA] rounded-sm px-4 py-2 focus:none focus:ring-gray-400 outline-none text-zinc-700"
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
                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium text-zinc-800">
                        {language === "bn" ? "ডোনেশনের তারিখ" : "Donation Date"}
                        </label>
                        <input
                        type="date"
                        name="donatedAt"
                        required
                        className="w-full border border-gray-300 bg-[#FAFAFA] rounded-sm px-4 py-2 focus:none focus:ring-gray-400 outline-none text-zinc-700"
                        />
                    </div>
                </div>

                <div className=" flex items-center justify-between gap-6">
                    {/* Donation Type */}
                    <div className="flex flex-col flex-1 ">
                        <label className="block mb-1 font-medium text-zinc-800">
                        {language === "bn" ? "ডোনেশন টাইপ" : "Donation Type"}
                        </label>
                        <select
                        name="donationType"
                    className="w-full border border-gray-300 bg-[#FAFAFA] rounded-sm px-4 py-2 focus:none focus:ring-gray-400 outline-none text-zinc-700"
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
                        className=" flex flex-col flex-1 w-full bg-[#0C2349] text-white py-2.5 rounded-sm font-semibold hover:bg-[#0B2349] transition duration-300 disabled:opacity-60 mt-6 cursor-pointer"
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