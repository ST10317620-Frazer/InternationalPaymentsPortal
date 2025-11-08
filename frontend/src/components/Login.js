import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ accountNumber: '', password: '' });
  const [isEmployee, setIsEmployee] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:5000/api/auth/login', {
        accountNumber: formData.accountNumber,
        password: formData.password,
        isEmployee: isEmployee
      });

      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'customer') {
        window.location.href = '/customer/form';
      } else if (role === 'employee') {
        window.location.href = '/employee/view';
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEmployee ? 'Employee' : 'Customer'} Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={isEmployee ? 'Username' : 'Account Number'}
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isEmployee}
            onChange={() => setIsEmployee(!isEmployee)}
            className="w-5 h-5"
          />
          <span className="text-gray-700">Login as Employee</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
