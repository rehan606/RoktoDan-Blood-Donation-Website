import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth } from '../../firebase/firebase.init';
import { FaGoogle } from "react-icons/fa";
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
// import useAuth from '../../Hooks/useAuth';

const LoginWithGoogle = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();   
    // const {signInWithGoogle} = useAuth();

    // 🔴 Google Login
    const handleGoogleLogin = () => {
        // signInWithGoogle()
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
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
            console.log("Google User:", result.user);
            navigate("/");
        })
        .catch((error) => {
            console.error(error.message);
        });
    };


    return (
        <div>
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
        </div>
    )
}

export default LoginWithGoogle
