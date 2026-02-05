import { useState } from "react";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";

const DonorCard = ({ donor }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const {language} = useLanguage();

  const handleOpenModal = async () => {
    const res = await axios.get(
      `/donors/${donor._id}`
    );
    setDetails(res.data);
    setOpen(true);
  };

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-red-600">
            {donor.bloodGroup}
          </h3>

          <span
            className={`text-xs px-3 py-1 rounded-full text-white ${
              donor.isAvailable ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {donor.isAvailable
              ? "Available"
              : "Not Available"}
          </span>
        </div>

        <div className='flex items-center justify-between overflow-hidden'>
          <div>
            <p className="text-gray-700">
              <strong>Name:</strong> {donor.name}
            </p>
            <p className="text-gray-700">
              <strong>Union:</strong> {donor.union}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {donor.phone}
            </p>
          </div>

          <div className='flex items-center justify-center  bg-gray-200 rounded-lg w-20 h-20'>
              <div className='w-full '>
                  <img
                    src={donor.image || "/avatar.png"}
                    alt={donor.name}
                    className="w-24 h-24 mx-auto  object-cover rounded-lg"
                  />
              </div>
          </div>
        </div>

        <button
          onClick={handleOpenModal}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
            { language === "bn" ?  "বিস্তারিত দেখুন" : "See More Details" }
            
        </button>
      </div>

      {/* Modal */}
      {open && details && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-red-600 mb-4">
              Donor Details
            </h3>

            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>Email:</strong> {donor.email}</p>
            <p><strong>Phone:</strong> {donor.phone}</p>
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>Union:</strong> {donor.union}</p>
            <p><strong>Last Donation:</strong> {donor.lastDonationDate} </p>

            <p
              className={`mt-3 font-semibold ${
                donor.isAvailable
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              
              
              {donor.isAvailable
                ? <span>{ language === "bn" ?  "এই মুহূর্তে রক্ত দিতে পারবেন " : "He can donate blood right now." }</span>
                : <span>{ language === "bn" ?  "এখনো রক্ত দেওয়ার সময় হয়নি " : "It's not time to donate blood yet." } </span> }
            </p>

            {donor.isAvailable && (
              <a
                href={`tel:${donor.phone}`}
                className="block mt-4 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                { language === "bn" ? "কল করুন" : "Call Donor"}
                
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DonorCard;
