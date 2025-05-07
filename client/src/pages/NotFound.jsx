import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import React from "react"
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-[#0EA5E9]">404</h1>
          <h2 className="text-3xl font-semibold text-[#374151] mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-2 mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-[#0EA5E9] text-white font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound
