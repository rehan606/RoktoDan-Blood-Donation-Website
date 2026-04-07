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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="space-y-4 px-8 mt-10">
      {requests.length === 0 && (
        <div className="flex flex-col items-center  mx-auto space-y-4">
            <FcDatabase className="text-6xl"/>
            <p className="text-gray-500 text-center"> {language === "bn" ? "আপনার  কোনো রক্তের অনুরোধ নেই । " : "No blood requests found."} </p>
        </div>
      )}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="relative group rounded-2xl p-[1px] bg-white hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-full w-full rounded-2xl bg-white backdrop-blur-md p-5 flex flex-col justify-between shadow-xl">
                
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between">
                    
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                       {req.name}
                    </h3>
                    <h4 className=" font-bold text-gray-700 mb-2 bg-red-100 px-4 py-1 rounded-full">
                      🩸 {req.bloodGroup}
                    </h4>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="text-gray-400">📍 Union:</span> {req.union}</p>
                    <p><span className="text-gray-400">📞 Phone:</span> {req.phone}</p>
                    <p className="line-clamp-2">
                      <span className="text-gray-400">💬</span> {req.message}
                    </p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                      req.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                        : req.status === "approved"
                        ? "bg-green-500/20 text-green-400 border border-green-400/30"
                        : "bg-red-500/20 text-red-400 border border-red-400/30"
                    }`}
                  >
                    {req.status}
                  </span>

                  {/* Optional Button */}
                  <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-1 rounded-full transition">
                    View
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default MyBloodRequests;
