import { useState } from "react";
import { FaUser, FaLock, FaBell, FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../../Context/LanguageContext";
// import { changeUserPassword } from "../../../utils/changePassword";
import Swal from "sweetalert2";

const Settings = () => {
  const { language, setLanguage } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [notifications, setNotifications] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    // Change password handler

    // const handlePasswordUpdate = async () => {
    //     try {
    //         await changeUserPassword(form.password, form.newPassword);

    //         Swal.fire("Success", "Password updated successfully", "success");

    //     } catch (error) {
    //         Swal.fire("Error", error.message, "error");
    //     }
    // };

  return (
    <div className="p-6 text-white space-y-6">

      <h2 className="text-2xl font-bold text-[#7060E9]">
        {language === "bn" ? "সেটিংস" : "Settings"}
      </h2>

      {/* ================= PROFILE ================= */}
      <Section title={language === "bn" ? "প্রোফাইল" : "Profile"}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            icon={<FaUser />}
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            icon={<FaUser />}
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary mt-4">
          {language === "bn" ? "আপডেট করুন" : "Update Profile"}
        </button>
      </Section>

      {/* ================= PASSWORD ================= */}
      <Section title={language === "bn" ? "পাসওয়ার্ড পরিবর্তন" : "Change Password"}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            icon={<FaLock />}
            placeholder="Current Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Input
            icon={<FaLock />}
            placeholder="New Password"
            name="newPassword"
            type="password"
            onChange={handleChange}
          />
        </div>

        <button  className="btn-primary mt-4">
          {language === "bn" ? "পাসওয়ার্ড আপডেট" : "Update Password"}
        </button>
      </Section>

      {/* ================= LANGUAGE ================= */}
      <Section title={language === "bn" ? "ভাষা সেটিংস" : "Language"}>
        <div className="flex gap-4">
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded ${
              language === "en" ? "bg-red-500" : "bg-gray-700"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("bn")}
            className={`px-4 py-2 rounded ${
              language === "bn" ? "bg-red-500" : "bg-gray-700"
            }`}
          >
            বাংলা
          </button>
        </div>
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section title={language === "bn" ? "নোটিফিকেশন" : "Notifications"}>
        <div className="flex justify-between items-center">
          <span>
            {language === "bn"
              ? "ইমেইল নোটিফিকেশন চালু"
              : "Enable Email Notifications"}
          </span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="toggle toggle-success"
          />
        </div>
      </Section>

      {/* ================= DANGER ZONE ================= */}
      <Section title="Danger Zone">
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-yellow-600 px-4 py-2 rounded">
            {language === "bn" ? "অ্যাকাউন্ট নিষ্ক্রিয় করুন" : "Deactivate Account"}
          </button>

          <button className="bg-red-600 px-4 py-2 rounded">
            {language === "bn" ? "অ্যাকাউন্ট মুছুন" : "Delete Account"}
          </button>
        </div>
      </Section>

    </div>
  );
};

export default Settings;

const Section = ({ title, children }) => (
  <div className="bg-[#0f2a44] p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Input = ({ icon, ...props }) => (
  <div className="flex items-center bg-[#112336] px-3 py-2 rounded">
    <span className="mr-2 text-gray-400">{icon}</span>
    <input
      {...props}
      className="bg-transparent w-full outline-none text-white"
    />
  </div>
);