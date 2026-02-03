import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaTachometerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

import { useLanguage } from "../../context/LanguageContext";
import useAuth from "../../Hooks/useAuth";

const UserButton = () => {
  const { language } = useLanguage();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // toggle dropdown
  const toggleDropdown = () => setOpen((prev) => !prev);

  // outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout handler with SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?",
      text:
        language === "bn"
          ? "আপনি লগ আউট করতে যাচ্ছেন"
          : "You are about to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: language === "bn" ? "হ্যাঁ, লগ আউট" : "Yes, logout",
      cancelButtonText: language === "bn" ? "বাতিল" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title:
                language === "bn"
                  ? "সফলভাবে লগ আউট হয়েছে"
                  : "Logged out successfully",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/login");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title:
                language === "bn"
                  ? "লগ আউট ব্যর্থ হয়েছে"
                  : "Logout failed",
            });
          });
      }
    });
  };

  // dropdown options
  const options = [
    {
      id: 1,
      label: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
      to: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      label: language === "bn" ? "প্রোফাইল" : "Profile",
      to: "/profile",
      icon: <FaUser />,
    },
    {
      id: 3,
      label: language === "bn" ? "লগ আউট" : "Logout",
      action: handleLogout,
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-1 rounded-full border border-red-500 hover:bg-gray-200 transition cursor-pointer"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-3xl text-gray-700" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50">
          {options.map((opt) =>
            opt.to ? (
              <Link
                key={opt.id}
                to={opt.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
              >
                <span className="text-gray-600">{opt.icon}</span>
                {opt.label}
              </Link>
            ) : (
              <button
                key={opt.id}
                onClick={() => {
                  opt.action();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 text-left"
              >
                <span className="text-gray-600">{opt.icon}</span>
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
