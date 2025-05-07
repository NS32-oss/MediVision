import { Link } from "react-router-dom"
import React from "react"
const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#374151]">{patient.name}</h3>
            <p className="text-sm text-gray-500">ID: {patient.id}</p>
          </div>
          <div className="bg-[#F8FAFC] text-[#0EA5E9] text-xs font-medium px-2.5 py-0.5 rounded-full">
            {patient.status}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Age:</span>
            <span className="text-[#374151]">{patient.age} years</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Gender:</span>
            <span className="text-[#374151]">{patient.gender}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Phone:</span>
            <span className="text-[#374151]">{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Last Visit:</span>
            <span className="text-[#374151]">{patient.lastVisit}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to={`/patient/${patient.id}`}
            className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/appointment/new?patientId=${patient.id}`}
            className="text-[#22C55E] hover:text-[#22C55E]/80 text-sm font-medium transition-colors"
          >
            Schedule Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PatientCard
