import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaUserSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useLanguage } from "../../../context/LanguageContext";

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
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                {language === "bn" ? "একটিভ ডোনার" : "Active Donors"}
            </h2>

            {/* 🔍 Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
                <select
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                className="border px-3 py-2 rounded"
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

                <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="border px-3 py-2 rounded "
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

            {/* 📋 Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg">
                <thead className="bg-gray-100 text-zinc-800 ">
                    <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Blood</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Union</th>
                    <th className="p-2 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredDonors.map((donor) => (
                    <tr key={donor._id} className="text-center bg-white text-zinc-800 ">
                        <td className="border p-2">{donor.name}</td>
                        <td className="border p-2 text-red-500 font-semibold">{donor.bloodGroup}</td>
                        <td className="border p-2">{donor.phone}</td>
                        <td className="border p-2">{donor.union}</td>
                        <td className="border p-2 ">
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setSelectedDonor(donor)}
                                    className="bg-blue-600 p-2 text-white rounded"
                                >
                                    <FaEye />
                                </button>

                                <button
                                    onClick={() => handleDeactivate(donor._id)}
                                    className="bg-red-600 p-2 text-white rounded"
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

            {/* 👁 Modal */}
            {selectedDonor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-lg text-zinc-800">
                    <div className="bg-red-500 px-8 py-6 rounded-md text-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                        {language === "bn" ? "ডোনারের তথ্য" : "Donor Details"}
                        </h3>
                    </div>

                    <div className="space-y-2 text-sm text-zinc-800 bg-zinc-200 p-8 rounded-md shadow-md border-2 border-zinc-300">

                        {Object.entries(selectedDonor).map(
                        ([key, value]) =>
                            key !== "_id" && (
                            <p key={key}>
                                <b>{key}:</b> {String(value)}
                            </p>
                            )
                        )}
                    </div>

                    <button
                    onClick={() => setSelectedDonor(null)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded"
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
        </div>
    );
};

export default ActiveDonors;
