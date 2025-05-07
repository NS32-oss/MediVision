"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentCard from "../components/AppointmentCard";
import { useAuth } from "../context/AuthContext";

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setIsLoading(true);

        // Fetch appointments
        const appointmentsResponse = await fetch(
          `http://localhost:8000/api/v1/patients/${currentUser._id}/appointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (appointmentsResponse.ok) {
          const appointmentsData = await appointmentsResponse.json();
          console.log("API Response Data:", appointmentsData.data); // Log the API response
          setAppointments(appointmentsData.data);
        } else {
          console.error("Failed to fetch appointments");
        }

        // Fetch medical records
        const recordsResponse = await fetch(
          `http://localhost:8000/api/v1/patients/${currentUser._id}/records`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (recordsResponse.ok) {
          const recordsData = await recordsResponse.json();
          setMedicalRecords(recordsData.data);
        } else {
          console.error("Failed to fetch medical records");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchPatientData();
    }
  }, [currentUser]);

  // Log the updated appointments state
  useEffect(() => {
    console.log("Updated Appointments State:", appointments);
  }, [appointments]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#374151]">
              Welcome, {currentUser?.name || "Patient"}
            </h1>
            <p className="text-gray-600">
              Manage your appointments and medical records
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/appointment/new"
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-[#0EA5E9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#374151]">
                    Book Appointment
                  </h3>
                  <p className="text-sm text-gray-500">
                    Schedule a new appointment
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/medical-records"
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-[#22C55E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#374151]">
                    Medical Records
                  </h3>
                  <p className="text-sm text-gray-500">
                    View your complete records
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/messages"
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#374151]">
                    Messages
                  </h3>
                  <p className="text-sm text-gray-500">
                    Contact your healthcare team
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">
                Upcoming Appointments
              </h2>
              <Link
                to="/appointments"
                className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
              >
                View All
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
            ) : appointments.filter((apt) => apt.status === "Scheduled")
                .length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments
                  .filter((apt) => apt.status === "Scheduled")
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">No upcoming appointments.</p>
                <Link
                  to="/appointment/new"
                  className="mt-2 inline-block text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                >
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Recent Medical Records */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">
                Recent Medical Records
              </h2>
              <Link
                to="/medical-records"
                className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
              >
                View All
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
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Doctor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Summary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicalRecords.map((record) => (
                      <tr key={record._id}>
                  
                        {/* Use _id or another unique field */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {record.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {record.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {record.doctor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                          {record.summary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            to={`/medical-record/${record._id}`}
                            className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
