"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import DashboardStats from "../components/DashboardStats"
import { useAuth } from "../context/AuthContext"

const AdminDashboard = () => {
  const { currentUser } = useAuth()
  const [doctors, setDoctors] = useState([])
  const [pendingApprovals, setPendingApprovals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch admin data
    const fetchAdminData = async () => {
      try {
        // In a real app, these would be actual API calls
        // const doctorsResponse = await fetch('/api/admin/doctors');
        // const approvalsResponse = await fetch('/api/admin/pending-approvals');

        // Simulate API response
        setTimeout(() => {
          setDoctors([
            {
              id: "DOC-1001",
              name: "Sarah Johnson",
              specialty: "Cardiology",
              experience: 12,
              patients: 145,
              status: "Active",
            },
            {
              id: "DOC-1002",
              name: "Michael Chen",
              specialty: "Pediatrics",
              experience: 8,
              patients: 98,
              status: "Active",
            },
            {
              id: "DOC-1003",
              name: "Lisa Rodriguez",
              specialty: "Neurology",
              experience: 15,
              patients: 120,
              status: "Active",
            },
            {
              id: "DOC-1004",
              name: "James Wilson",
              specialty: "Orthopedics",
              experience: 10,
              patients: 110,
              status: "On Leave",
            },
          ])

          setPendingApprovals([
            {
              id: "REQ-2001",
              name: "Dr. Robert Taylor",
              specialty: "Dermatology",
              experience: 7,
              email: "robert.taylor@example.com",
              date: "2023-06-10",
            },
            {
              id: "REQ-2002",
              name: "Dr. Amanda Lee",
              specialty: "Psychiatry",
              experience: 9,
              email: "amanda.lee@example.com",
              date: "2023-06-12",
            },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching admin data:", error)
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Patients",
      value: "1,248",
      change: 12,
      bgColor: "bg-blue-100",
      icon: (
        <svg
          className="w-5 h-5 text-[#0EA5E9]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Active Doctors",
      value: "42",
      change: 8,
      bgColor: "bg-green-100",
      icon: (
        <svg
          className="w-5 h-5 text-[#22C55E]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Appointments",
      value: "328",
      change: 15,
      bgColor: "bg-purple-100",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Revenue",
      value: "$52,489",
      change: 7,
      bgColor: "bg-yellow-100",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
  ]

  // Handle doctor approval/rejection
  const handleApproval = (id, approved) => {
    // In a real app, this would be an API call
    // await fetch(`/api/admin/approve-doctor/${id}`, { method: 'POST', body: JSON.stringify({ approved }) });

    // Update local state
    setPendingApprovals(pendingApprovals.filter((doctor) => doctor.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#374151]">Admin Dashboard</h1>
            <p className="text-gray-600">Manage doctors, patients, and system metrics</p>
          </div>

          {/* Dashboard Stats */}
          <div className="mb-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardStats stats={stats} />
            )}
          </div>

          {/* Doctor Management */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Doctor Management</h2>
              <Link to="/doctors" className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium">
                View All Doctors
              </Link>
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
                        ID
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
                        Specialty
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Experience
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Patients
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
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
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#374151]">
                          Dr. {doctor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {doctor.experience} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.patients}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              doctor.status === "Active"
                                ? "bg-green-100 text-[#22C55E]"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {doctor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <Link
                              to={`/doctor/${doctor.id}`}
                              className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                            >
                              View
                            </Link>
                            <Link
                              to={`/doctor/${doctor.id}/edit`}
                              className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pending Approvals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Pending Doctor Approvals</h2>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ) : pendingApprovals.length > 0 ? (
              <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
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
                        Specialty
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Experience
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Applied
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
                    {pendingApprovals.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#374151]">
                          {doctor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {doctor.experience} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{doctor.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproval(doctor.id, true)}
                              className="text-[#22C55E] hover:text-[#22C55E]/80 font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleApproval(doctor.id, false)}
                              className="text-red-600 hover:text-red-700 font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">No pending doctor approvals at this time.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard
