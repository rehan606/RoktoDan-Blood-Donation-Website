import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = 'user',
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role/${user.email}`
      );
      return res.data.role;
    },
  });

  return {
    role,
    roleLoading,
    isAdmin: role === "admin",
    refetchRole: refetch,
  };
};

export default useUserRole;
