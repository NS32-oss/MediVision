import { Link } from "react-router-dom"
import React from "react"
const AppointmentCard = ({ appointment }) => {
  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-[#22C55E]"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const { date, time } = formatDateTime(appointment.dateTime)

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#374151]">{appointment.type}</h3>
            <p className="text-sm text-gray-500">ID: {appointment.id}</p>
          </div>
          <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Patient:</span>
            <span className="text-[#374151]">{appointment.patientName}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Doctor:</span>
            <span className="text-[#374151]">Dr. {appointment.doctorName}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Date:</span>
            <span className="text-[#374151]">{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Time:</span>
            <span className="text-[#374151]">{time}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to={`/appointment/${appointment.id}`}
            className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          {appointment.status === "Scheduled" && (
            <button className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
