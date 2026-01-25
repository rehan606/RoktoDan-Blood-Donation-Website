import { FaFacebookF, FaPhoneAlt, FaHeart } from "react-icons/fa";

const Footer = ({ language = "bn" }) => {
  const content = {
    bn: {
      description:
        "RoktoDan একটি সামাজিক উদ্যোগ যা সান্দ্বীপ উপজেলার মানুষের জন্য দ্রুত ও নির্ভরযোগ্য রক্ত সহায়তা নিশ্চিত করে।",
      quickLinks: "দ্রুত লিংক",
      links: ["হোম", "রক্তদাতা", "জরুরি অনুরোধ", "যোগাযোগ"],
      emergency: "জরুরি যোগাযোগ",
      hotline: "হটলাইন",
      rights: "সর্বস্বত্ব সংরক্ষিত",
    },
    en: {
      description:
        "RoktoDan is a social initiative ensuring fast and reliable blood support for the people of Sandwip Upazila.",
      quickLinks: "Quick Links",
      links: ["Home", "Donors", "Urgent Requests", "Contact"],
      emergency: "Emergency Contact",
      hotline: "Hotline",
      rights: "All rights reserved",
    },
  };

  const t = content[language];

  return (
    <footer className="bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">RoktoDan</h3>
          <p className="text-sm text-red-100">{t.description}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
          <ul className="space-y-2 text-sm">
            {t.links.map((link, index) => (
              <li
                key={index}
                className="hover:underline cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency */}
        <div>
          <h4 className="font-semibold mb-4">{t.emergency}</h4>
          <p className="flex items-center gap-2 text-sm">
            <FaPhoneAlt /> {t.hotline}: 999
          </p>
          <p className="mt-3 text-sm">
            <FaFacebookF className="inline mr-2" />
            Facebook Page
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-red-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} RoktoDan. {t.rights}.  
        <span className="inline-flex items-center gap-1 ml-2">
          Made with <FaHeart className="text-red-300" /> for Humanity
        </span>
      </div>
    </footer>
  );
};

export default Footer;
