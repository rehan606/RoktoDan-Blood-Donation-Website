import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth } from '../../firebase/firebase.init';
import { FaGoogle } from "react-icons/fa";
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
// import useAuth from '../../Hooks/useAuth';

const LoginWithGoogle = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();   
    const axiosInstance = useAxios();
    // const {signInWithGoogle} = useAuth();

    // 🔴 Google Login

    const handleGoogleLogin = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // 🔑 Firebase ID Token
      const token = await user.getIdToken();

      // const userInfo = {
      //   email: user.email,
      //   role: "user",
      //   created_at: new Date().toISOString(),
      //   last_log_in: new Date().toISOString(),
      // };

      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        role: "user",
        image: result.user.photoURL, // ✅ Google image
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // 🔴 token পাঠানো হচ্ছে
      const res = await axiosInstance.post(
        "/users",
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User saved:", res.data);

      Swal.fire({
        icon: "success",
        title:
          language === "bn"
            ? "সফলভাবে লগইন হয়েছে"
            : "Logged in successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    })
    .catch((error) => {
      console.error(error);
    });
};


    // const handleGoogleLogin = () => {
    //     // signInWithGoogle()
    //     const provider = new GoogleAuthProvider();

    //     signInWithPopup(auth, provider)
    //     .then(async (result) => {

    //         const user = result.user;

    //         // Update user in Database
    //         const userInfo = {
    //             email: user.email,
    //             role: 'user', // default role
    //             created_at : new Date().toISOString(),
    //             last_log_in : new Date().toISOString()
    //         }

    //         const res = await axiosInstance.post('/users', userInfo);
    //         console.log('User update info', res.data)

    //         Swal.fire({
    //             position: "center",
    //             icon: "success",
    //             title:
    //                 language === "bn"
    //                     ? "সফলভাবে লগইন হয়েছে"
    //                     : "Logged in successfully",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //         console.log("Google User:", result.user);
    //         navigate("/");
    //     })
    //     .catch((error) => {
    //         console.error(error.message);
    //     });
    // };


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
