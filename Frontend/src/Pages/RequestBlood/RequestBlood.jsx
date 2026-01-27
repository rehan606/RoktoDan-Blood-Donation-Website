import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const RequestBlood = () => {
    const { language } = useLanguage();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        bloodGroup: "",
        union: "",
        phone: "",
        message: "",
    });

    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const unions = [
        { id: 1, bn: "আমানউল্লাহ ইউনিয়ন", en: "Amanullah Union" },
        { id: 2, bn: "আজিমপুর ইউনিয়ন", en: "Azimpur Union" },
        { id: 3, bn: "বাউরিয়া ইউনিয়ন", en: "Bauria Union" },
        { id: 4, bn: "দীঘাপাড় ইউনিয়ন", en: "Digghapar Union" },
        { id: 5, bn: "গাছুয়া ইউনিয়ন", en: "Gachhua Union" },
        { id: 6, bn: "হারামিয়া ইউনিয়ন", en: "Haramia Union" },
        { id: 7, bn: "হরিসপুর ইউনিয়ন", en: "Harispur Union" },
        { id: 8, bn: "কালাপানিয়া ইউনিয়ন", en: "Kalapania Union" },
        { id: 9, bn: "মাগধারা ইউনিয়ন", en: "Magdhara Union" },
        { id: 10, bn: "মাইতভাঙ্গা ইউনিয়ন", en: "Maitbhanga Union" },
        { id: 11, bn: "মুসাপুর ইউনিয়ন", en: "Musapur Union" },
        { id: 12, bn: "রহমতপুর ইউনিয়ন", en: "Rahmatpur Union" },
        { id: 13, bn: "সন্তোষপুর ইউনিয়ন", en: "Santoshpur Union" },
        { id: 14, bn: "সারিকাইত ইউনিয়ন", en: "Sarikait Union" },
        { id: 15, bn: "উড়িরচর ইউনিয়ন", en: "Urirchar Union" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // future: API call
    };

    return (
        <section className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
                {language === "bn" ? "রক্তের অনুরোধ করুন" : "Request for Blood"}
                </h2>
                <p className="text-center text-gray-600 mb-6">
                {language === "bn"
                    ? "জরুরি প্রয়োজনে রক্তের জন্য অনুরোধ পাঠান"
                    : "Send a blood request in case of emergency"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Patient Name */}
                        <div>
                            <label className="text-sm font-semibold">
                            {language === "bn" ? "রোগীর নাম" : "Patient Name"}
                            </label>
                            <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={
                                language === "bn" ? "নাম লিখুন" : "Enter patient name"
                            }
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold">
                            {language === "bn" ? "বয়স" : "Age"}
                            </label>
                            <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            placeholder={
                                language === "bn" ? "বয়স লিখুন" : "Age"
                            }
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                    </div>

                
                    {/* Row wise */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Blood Group */}
                        <div>
                            <label className="text-sm font-semibold">
                                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                            </label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                            >
                                <option value="">
                                {language === "bn"
                                    ? "গ্রুপ নির্বাচন করুন"
                                    : "Select Blood Group"}
                                </option>
                                {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>
                                    {bg}
                                </option>
                                ))}
                            </select>
                        </div>

                        {/* Union */}
                        <div>
                            <label className="text-sm font-semibold">
                                {language === "bn" ? "ইউনিয়ন" : "Union"}
                            </label>
                            <select
                                name="union"
                                value={formData.union}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                            >
                                <option value="">
                                {language === "bn"
                                    ? "ইউনিয়ন নির্বাচন করুন"
                                    : "Select Union"}
                                </option>
                                {unions.map((u) => (
                                <option key={u.id} value={language === "bn" ? u.bn : u.en}>
                                    {language === "bn" ? u.bn : u.en}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-semibold">
                        {language === "bn" ? "যোগাযোগ নম্বর" : "Contact Number"}
                        </label>
                        <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="01XXXXXXXXX"
                        className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="text-sm font-semibold">
                        {language === "bn" ? "অতিরিক্ত বার্তা (ঐচ্ছিক)" : "Additional Message"}
                        </label>
                        <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        placeholder={
                            language === "bn"
                            ? "হাসপাতাল / তারিখ / সময় লিখতে পারেন"
                            : "Hospital / date / time (optional)"
                        }
                        className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        {language === "bn" ? "অনুরোধ পাঠান" : "Submit Request"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default RequestBlood;
