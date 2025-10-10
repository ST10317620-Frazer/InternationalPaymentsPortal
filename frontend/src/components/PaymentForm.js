import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [formData, setFormData] = useState({ amount: '', currency: 'ZAR', payeeAccount: '', swiftCode: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/payments/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Payment submitted');
      setFormData({ amount: '', currency: 'ZAR', payeeAccount: '', swiftCode: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          pattern="\d+(\.\d{1,2})?"
          required
        />
        <select
          value={formData.currency}
          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
        >
          <option value="ZAR">ZAR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <input
          type="text"
          placeholder="Payee Account"
          value={formData.payeeAccount}
          onChange={(e) => setFormData({ ...formData, payeeAccount: e.target.value })}
          pattern="\d{10,16}"
          required
        />
        <input
          type="text"
          placeholder="SWIFT Code"
          value={formData.swiftCode}
          onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
          pattern="[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?"
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
