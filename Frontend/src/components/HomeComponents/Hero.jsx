
import { Link } from 'react-router';
import HeroImage from '../../assets/images/Blood-collect-image.png';


const Hero = ({ language, }) => {
  const isBangla = language === "bn";

  return (
    <section
      className={`min-h-[90vh] flex items-center bg-linear-to-br from-red-600/30 via-white to-red-400/30
      ${isBangla ? "font-bn" : "font-en"}`}
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-red-600">
            {isBangla
              ? "রক্ত দিন, জীবন বাঁচান"
              : "Donate Blood, Save Lives"}
          </h1>

          <p className="mt-4 text-gray-700 text-xl">
            {isBangla
              ? <p> <span className="text-red-600 font-semibold">রক্তদান</span> হলো <span className="text-red-600 font-semibold">Sandwip</span>-এর মানুষের জন্য একটি স্বেচ্ছাসেবী রক্তদান প্ল্যাটফর্ম।  আপনার একটি রক্তদানই হতে পারে কারো নতুন জীবন।</p>
              : <p> <span className="text-red-600 font-semibold">RoktoDan</span> is a voluntary blood donation platform for the people of <span className="text-red-600 font-semibold">Sandwip</span>. A single donation from you can give someone a new life."</p>}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={'/register-donor'} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition">
              {isBangla ? "রক্তদাতা হন" : "Become a Donor"}
            </Link>

            <Link to={'/request-blood'} className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded transition">
              {isBangla ? "রক্তের অনুরোধ" : "Request Blood"}
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex justify-center w-full h-96 rounded-3xl ">
          <img
            src={HeroImage}
            alt="Blood Donation"
            className="max-w-full h-auto rounded-3xl animate-pulse  transition-all duration-300 border-10 border-red-500/20 shadow"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
