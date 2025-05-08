"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const AppointmentDetails = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({}); // Object to store time slots for each doctor
  const [selectedDates, setSelectedDates] = useState({}); // Object to store selected dates for each doctor

  // Predefined time slots
  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
  ];

  useEffect(() => {
    // Fetch all doctors
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.data);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleTimeSlotChange = (doctorId, timeSlot) => {
    setSelectedTimeSlots((prev) => ({
      ...prev,
      [doctorId]: timeSlot, // Update the time slot for the specific doctor
    }));
  };

  const handleDateChange = (doctorId, date) => {
    setSelectedDates((prev) => ({
      ...prev,
      [doctorId]: date, // Update the date for the specific doctor
    }));
  };

  const handleBookAppointment = async (doctorId) => {
    const selectedTimeSlot = selectedTimeSlots[doctorId]; // Get the selected time slot for this doctor
    const selectedDate = selectedDates[doctorId]; // Get the selected date for this doctor

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/patients/${currentUser._id}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId,
            appointmentType: "General Checkup", // Example type
            dateTime: `${selectedDate} ${selectedTimeSlot}`, // Combine date and time slot
          }),
        }
      );

      if (response.ok) {
        alert("Appointment request sent successfully!");
        setSelectedTimeSlots((prev) => ({
          ...prev,
          [doctorId]: "", // Reset the time slot for this doctor
        }));
        setSelectedDates((prev) => ({
          ...prev,
          [doctorId]: "", // Reset the date for this doctor
        }));
      } else {
        alert("Failed to send appointment request.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#374151] mb-6">
            Book an Appointment
          </h1>

          {isLoading ? (
            <div className="text-center">Loading doctors...</div>
          ) : (
            <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                        {doctor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                        {doctor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                        {doctor.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">
                        {doctor.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="date"
                          value={selectedDates[doctor._id] || ""}
                          onChange={(e) =>
                            handleDateChange(doctor._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={selectedTimeSlots[doctor._id] || ""}
                          onChange={(e) =>
                            handleTimeSlotChange(doctor._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleBookAppointment(doctor._id)}
                          className="px-3 py-1 bg-[#0EA5E9] text-white text-sm font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors"
                        >
                          Book Appointment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppointmentDetails;