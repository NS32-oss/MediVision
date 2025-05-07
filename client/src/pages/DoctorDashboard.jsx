"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AppointmentCard from "../components/AppointmentCard"
import { useAuth } from "../context/AuthContext"

const DoctorDashboard = () => {
  const { currentUser } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch doctor data
    const fetchDoctorData = async () => {
      try {
        // In a real app, these would be actual API calls
        // const appointmentsResponse = await fetch(`/api/doctors/${currentUser.id}/appointments`);
        // const patientsResponse = await fetch(`/api/doctors/${currentUser.id}/patients`);

        // Simulate API response
        setTimeout(() => {
          setAppointments([
            {
              id: "APT-1001",
              type: "General Checkup",
              patientName: "John Doe",
              doctorName: currentUser?.name || "Dr. Sarah Johnson",
              dateTime: "2023-06-15T10:30:00",
              status: "Scheduled",
            },
            {
              id: "APT-1002",
              type: "Follow-up",
              patientName: "Jane Smith",
              doctorName: currentUser?.name || "Dr. Sarah Johnson",
              dateTime: "2023-06-15T11:30:00",
              status: "Scheduled",
            },
            {
              id: "APT-1003",
              type: "Consultation",
              patientName: "Robert Brown",
              doctorName: currentUser?.name || "Dr. Sarah Johnson",
              dateTime: "2023-06-15T14:00:00",
              status: "Scheduled",
            },
            {
              id: "APT-1004",
              type: "Follow-up",
              patientName: "Emily Wilson",
              doctorName: currentUser?.name || "Dr. Sarah Johnson",
              dateTime: "2023-06-16T09:30:00",
              status: "Scheduled",
            },
          ])

          setPatients([
            {
              id: "PAT-2001",
              name: "John Doe",
              age: 45,
              gender: "Male",
              phone: "(555) 123-4567",
              lastVisit: "2023-05-10",
              condition: "Hypertension",
            },
            {
              id: "PAT-2002",
              name: "Jane Smith",
              age: 38,
              gender: "Female",
              phone: "(555) 987-6543",
              lastVisit: "2023-06-01",
              condition: "Diabetes Type 2",
            },
            {
              id: "PAT-2003",
              name: "Robert Brown",
              age: 62,
              gender: "Male",
              phone: "(555) 456-7890",
              lastVisit: "2023-05-22",
              condition: "Arthritis",
            },
            {
              id: "PAT-2004",
              name: "Emily Wilson",
              age: 29,
              gender: "Female",
              phone: "(555) 789-0123",
              lastVisit: "2023-06-05",
              condition: "Asthma",
            },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching doctor data:", error)
        setIsLoading(false)
      }
    }

    fetchDoctorData()
  }, [currentUser])

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#374151]">Welcome, {currentUser?.name || "Doctor"}</h1>
            <p className="text-gray-600">Manage your appointments and patient records</p>
          </div>

          {/* Today's Schedule */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Today's Schedule</h2>
              <Link to="/appointments" className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium">
                View All Appointments
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-md shadow-sm border border-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">No appointments scheduled for today.</p>
              </div>
            )}
          </div>

          {/* Patient Records */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151] mb-2 md:mb-0">Patient Records</h2>
              <div className="flex">
                <div className="relative mr-2">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <Link
                  to="/patients"
                  className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium flex items-center"
                >
                  View All Patients
                </Link>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Patient ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Age/Gender
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Condition
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Visit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{patient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#374151]">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {patient.age} / {patient.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{patient.condition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{patient.lastVisit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <Link
                              to={`/patient/${patient.id}`}
                              className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                            >
                              View
                            </Link>
                            <Link
                              to={`/appointment/new?patientId=${patient.id}`}
                              className="text-[#22C55E] hover:text-[#22C55E]/80 font-medium"
                            >
                              Schedule
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredPatients.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No patients found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default DoctorDashboard
