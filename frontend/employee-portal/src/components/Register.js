import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:5000/api/customer/register', form, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Registered! Now login.');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="idNumber" placeholder="ID Number (13 digits)" onChange={handleChange} required />
      <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;