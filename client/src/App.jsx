import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import React from "react"
// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import AppointmentDetails from "./pages/AppointmentDetails"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/appointment/:id" element={<AppointmentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
