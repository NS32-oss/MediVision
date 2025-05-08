import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#374151] leading-tight">
                  Your Health, Our Priority
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  MediVision provides comprehensive healthcare solutions for
                  patients and medical professionals. Book appointments, manage
                  medical records, and connect with healthcare providers all in
                  one place.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-[#0EA5E9] text-white font-medium rounded-md hover:bg-[#0EA5E9]/90 transition-colors"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#features"
                    className="px-6 py-3 bg-white text-[#0EA5E9] font-medium rounded-md border border-[#0EA5E9] hover:bg-[#F8FAFC] transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="flex justify-center w-170">
                <img
                  src="/image.png"
                  alt="Healthcare professionals"
                  className="max-w-full h-auto rounded-lg shadow-md w-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#374151]">
                Our Features
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                MediVision offers a range of features designed to streamline
                healthcare management for patients, doctors, and administrators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Patient Portal */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-2">
                  Patient Portal
                </h3>
                <p className="text-gray-600 mb-4">
                  Access your medical records, book appointments, and
                  communicate with your healthcare providers.
                </p>
                <Link
                  to="/login"
                  className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium transition-colors"
                >
                  Login as Patient →
                </Link>
              </div>

              {/* Doctor Dashboard */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-2">
                  Doctor Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage your schedule, access patient records, and update
                  treatment plans efficiently.
                </p>
                <Link
                  to="/login"
                  className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium transition-colors"
                >
                  Login as Doctor →
                </Link>
              </div>

              {/* Admin Tools */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-2">
                  Admin Tools
                </h3>
                <p className="text-gray-600 mb-4">
                  Oversee facility operations, manage staff, and ensure smooth
                  healthcare delivery.
                </p>
                <Link
                  to="/login"
                  className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium transition-colors"
                >
                  Login as Admin →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0EA5E9] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
                Join MediVision today and experience healthcare management like
                never before.
              </p>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white text-[#0EA5E9] font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
