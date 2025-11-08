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
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Register</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <input name="idNumber" placeholder="ID Number (13 digits)" onChange={handleChange} required pattern="\d{13}" style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required minLength="8" style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none' }}>Register</button>
    </form>
  );
};

export default Register;