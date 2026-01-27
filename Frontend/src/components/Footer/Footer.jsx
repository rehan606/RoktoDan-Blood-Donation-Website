import { FaFacebookF, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { FaTint } from "react-icons/fa";
import { Link } from "react-router";

const Footer = ({ language = "bn" }) => {
  const content = {
    bn: {
      description:
        "রক্তদান একটি সামাজিক উদ্যোগ যা সান্দ্বীপ উপজেলার মানুষের জন্য দ্রুত ও নির্ভরযোগ্য রক্ত সহায়তা নিশ্চিত করে।",
      quickLinks: "দ্রুত লিংক",
      links: [
        { label: "হোম", path: "/" },
        { label: "রক্তদাতা", path: "/all-donors" },
        { label: "জরুরি অনুরোধ", path: "/request-blood" },
        { label: "যোগাযোগ", path: "/contact" },
      ],
      emergency: "জরুরি যোগাযোগ",
      hotline: "হটলাইন",
      rights: "সর্বস্বত্ব সংরক্ষিত",
      useful: {
        title: "প্রয়োজনীয় তথ্য",
        items: [
          { label: "রক্তদানের শর্ত", path: "/eligibility" },
          { label: "রক্তদানের উপকারিতা", path: "/benefits" },
          { label: "প্রশ্নোত্তর (FAQ)", path: "/faq" },
          { label: "গোপনীয়তা নীতি", path: "/privacy-policy" },
        ],
      },
    },

    en: {
      description:
        "RoktoDan is a social initiative ensuring fast and reliable blood support for the people of Sandwip Upazila.",
      quickLinks: "Quick Links",
      links: [
        { label: "Home", path: "/" },
        { label: "Donors", path: "/allDonors" },
        { label: "Urgent Requests", path: "/request-blood" },
        { label: "Contact", path: "/contact" },
      ],
      emergency: "Emergency Contact",
      hotline: "Hotline",
      rights: "All rights reserved",
      useful: {
        title: "Useful Info",
        items: [
          { label: "Eligibility Rules", path: "/eligibility" },
          { label: "Benefits of Donation", path: "/benefits" },
          { label: "FAQ", path: "/faq" },
          { label: "Privacy Policy", path: "/privacy-policy" },
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
          <Link to="/" className="flex items-center gap-2">
            <FaTint className="text-white w-8 h-8" />
            {language === "bn" ? (
              <h1 className="text-2xl font-bold tracking-wide">
                রক্ত<span className="text-white">দান</span>
              </h1>
            ) : (
              <h1 className="text-2xl font-bold tracking-wide uppercase">
                Rokto<span className="text-white">Dan</span>
              </h1>
            )}
          </Link>
          <p className="text-sm text-red-100 mt-4">{t.description}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
          <ul className="space-y-2 text-sm">
            {t.links.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="hover:underline hover:text-white transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Info */}
        <div>
          <h4 className="font-semibold mb-4">{t.useful.title}</h4>
          <ul className="space-y-2 text-sm">
            {t.useful.items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="hover:underline hover:text-white transition"
                >
                  {item.label}
                </Link>
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
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm hover:underline"
          >
            <FaFacebookF /> Facebook Page
          </a>
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
