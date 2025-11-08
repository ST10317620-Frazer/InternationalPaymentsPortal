// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ accountNumber: '', password: '' });
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isEmployee
        ? 'https://localhost:5000/api/employee/login'
        : 'https://localhost:5000/api/customer/login';

      const res = await axios.post(endpoint, formData);
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // REDIRECT BASED ON ROLE
      if (role === 'customer') {
        navigate('/customer/form');
      } else if (role === 'employee') {
        navigate('/employee/view');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          International Payments Portal
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          {isEmployee ? 'Employee' : 'Customer'} Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder={isEmployee ? 'Username' : 'Account Number'}
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isEmployee}
              onChange={() => setIsEmployee(!isEmployee)}
              className="w-5 h-5 text-indigo-600"
            />
            <span className="text-gray-700">Login as Employee</span>
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;