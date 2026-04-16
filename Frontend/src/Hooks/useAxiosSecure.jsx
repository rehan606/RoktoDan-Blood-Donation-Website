import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000/`,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // =========================
    // 🔐 Request Interceptor
    // =========================
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // =========================
    // 🔁 Response Interceptor
    // =========================
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;

        // 🔒 Forbidden
        if (status === 403) {
          navigate("/forbidden");
        }

        // 🔐 Unauthorized
        else if (status === 401) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // =========================
    // 🧹 Cleanup (VERY IMPORTANT)
    // =========================
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;