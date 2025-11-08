import { useState } from 'react';
import axios from 'axios';

export default function PaymentForm() {
  const [form, setForm] = useState({
    amount: '', currency: 'ZAR', beneficiary: '', swiftCode: '', beneficiaryAccount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/payments/submit', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Payment submitted for approval!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>International Payment</h2>
      <input placeholder="Amount (e.g. 1500.00)" onChange={e => setForm({...form, amount: e.target.value})} required />
      <select onChange={e => setForm({...form, currency: e.target.value})}>
        <option>ZAR</option><option>USD</option><option>EUR</option><option>GBP</option>
      </select>
      <input placeholder="Beneficiary Name" onChange={e => setForm({...form, beneficiary: e.target.value})} required />
      <input placeholder="SWIFT Code (e.g. SBZAZAJJ)" onChange={e => setForm({...form, swiftCode: e.target.value})} required />
      <input placeholder="Beneficiary Account" onChange={e => setForm({...form, beneficiaryAccount: e.target.value})} required />
      <button type="submit">Pay Now</button>
    </form>
  );
}