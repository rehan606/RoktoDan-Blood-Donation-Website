import { FaFacebookF, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { FaTint } from "react-icons/fa";

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
      useful: {
        title: "প্রয়োজনীয় তথ্য",
        items: [
          "রক্তদানের শর্ত",
          "রক্তদানের উপকারিতা",
          "প্রশ্নোত্তর (FAQ)",
          "গোপনীয়তা নীতি",
        ],
      },
    },
    en: {
      description:
        "RoktoDan is a social initiative ensuring fast and reliable blood support for the people of Sandwip Upazila.",
      quickLinks: "Quick Links",
      links: ["Home", "Donors", "Urgent Requests", "Contact"],
      emergency: "Emergency Contact",
      hotline: "Hotline",
      rights: "All rights reserved",
      useful: {
        title: "Useful Info",
        items: [
          "Eligibility Rules",
          "Benefits of Donation",
          "FAQ",
          "Privacy Policy",
        ],
      },
    },
  };

  const t = content[language];

  return (
    <footer className="bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        
        {/* About */}
        <div>
          <Link to="/" className="flex items-center gap-1">
            <FaTint className="text-white w-8 h-8" />
            <div>
              {language === "bn" ? (
                <h1 className="text-xl md:text-2xl text-zinc-900 font-bold tracking-wide">
                  রক্ত<span className="text-white">দান</span>
                </h1>
              ) : (
                <h1 className="text-xl uppercase text-zinc-900 font-bold tracking-wide">
                  Rokto<span className="text-white">Dan</span>
                </h1>
              )}
            </div>
          </Link>
          <p className="text-sm text-red-100 mt-4">{t.description}</p>
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

        {/* Useful Info (NEW COLUMN) */}
        <div>
          <h4 className="font-semibold mb-4">{t.useful.title}</h4>
          <ul className="space-y-2 text-sm">
            {t.useful.items.map((item, index) => (
              <li
                key={index}
                className="hover:underline cursor-pointer"
              >
                {item}
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
