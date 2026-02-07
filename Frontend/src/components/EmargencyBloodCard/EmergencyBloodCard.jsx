import React from 'react'
import getTimeAgo from '../../utils/getTimeAgo'

const EmergencyBloodCard = ({post, idx, language }) => {
    

    return (
        <div>
            <div
                key={idx}
                className="relative bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500"
            >
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                {post.urgent}
                </span>

                <p className="text-xs text-gray-500 mb-2">
                {getTimeAgo(post.createdAt, language)}
                </p>

                <h3 className="text-2xl font-bold text-red-600 mb-3">
                {post.bloodGroup}
                </h3>

                <p><strong>{language === "bn" ? "রোগীর নাম" : "Patient Name"}:</strong> {post.patientName}</p>
                <p><strong>{language === "bn" ? "ইউনিয়ন" : "Union"}:</strong> {post.union}</p>
                <p><strong>{language === "bn" ? "যোগাযোগ" : "Contact"}:</strong> {post.phone}</p>

                <a
                href={`tel:${post.phone}`}
                className="mt-4 inline-block w-full text-center bg-red-600 text-white py-2 rounded-lg"
                >
                {language === "bn" ?  "রক্ত দিতে যোগাযোগ করুন" : "Contact to Donate"}
                </a>
            </div>
        </div>
    )
}

export default EmergencyBloodCard
