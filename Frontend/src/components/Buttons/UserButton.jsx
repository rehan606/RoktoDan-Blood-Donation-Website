import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useLanguage } from "../../context/LanguageContext";

const UserButton = ({ user }) => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  // Sample options (adjust as needed)
  const options = [
    { id: 1, label: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard", to: "/dashboard" },
    { id: 2, label: language === "bn" ? "প্রোফাইল" : "Profile", to: "/profile" },
    { id: 3, label: language === "bn" ? "লগ আউট" : "Logout", action: () => console.log("Logout clicked") },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
      >
        <FaUserCircle className="text-2xl text-gray-700" />
        <span>{user?.name || (language === "bn" ? "ব্যবহারকারী" : "User")}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          {options.map((opt) =>
            opt.to ? (
              <Link
                key={opt.id}
                to={opt.to}
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                onClick={() => setOpen(false)}
              >
                {opt.label}
              </Link>
            ) : (
              <button
                key={opt.id}
                onClick={() => { opt.action(); setOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {opt.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserButton;
