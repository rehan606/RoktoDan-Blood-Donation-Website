import { Link } from "react-router";
import { FaBan, FaHome } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const Forbidden = () => {
    const {language} = useLanguage();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
                
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 text-red-600 p-5 rounded-full">
                        <FaBan size={40} />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-red-600 mb-2">
                403
                </h1>

                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Access Forbidden
                </h2>

                { language === 'bn' ? 
                    <p className="text-gray-600 mb-6 leading-relaxed">
                    দুঃখিত, এই পেজটি দেখার অনুমতি আপনার নেই।  
                    আপনার role অনুযায়ী আপনি এখানে প্রবেশ করতে পারবেন না।
                    </p> 
                    : 
                    <p className="text-gray-600 mb-6 leading-relaxed">
                    Sorry, you do not have permission to view this page. Based on your role, you are not allowed to access this page.
                    </p>
                }
                

                <Link
                to="/"
                className="inline-block w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                    { language === 'bn' ? <div className="flex items-center justify-center gap-3"> <FaHome /> হোমে ফিরে যান </div> : <div  className="flex items-center justify-center gap-3"> <FaHome /> Back to Home</div>}
                 
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
