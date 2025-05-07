"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentCard from "../components/AppointmentCard";
import { useAuth } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  const API_BASE_URL = "http://localhost:8000"; // Backend URL

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!currentUser) return; // Prevent API calls if currentUser is undefined
      console.log("Fetching data for user:", currentUser._id);
  
      try {
        setIsLoading(true);
  
        // Fetch appointments
        const appointmentsResponse = await fetch(
          `${API_BASE_URL}/api/v1/doctors/${currentUser._id}/appointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (appointmentsResponse.ok) {
          const appointmentsData = await appointmentsResponse.json();
          setAppointments(appointmentsData.data);
        } else {
          console.error("Failed to fetch appointments");
        }
  
        // Fetch patients
        const patientsResponse = await fetch(
          `${API_BASE_URL}/api/v1/doctors/${currentUser._id}/patients`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (patientsResponse.ok) {
          const patientsData = await patientsResponse.json();
          setPatients(patientsData.data);
        } else {
          console.error("Failed to fetch patients");
        }
  
        // Fetch pending approvals
        const pendingApprovalsResponse = await fetch(
          `${API_BASE_URL}/api/v1/doctors/${currentUser._id}/pending-approvals`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (pendingApprovalsResponse.ok) {
          const pendingApprovalsData = await pendingApprovalsResponse.json();
          setPendingApprovals(pendingApprovalsData.data);
        } else {
          console.error("Failed to fetch pending approvals");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDoctorData();
  }, [currentUser]); // Ensure this runs only when currentUser changes

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#374151]">
              Welcome, {currentUser?.name || "Doctor"}
            </h1>
            <p className="text-gray-600">
              Manage your appointments and patient records
            </p>
          </div>

          {/* Today's Schedule */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">
                Today's Schedule
              </h2>
              <Link
                to="/appointments"
                className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
              >
                View All Appointments
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-md shadow-sm border border-gray-200 animate-pulse"
                  >
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
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">
                  No appointments scheduled for today.
                </p>
              </div>
            )}
          </div>

          {/* Patient Records */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151] mb-2 md:mb-0">
                Patient Records
              </h2>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {patient.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#374151]">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {patient.age} / {patient.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {patient.condition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {patient.lastVisit}
                        </td>
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
                    <p className="text-gray-500">
                      No patients found matching your search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pending Doctor Approvals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">
                Pending Patient Appointments
              </h2>
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
                        Appointment ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Patient Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Appointment Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date & Time
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
                    {pendingApprovals.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {appointment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#374151]">
                          {appointment.patientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {appointment.appointmentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {new Date(appointment.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleApproval(appointment.id, true)
                              }
                              className="text-[#22C55E] hover:text-[#22C55E]/80 font-medium"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleApproval(appointment.id, false)
                              }
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
                <p className="text-gray-500">
                  No pending appointments at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
