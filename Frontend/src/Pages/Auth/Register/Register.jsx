import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

import { registerText } from "../../../utils/registerText";
import LoginWithGoogle from "../../../components/Buttons/LoginWithGoogle";
import Swal from "sweetalert2";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { language } = useLanguage();
  const t = registerText[language];
  const { createUser, updateUserProfile } = useAuth();
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Submit Form
  const onSubmit = (data) => {
    console.log("Register Data:", data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // 🔐 Firebase ID Token নাও
        const token = await result.user.getIdToken();

        // ======= User Info for MongoDB =======
        // const userInfo = {
        //   email: data.email,
        //   role: "user",
        //   created_at: new Date().toISOString(),
        //   last_log_in: new Date().toISOString(),
        // };

        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          image: profilePicture, // ✅ image save to DB
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };


        // ✅ MongoDB তে user save (token সহ)
        const userRes = await axios.post(
          "http://localhost:5000/users",
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User saved to DB:", userRes.data);

        // ======= Update Firebase Profile =======
        const userProfile = {
          displayName: data.name,
          photoURL: profilePicture,
        };

        await updateUserProfile(userProfile);
        console.log("Profile Updated");

        // 🎉 Success Alert
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            language === "bn"
              ? "সফলভাবে রেজিস্টার হয়েছে"
              : "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  // Upload Image
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imageUploadUrl, formData);
    setProfilePicture(res.data.data.url);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">{t.title}</h1>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>

        {/* Google Login */}
        <LoginWithGoogle />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">{t.nameLabel}</label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg"
              placeholder={t.namePlaceholder}
              {...register("name", { required: t.errors.nameRequired })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">{t.emailLabel}</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
              placeholder={t.emailPlaceholder}
              {...register("email", {
                required: t.errors.emailRequired,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t.errors.emailInvalid,
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
              placeholder={t.passwordPlaceholder}
              {...register("password", {
                required: t.errors.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.errors.passwordLength,
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label className="label">{t.imageLabel}</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="mt-1 w-full px-4 py-2 border border-dashed border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            {t.registerBtn}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {t.loginText}{" "}
          <Link
            to="/login"
            className="text-red-600 font-medium hover:underline"
          >
            {t.login}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
