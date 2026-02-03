import { useLanguage } from "../../context/LanguageContext";

const DashboardLoader = () => {
    const language = useLanguage();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md text-center">
                {/* Blood Drop Animation */}
                <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-14 h-14 bg-red-500 rounded-full animate-ping absolute"></div>
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    🩸
                    </div>
                </div>
                </div>

                {/* Text */}
                {language === 'bn'? 
                <div>
                    <h2 className="text-xl font-semibold text-gray-800"> Dashboard লোড হচ্ছে </h2>
                    <p className="text-gray-500 mt-2"> দয়া করে একটু অপেক্ষা করুন... </p>
                </div> 
                : 
                <div>
                    <h2 className="text-xl font-semibold text-gray-800"> Dashboard is Loading </h2>
                    <p className="text-gray-500 mt-2"> Please wait a moment... </p>
                </div> }

                {/* Skeleton Cards */}
                <div className="mt-8 space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                    key={item}
                    className="h-16 w-full rounded-lg bg-gray-200 animate-pulse"
                    ></div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardLoader;
