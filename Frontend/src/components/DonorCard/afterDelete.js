import React from 'react'

const DonorCard = ({donor}) => {
    return (
        <div>
            <div
                key={donor.id}
                className=" bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500"
                >
                {/* Urgent badge */}
                <div className='flex items-center justify-between mb-6'>
                    <h3 className="text-2xl font-bold text-red-600 ">
                        {donor.bloodGroup}
                    </h3>

                    <span className=" bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        {donor.status}
                    </span>

                </div>

                <div className='flex items-center justify-between overflow-hidden'>
                    <div>
                        <p className="text-gray-700">
                            <strong>{donor.title}:</strong> {donor.name}
                        </p>

                        <p className="text-gray-700">
                            <strong>{donor.address}:</strong> {donor.union}
                        </p>

                        <p className="text-gray-700">
                            <strong>{donor.number}:</strong> {donor.phone}
                        </p>
                    </div>
                    
                    <div className='flex items-center justify-center  bg-gray-200 rounded-lg w-20 h-20'>
                        <div className='w-full '>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>

                <a
                    href={`tel:${donor.phone}`}
                    className="mt-4 inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                >
                    {donor.donate}
                </a>
            </div>

        </div>
    )
}

export default DonorCard
