import React from 'react';
import { Link } from 'react-router-dom';
import { PiCarProfileLight } from 'react-icons/pi'; // Ensure you have this icon installed

const Home = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="text-center p-10 md:p-20 space-y-6">
        <div className="flex justify-center items-center gap-3 text-white text-4xl md:text-5xl font-bold">
          <PiCarProfileLight className="text-5xl md:text-6xl" />
          <h1 className="text-4xl md:text-5xl">Welcome to Car Management App</h1>
        </div>
        <p className="text-lg md:text-xl text-white mb-6">Effortlessly manage your cars, schedule maintenance, and track your vehicle’s performance!</p>
        
        <div className="flex gap-5 justify-center">
          <Link
            to="/login"
            className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-200 transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-200 transform hover:scale-105"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <h2 className="text-2xl text-center text-white font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Your Cars</h3>
            <p className="text-gray-600 mb-4">Keep track of all your vehicles in one place. Add, update, or remove cars easily.</p>
            <Link
              to="/dashboard"
              className="text-red-500 font-semibold hover:text-red-700 transition duration-200"
            >
              Explore Now
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Tracking</h3>
            <p className="text-gray-600 mb-4">Schedule regular maintenance and keep a record of service history for all your vehicles.</p>
            <Link
              to="/dashboard"
              className="text-red-500 font-semibold hover:text-red-700 transition duration-200"
            >
              Explore Now
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Reports</h3>
            <p className="text-gray-600 mb-4">Track the performance of your vehicles with detailed reports on fuel efficiency, speed, and more.</p>
            <Link
              to="/dashboard"
              className="text-red-500 font-semibold hover:text-red-700 transition duration-200"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-black bg-opacity-20 py-6 mt-12">
        <div className="text-center text-white">
          <p className="text-sm">&copy; 2024 Car Management App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
