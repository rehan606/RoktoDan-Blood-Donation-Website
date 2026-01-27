
import { useLanguage } from "../../context/LanguageContext";

const PrivacyPolicy = () => {
    const { language } = useLanguage();

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-red-600">
                    {language === "bn"
                        ? "🔐 গোপনীয়তা নীতি"
                        : "🔐 Privacy Policy"}
                    </h1>

                    
                </div>

                {/* Content */}
                {language === "bn" ? (
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                        <strong>রক্তদান</strong> একটি সামাজিক ও অলাভজনক উদ্যোগ।
                        ব্যবহারকারীদের ব্যক্তিগত তথ্যের নিরাপত্তা ও গোপনীয়তা রক্ষা
                        করা আমাদের সর্বোচ্চ অগ্রাধিকার।
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        ১. কোন তথ্য সংগ্রহ করা হয়
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                        <li>নাম</li>
                        <li>রক্তের গ্রুপ</li>
                        <li>মোবাইল নম্বর</li>
                        <li>ইউনিয়ন ও উপজেলা তথ্য</li>
                        <li>স্বেচ্ছায় প্রদানকৃত অন্যান্য তথ্য</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        ২. তথ্য ব্যবহারের উদ্দেশ্য
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                        <li>রক্তদাতা খুঁজে পেতে সহায়তা করা</li>
                        <li>জরুরি রক্তের অনুরোধ পরিচালনা</li>
                        <li>ব্যবহারকারীর সাথে যোগাযোগ</li>
                        <li>সেবার মান উন্নয়ন</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        ৩. তথ্যের নিরাপত্তা
                        </h2>
                        <p>
                        আমরা আপনার তথ্য সুরক্ষার জন্য যুক্তিসঙ্গত প্রযুক্তিগত ও
                        প্রশাসনিক ব্যবস্থা গ্রহণ করি। আপনার তথ্য তৃতীয় পক্ষের কাছে
                        বিক্রি বা শেয়ার করা হয় না।
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        ৪. তৃতীয় পক্ষের সেবা
                        </h2>
                        <p>
                        কিছু ক্ষেত্রে আমরা প্রযুক্তিগত সহায়তার জন্য তৃতীয় পক্ষের
                        সেবা ব্যবহার করতে পারি, তবে তারা আপনার তথ্য গোপন রাখার
                        বাধ্যবাধকতায় আবদ্ধ থাকবে।
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        ৫. নীতিমালার পরিবর্তন
                        </h2>
                        <p>
                        প্রয়োজন অনুযায়ী এই গোপনীয়তা নীতি পরিবর্তিত হতে পারে।
                        পরিবর্তনসমূহ এই পৃষ্ঠায় প্রকাশ করা হবে।
                        </p>
                    </section>
                    </div>
                ) : (
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                        <strong>RoktoDan</strong> is a social and non-profit initiative.
                        Protecting users’ personal information and privacy is our
                        highest priority.
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        1. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                        <li>Name</li>
                        <li>Blood group</li>
                        <li>Phone number</li>
                        <li>Union and Upazila details</li>
                        <li>Any voluntarily provided information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        2. Purpose of Using Information
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                        <li>Helping people find blood donors</li>
                        <li>Managing emergency blood requests</li>
                        <li>Communicating with users</li>
                        <li>Improving our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        3. Data Security
                        </h2>
                        <p>
                        We take reasonable technical and administrative measures to
                        protect your data. We do not sell or share your personal
                        information with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        4. Third-Party Services
                        </h2>
                        <p>
                        In some cases, we may use third-party services for technical
                        support, but they are obligated to keep your information
                        confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        5. Policy Updates
                        </h2>
                        <p>
                        This privacy policy may be updated when necessary. Any changes
                        will be posted on this page.
                        </p>
                    </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
