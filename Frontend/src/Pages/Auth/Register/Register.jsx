import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import useAuth from "../../../Hooks/useAuth";
import axios from 'axios';


import { registerText } from "../../../utils/registerText";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../../firebase/firebase.init";
import LoginWithGoogle from "../../../components/Buttons/LoginWithGoogle";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
    const {register, handleSubmit, formState: { errors }, } = useForm();
    const { language } = useLanguage();
    const t = registerText[language];
    const {createUser, updateUserProfile } = useAuth();
    const [profilePicture, setProfilePicture] = useState('');
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    // Submit FOrm 
    const onSubmit = (data) => {
        console.log("Register Data:", data);
        createUser(data.email, data.password)
            .then( async (result) => {
                
                console.log(result.user)
                // ======= Update user info in Database =======
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    created_at : new Date().toISOString(),
                    last_log_in : new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);


                // ======= upadate user profile in firebase =======
                const userProfile = {
                    displayName : data.name,
                    photoURL : profilePicture,
                }
                updateUserProfile(userProfile)
                .then(() => {
                    console.log('Profile name and Pic Updated')
                    navigate(from);
                })
                .catch(error =>{
                    console.log(error)
                })

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:
                        language === "bn"
                            ? "সফলভাবে রেজিস্টার হয়েছে"
                            : "Register successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/')

                // navigate(from, { replace: true }); // or dashboard
            })
            .catch(error => {
                console.error(error);
            })
    };

    // Upload Image 
    const handleImageUpload = async(e) =>{
        const image = e.target.files[0];
        console.log(image)
        const formData = new FormData();
        formData.append("image", image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUploadUrl, formData)

        setProfilePicture(res.data.data.url);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">
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

                    {/* Upload images  */}
                    <div>
                        <label className="label">{t.imageLabel}</label>
                        <input type="file" onChange={handleImageUpload} className="mt-1 w-full px-4 py-2 border border-dashed border-gray-600 rounded-lg cursor-pointer" placeholder={t.imagePlaceholder} />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 cursor-pointer"
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
