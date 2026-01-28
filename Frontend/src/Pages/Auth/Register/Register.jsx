import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import useAuth from "../../../Hooks/useAuth";

import { FaGoogle } from "react-icons/fa";
import { registerText } from "../../../utils/registerText";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";

const Register = () => {
    const {register, handleSubmit, formState: { errors }, } = useForm();
    const { language } = useLanguage();
    const t = registerText[language];
    const {createUser } = useAuth();


    // 🔴 Google Login
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Google User:", result.user);
            Navigate("/");
        })
        .catch((error) => {
            console.error(error.message);
        });
    };


    const onSubmit = (data) => {
        console.log("Register Data:", data);
        createUser(data.email, data.password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.error(error);
        })
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

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium">
                        {t.nameLabel}
                        </label>
                        <input
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                        placeholder={t.namePlaceholder}
                        {...register("name", {
                            required: t.errors.nameRequired,
                        })}
                        />
                        {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">
                        {t.emailLabel}
                        </label>
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
                    <Link to="/login" className="text-red-600 font-medium hover:underline">
                        {t.login}
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
