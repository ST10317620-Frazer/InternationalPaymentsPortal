// frontend/src/components/EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://localhost:5000/api/employee/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setForms(res.data));
  }, [token]);

  const verify = async (id) => {
    await axios.post(`https://localhost:5000/api/employee/verify/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForms(prev => prev.map(f => f.id === id ? { ...f, status: 'verified' } : f));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Pending Payment Requests</h2>
      {forms.length === 0 ? <p className="text-gray-600">No pending forms.</p> : (
        <div className="space-y-6">
          {forms.map(f => (
            <div key={f.id} className="bg-white p-6 rounded-xl shadow-md border">
              <p><strong>Amount:</strong> {f.amount} {f.currency}</p>
              <p><strong>Payee:</strong> {f.payee_account}</p>
              <p><strong>SWIFT:</strong> {f.swift_code}</p>
              <p><strong>Purpose:</strong> {f.purpose}</p>
              <p><strong>Status:</strong> <span className={f.status === 'pending' ? 'text-orange-600' : 'text-green-600'}>{f.status}</span></p>
              {f.status === 'pending' && (
                <button onClick={() => verify(f.id)} className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;