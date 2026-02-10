import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLanguage } from "../../../context/LanguageContext";
import { FcDatabase } from "react-icons/fc";

const MyBloodRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {language} = useLanguage()

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-blood-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blood-requests/my?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 px-8 mt-10">
      {requests.length === 0 && (
        <div className="flex flex-col items-center  mx-auto space-y-4">
            <FcDatabase className="text-6xl"/>
            <p className="text-gray-500 text-center"> {language === "bn" ? "আপনার  কোনো রক্তের অনুরোধ নেই । " : "No blood requests found."} </p>
        </div>
      )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {requests.map((req) => (
                
                <div
                key={req._id}
                className="border rounded-lg p-4 shadow-sm bg-[#0F2A44] flex items-start justify-between"
                >
                    <div>
                        <h3 className="font-semibold text-lg">
                            Blood Group: {req.bloodGroup}
                        </h3>
                        <p>Union: {req.union}</p>
                        <p>Phone: {req.phone}</p>
                        <p>Message: {req.message}</p>
                    </div>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                        req.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : req.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {req.status}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MyBloodRequests;
