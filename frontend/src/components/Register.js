import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', idNumber: '', accountNumber: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      alert('Registered successfully');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          pattern="[a-zA-Z\s]+"
          required
        />
        <input
          type="text"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          pattern="\d{9,13}"
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          pattern="\d{10,16}"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
