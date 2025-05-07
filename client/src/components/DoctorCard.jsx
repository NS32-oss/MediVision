import { Link } from "react-router-dom"
import React from "react"
const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#374151]">Dr. {doctor.name}</h3>
            <p className="text-sm text-[#0EA5E9] font-medium">{doctor.specialty}</p>
          </div>
          <div
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              doctor.available ? "bg-green-100 text-[#22C55E]" : "bg-red-100 text-red-600"
            }`}
          >
            {doctor.available ? "Available" : "Unavailable"}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Experience:</span>
            <span className="text-[#374151]">{doctor.experience} years</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Rating:</span>
            <div className="flex items-center">
              <span className="text-[#374151] mr-1">{doctor.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Patients:</span>
            <span className="text-[#374151]">{doctor.patientCount}+</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to={`/doctor/${doctor.id}`}
            className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-sm font-medium transition-colors"
          >
            View Profile
          </Link>
          <Link
            to={`/appointment/new?doctorId=${doctor.id}`}
            className="px-3 py-1 bg-[#0EA5E9] text-white text-sm font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
