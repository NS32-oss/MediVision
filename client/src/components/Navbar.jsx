"use client"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#0EA5E9]">MediVision</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link
                  to={
                    currentUser.role === "patient"
                      ? "/patient-dashboard"
                      : currentUser.role === "doctor"
                        ? "/doctor-dashboard"
                        : "/admin-dashboard"
                  }
                  className="px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#374151] hover:text-[#0EA5E9] hover:bg-[#F8FAFC] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* X icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {currentUser ? (
            <>
              <Link
                to={
                  currentUser.role === "patient"
                    ? "/patient-dashboard"
                    : currentUser.role === "doctor"
                      ? "/doctor-dashboard"
                      : "/admin-dashboard"
                }
                className="block px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
