"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"

const AppointmentDetails = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const [appointment, setAppointment] = useState(null)
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const fetchAppointmentDetails = async () => {
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch(`/api/appointments/${id}`);

        // Simulate API response
        setTimeout(() => {
          setAppointment({
            id: id,
            type: "General Checkup",
            patientName: "John Doe",
            patientId: "PAT-2001",
            patientAge: 45,
            patientGender: "Male",
            doctorName: "Dr. Sarah Johnson",
            doctorId: "DOC-1001",
            doctorSpecialty: "Cardiology",
            dateTime: "2023-06-15T10:30:00",
            status: "Scheduled",
            reason: "Annual physical examination and blood pressure check",
            notes: [
              {
                id: "NOTE-1",
                date: "2023-05-10",
                content: "Patient reported occasional chest pain. Prescribed nitroglycerin as needed.",
                doctor: "Dr. Sarah Johnson",
              },
              {
                id: "NOTE-2",
                date: "2023-04-15",
                content: "Blood pressure: 140/90. Recommended lifestyle changes and scheduled follow-up.",
                doctor: "Dr. Sarah Johnson",
              },
            ],
          })

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching appointment details:", error)
        setIsLoading(false)
      }
    }

    fetchAppointmentDetails()
  }, [id])

  const handleSubmitNotes = async (e) => {
    e.preventDefault()

    if (!notes.trim()) return

    setIsSaving(true)

    try {
      // In a real app, this would be an actual API call
      // await fetch(`/api/appointments/${id}/notes`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ content: notes }),
      // });

      // Simulate API response
      setTimeout(() => {
        // Add the new note to the appointment
        const newNote = {
          id: `NOTE-${appointment.notes.length + 1}`,
          date: new Date().toISOString().split("T")[0],
          content: notes,
          doctor: currentUser?.name || "Dr. Sarah Johnson",
        }

        setAppointment({
          ...appointment,
          notes: [newNote, ...appointment.notes],
        })

        setNotes("")
        setIsSaving(false)
      }, 1000)
    } catch (error) {
      console.error("Error saving notes:", error)
      setIsSaving(false)
    }
  }

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "", time: "" }

    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const { date, time } = appointment ? formatDateTime(appointment.dateTime) : { date: "", time: "" }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>

              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 mb-8">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ) : appointment ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-[#374151]">Appointment Details</h1>
                  <div
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      appointment.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Completed"
                          ? "bg-green-100 text-[#22C55E]"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </div>
                </div>
                <p className="text-gray-600">ID: {appointment.id}</p>
              </div>

              {/* Appointment Information */}
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold text-[#374151] mb-4">Appointment Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#374151] mb-3">{appointment.type}</h3>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-24 flex-shrink-0">Date:</span>
                        <span className="text-[#374151]">{date}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-24 flex-shrink-0">Time:</span>
                        <span className="text-[#374151]">{time}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-24 flex-shrink-0">Reason:</span>
                        <span className="text-[#374151]">{appointment.reason}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Patient</h4>
                        <p className="text-[#374151] font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">
                          ID: {appointment.patientId} | {appointment.patientAge} years, {appointment.patientGender}
                        </p>
                        <Link
                          to={`/patient/${appointment.patientId}`}
                          className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                        >
                          View Patient Profile
                        </Link>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Doctor</h4>
                        <p className="text-[#374151] font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">{appointment.doctorSpecialty}</p>
                        <Link
                          to={`/doctor/${appointment.doctorId}`}
                          className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                        >
                          View Doctor Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {appointment.status === "Scheduled" && (
                    <>
                      <button className="px-4 py-2 bg-[#0EA5E9] text-white font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors">
                        Cancel Appointment
                      </button>
                    </>
                  )}
                  {appointment.status === "Completed" && (
                    <button className="px-4 py-2 bg-[#22C55E] text-white font-medium rounded-md hover:bg-[#22C55E]/90 transition-colors">
                      Book Follow-up
                    </button>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-[#374151] mb-4">Appointment Notes</h2>

                {currentUser?.role === "doctor" && (
                  <form onSubmit={handleSubmitNotes} className="mb-6">
                    <div className="mb-3">
                      <label htmlFor="notes" className="block text-sm font-medium text-[#374151] mb-1">
                        Add Notes
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                        placeholder="Enter appointment notes here..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSaving || !notes.trim()}
                      className="px-4 py-2 bg-[#0EA5E9] text-white font-medium rounded-md hover:bg-[#0EA5E9]/90 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? "Saving..." : "Save Notes"}
                    </button>
                  </form>
                )}

                {appointment.notes.length > 0 ? (
                  <div className="space-y-4">
                    {appointment.notes.map((note) => (
                      <div key={note.id} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-[#374151]">{note.doctor}</span>
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-[#374151]">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No notes available for this appointment.</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-[#374151] mb-2">Appointment Not Found</h1>
              <p className="text-gray-600 mb-6">
                The appointment you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Link
                to="/"
                className="px-4 py-2 bg-[#0EA5E9] text-white font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors"
              >
                Go Home
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AppointmentDetails
