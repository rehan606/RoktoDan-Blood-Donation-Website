import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {useLanguage} from "../../../context/LanguageContext";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { MdPending } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";

const DonorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axiosSecure.get("/donor/dashboard");
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  // =========================
  // Next Eligible Logic
  // =========================
  let remainingDays = 0;
  let nextEligibleDate = null;
  let isEligible = true;

  if (data?.lastApprovedDonation) {
    const lastDate = new Date(data.lastApprovedDonation.donatedAt);
    const today = new Date();

    const diffTime = today - lastDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 90) {
      remainingDays = Math.ceil(90 - diffDays);
      isEligible = false;

      nextEligibleDate = new Date(lastDate);
      nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        {language === "bn"
          ? "ডোনার ড্যাশবোর্ড"
          : "Donor Dashboard"}
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="flex justify-center">
                <BiSolidDonateBlood className="text-3xl text-red-500  "/>
            </div>
          <h3 className="text-gray-500 mt-2">
            {language === "bn" ? "মোট ডোনেশন" : "Total Donations"}
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {data.total}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="flex justify-center">
                <FcApproval className="text-3xl  " />
            </div>
          <h3 className="text-gray-500 mt-2">
            {language === "bn" ? "অনুমোদিত" : "Approved"}
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {data.approved}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="flex justify-center">
                <MdPending className="text-3xl text-yellow-500 "/>
            </div>
          <h3 className="text-gray-500 mt-2">
            {language === "bn" ? "Pending" : "Pending"}
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {data.pending}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="flex justify-center">
                <FaRegCalendarCheck className="text-3xl text-green-600 "/>
            </div>
          <h3 className="text-gray-500 mt-2">
            {language === "bn" ? "শেষ ডোনেশন" : "Last Donation"}
          </h3>
          <p className="text-sm font-semibold text-green-600">
            {data.lastApprovedDonation
              ? new Date(
                  data.lastApprovedDonation.donatedAt
                ).toLocaleDateString()
              : language === "bn"
              ? "এখনো নেই"
              : "No donation yet"}
          </p>
        </div>
      </div>

      {/* Eligibility Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        {isEligible ? (
          <div className="text-center text-green-600 font-semibold text-lg">
            {language === "bn"
              ? "আপনি এখন রক্তদান করতে পারবেন ❤️"
              : "You are eligible to donate ❤️"}
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-red-600 font-semibold">
              {language === "bn"
                ? `আর ${remainingDays} দিন পরে রক্তদান করতে পারবেন`
                : `You can donate after ${remainingDays} days`}
            </p>

            <p className="text-gray-500 text-sm">
              {language === "bn"
                ? `পরবর্তী যোগ্য তারিখ: ${nextEligibleDate.toLocaleDateString()}`
                : `Next eligible date: ${nextEligibleDate.toLocaleDateString()}`}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

export default DonorDashboard;
