import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaUserSlash, FaPhoneAlt, FaMapMarkerAlt , FaTint,  FaUser } from "react-icons/fa";

import { useEffect, useState } from "react";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useLanguage } from "../../../../context/LanguageContext";
import { MdCall } from "react-icons/md";

const ActiveDonors = () => {
    const [bloodGroups, setBloodGroups] = useState([]);
    const [unions, setUnions] = useState([]);

    const [selectedDonor, setSelectedDonor] = useState(null);
    const [selectedBlood, setSelectedBlood] = useState("");
    const [selectedUnion, setSelectedUnion] = useState("");
    const axiosSecure = useAxiosSecure();

    // 🔤 language 
    const {language} = useLanguage()

    // Load JSON from public
    useEffect(() => {
        fetch("/Data/bloodGroups.json")
        .then((res) => res.json())
        .then((data) => setBloodGroups(data));

        fetch("/Data/unions.json")
        .then((res) => res.json())
        .then((data) => setUnions(data));
    }, []);

    // Active donors
    const {
        data: activeDonors = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["activeDonors"],
        queryFn: async () => {
        const res = await axiosSecure.get("/donors/active");
        return res.data;
        },
    });

    // Deactivate
    const handleDeactivate = async (id) => {
        const result = await Swal.fire({
        title: language === "bn" ? "ডোনার ডিঅ্যাকটিভ করবেন?" : "Deactivate donor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        confirmButtonText: language === "bn" ? "হ্যাঁ" : "Yes",
        });

        if (result.isConfirmed) {
        await axiosSecure.patch(
            `/donors/deactivate/${id}`
        );
        await refetch();

        Swal.fire(
            language === "bn" ? "ডিঅ্যাকটিভ হয়েছে" : "Deactivated",
            "",
            "success"
        );
        }
    };

    // Filter
    const filteredDonors = activeDonors.filter((donor) => {
        const bloodMatch = selectedBlood
        ? donor.bloodGroup === selectedBlood
        : true;

        const unionMatch = selectedUnion
        ? donor.union === selectedUnion
        : true;

        return bloodMatch && unionMatch;
    });

    if (isPending) {
        return (
            <div className="text-center py-10 text-gray-600">
            {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
        </div>
      )
    }

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#7060E9]">
                {language === "bn" ? "একটিভ ডোনার" : "Active Donors"} : ( { filteredDonors.length } )
            </h2>

            {/* 🔍 Search Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between  mb-4 ">
                <div className="w-full ">
                    <select
                    value={selectedBlood}
                    onChange={(e) => setSelectedBlood(e.target.value)}
                    className="px-4 py-2 rounded bg-white text-gray-800  w-full focus:outline-none focus:border-[#7060E9] border-l-6 border-blue-400 cursor-pointer"
                    >
                    <option value="">
                        {language === "bn"
                        ? "রক্তের গ্রুপ নির্বাচন করুন"
                        : "Select Blood Group"}
                    </option>

                    {bloodGroups.map((bg, idx) => (
                        <option 
                        key={idx} 
                        value={language === "bn" ? bg.value : bg.value} 
                        className="text-zinc-500 font-semibold"
                        >
                        {language === "bn" ? bg.value : bg.value}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="w-full ">
                    <select
                    value={selectedUnion}
                    onChange={(e) => setSelectedUnion(e.target.value)}
                    className="px-4 py-2 rounded bg-white text-gray-800  w-full focus:outline-none focus:border-[#7060E9] border-l-6 border-blue-400 cursor-pointer"
                    >
                    <option value="">
                        {language === "bn"
                        ? "ইউনিয়ন নির্বাচন করুন"
                        : "Select Union"}
                    </option>

                    {unions.map((u, idx) => (
                        <option
                        key={idx}
                        value={language === "bn" ? u.bn : u.en}
                        className="text-zinc-800 "
                        >
                        {language === "bn" ? u.bn : u.en}
                        </option>
                    ))}
                    </select>
                </div>
            </div>

            {/* 📋 Table */}

            <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm border">
                    <thead className="bg-[#1b6bc0] text-white ">
                    <tr>
                        <th className="p-3 border text-left">Name</th>
                        <th className="p-3 border">Blood</th>
                        <th className="p-3 border">Phone</th>
                        <th className="p-3 border">Union</th>
                        <th className="p-3 border text-center">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredDonors.map((donor) => (
                        <tr
                        key={donor._id}
                        className="text-center bg-white text-zinc-800 hover:bg-gray-50 transition"
                        >
                        <td className=" border-t border-gray-400 p-3 text-left font-medium">
                            {donor.name}
                        </td>

                        <td className="border-t border-gray-400 p-3 text-red-500 font-semibold">
                            {donor.bloodGroup}
                        </td>

                        <td className="border-t border-gray-400 p-3">{donor.phone}</td>
                        <td className="border-t border-gray-400 p-3">{donor.union}</td>

                        <td className="border-t border-gray-400 p-3">
                            <div className="flex justify-center gap-2">
                            <button
                                onClick={() => setSelectedDonor(donor)}
                                className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-md"
                            >
                                <FaEye />
                            </button>

                            <button
                                onClick={() => handleDeactivate(donor._id)}
                                className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-md"
                            >
                                <FaUserSlash />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <div className="lg:hidden space-y-4">
            {filteredDonors.map((donor) => (
                <div
                key={donor._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
                >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-gray-800">
                        {donor.name}
                        </h2>

                        {/* 🟢 Active Indicator */}
                        <span className={`w-2.5 h-2.5 rounded-full ${
                            donor.status === "active" ? "bg-green-500" : "bg-gray-400"
                            }`}>
                        </span>
                        {/* <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span> */}
                    </div>

                    {/* 📍 Location with icon */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{donor.union}</span>
                    </div>
                    </div>

                    {/* Blood Badge */}
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    {donor.bloodGroup}
                    </span>
                </div>

                {/* Info Section */}
                <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                    <span className="text-gray-500">Phone</span>

                    {/* 📞 Click to Call */}
                    <a
                        href={`tel:${donor.phone}`}
                        className="flex items-center gap-1 font-medium text-blue-600"
                    >
                        <FaPhoneAlt className="text-xs" />
                        {donor.phone}
                    </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t my-4"></div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                    onClick={() => setSelectedDonor(donor)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
                    >
                    <FaEye /> View
                    </button>

                    <button
                    onClick={() => handleDeactivate(donor._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium"
                    >
                    <FaUserSlash /> Deactivate
                    </button>
                </div>
                </div>
            ))}
            </div>

            {/* 👁 Modal */}
            {selectedDonor && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
                    
                    {/* Modal Box */}
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
                    
                        {/* Header */}
                        <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-center">
                            <h3 className="text-xl font-semibold text-white">
                            {language === "bn" ? "ডোনারের তথ্য" : "Donor Details"}
                            </h3>
                            <p className="text-sm text-red-100 mt-1">
                            {selectedDonor.name}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4 text-sm text-gray-700">
                            
                            {/* Blood Group */}
                            <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 text-red-600 font-medium">
                                <FaTint />
                                Blood Group
                            </div>
                            <span className="font-bold text-red-600">
                                {selectedDonor.bloodGroup}
                            </span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-blue-500" />
                                Phone
                            </div>

                            <a
                                href={`tel:${selectedDonor.phone}`}
                                className="text-blue-600 font-medium"
                            >
                                {selectedDonor.phone}
                            </a>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                Location
                            </div>
                            <span className="font-medium">
                                {selectedDonor.union}, {selectedDonor.upazila}
                            </span>
                            </div>

                            {/* Other Info */}
                            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            {Object.entries(selectedDonor).map(
                                ([key, value]) =>
                                !["_id", "name", "bloodGroup", "phone", "union"].includes(key) && (
                                    <p key={key}>
                                    <span className="font-semibold capitalize">{key}:</span>{" "}
                                    {String(value)}
                                    </p>
                                )
                            )}
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-4 flex gap-3 border-t">
                            
                            {/* Call Button */}
                            <a
                            href={`tel:${selectedDonor.phone}`}
                            className="w-1/2 flex items-center justify-center gap-2 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
                            >
                             <MdCall /> Call
                            </a>

                            {/* Close Button */}
                            <button
                            onClick={() => setSelectedDonor(null)}
                            className="w-1/2    bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveDonors;
