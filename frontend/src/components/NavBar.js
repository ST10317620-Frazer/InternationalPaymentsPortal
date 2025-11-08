import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-semibold">OrbitalPay</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          <Link to="/payments" className="text-white hover:text-gray-200">Payments</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
