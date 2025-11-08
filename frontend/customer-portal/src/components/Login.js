import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [creds, setCreds] = useState({ accountNumber: '', password: '' });

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:5000/api/customer/login', creds);
      setToken(res.data.token);
      alert('Logged in!');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ display: 'block', margin: '8px 0', padding: '8px' }} />
      <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none' }}>Login</button>
    </form>
  );
};

export default Login;