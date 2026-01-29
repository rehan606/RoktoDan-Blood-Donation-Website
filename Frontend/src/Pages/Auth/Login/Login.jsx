import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { loginText } from "../../../utils/loginText"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";
import LoginWithGoogle from "../../../components/Buttons/LoginWithGoogle";
import Swal from "sweetalert2";


const Login = () => {
    const { language } = useLanguage();
    const t = loginText[language];
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const {register, handleSubmit,formState: { errors }, } = useForm();

    // 🔐 Email/Password Login
    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((result) => {
            Swal.fire({
            position: "center",
            icon: "success",
            title:
                language === "bn"
                  ? "সফলভাবে লগইন হয়েছে"
                  : "Logged in successfully",
            showConfirmButton: false,
            timer: 1500
            });
            console.log("Logged in:", result.user);
            navigate("/"); // or dashboard
        })
        .catch((error) => {
            console.error(error.message);
        });
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-red-600">
                        {t.title}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {t.subtitle}
                    </p>
                </div>

                {/* Google Login */}
                <LoginWithGoogle />

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">
                        {t.emailLabel}
                        </label>
                        <input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
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

                    {/* Password with Eye Icon */}
                    <div>
                        <label className="block text-sm font-medium">
                        {t.passwordLabel}
                        </label>

                        <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t.passwordPlaceholder}
                            className="mt-1 w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-red-400"
                            {...register("password", {
                            required: t.errors.passwordRequired,
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>

                        {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        {t.loginBtn}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-4">
                {t.registerText}{" "}
                    <Link to="/register" className="text-red-600 font-medium hover:underline">
                        {t.register}
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login; 
