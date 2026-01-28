import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { loginText } from "../../../utils/loginText"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";


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
            console.log("Logged in:", result.user);
            navigate("/"); // or dashboard
        })
        .catch((error) => {
            console.error(error.message);
        });
    };

    // 🔴 Google Login
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Google User:", result.user);
            navigate("/");
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
                <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition mb-4 cursor-pointer"
                >
                    <FaGoogle className="text-red-500" />
                    <span className="text-sm font-medium">
                        {language === "bn" ? "Google দিয়ে লগইন করুন" : "Login with Google"}
                    </span>
                </button>

                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

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
