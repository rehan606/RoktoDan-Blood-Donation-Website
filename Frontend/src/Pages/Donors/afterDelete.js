import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import DonorCard from "../../components/DonorCard/DonorCard";
import useUnions from '../../Hooks/useUnions';
import useBloodGroups from '../../Hooks/useBloodGroups';

const Donors = () => {
  const { language } = useLanguage();
  const { unions }= useUnions();
  const { bloodGroups } = useBloodGroups()

  const [filters, setFilters] = useState({
    bloodGroup: "",
    union: "",
  });

  // Dummy donors 
  const donors = [
    {
      id: 1,
      title: "Name",
      name: "Rahim",
      bloodGroup: "A+",
      status: "Active",
      address: "Address",
      union: "Santoshpur Union",
      number: "Phone",
      phone: "017XXXXXXXX",
      donate: "যোগাযোগ করুন",
    },
    {
      id: 2,
      title: "Name",
      name: "Karim",
      bloodGroup: "O+",
      status: "Active",
      address: "Address",
      union: "Haramia Union",
      number: "Phone",
      phone: "018XXXXXXXX",
      donate: "যোগাযোগ করুন",
    },
    {
      id: 3,
      title: "Name",
      name: "Rehan",
      bloodGroup: "B+",
      status: "Not Active",
      address: "Address",
      union: "Gachhua Union",
      number: "Phone",
      phone: "01822-182207",
      donate: "যোগাযোগ করুন",
    },
  ];


  const filteredDonors = donors.filter(
    (donor) =>
      (!filters.bloodGroup ||
        donor.bloodGroup === filters.bloodGroup) &&
      (!filters.union || donor.union === filters.union)
  );

  return (
    <section className=" bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          {language === "bn" ? "রক্তদাতাদের তালিকা" : "Blood Donors"}
        </h2>

        {/* 🔍 Search Section */}
        <div className="bg-white rounded-xl shadow p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Blood Group */}
            <div>
              <label className="text-sm font-semibold">
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1"
                onChange={(e) =>
                  setFilters({ ...filters, bloodGroup: e.target.value })
                }
              >
                <option value="">
                  {language === "bn" ? "সব গ্রুপ" : "All Groups"}
                </option>
                {bloodGroups.map((bg) => (
                  <option key={bg.label} value={bg.value}>
                    {bg.value}
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
                className="w-full border rounded-lg px-3 py-2 mt-1"
                onChange={(e) =>
                  setFilters({ ...filters, union: e.target.value })
                }
              >
                <option value="">
                  {language === "bn" ? "সব ইউনিয়ন" : "All Unions"}
                </option>
                {unions.map((u) => (
                  <option key={u.id} value={u.en}>
                    {language === "bn" ? u.bn : u.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
              {language === "bn" ? "খুঁজুন" : "Search"}
            </button>
          </div>
        </div>

        {/* 👥 Donor List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
                <DonorCard donor={donor} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {language === "bn"
                ? "কোনো রক্তদাতা পাওয়া যায়নি"
                : "No donors found"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Donors;
