// customer-portal/src/App.js
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>International Payments Portal</h1>

      {!token ? (
        <>
          <Register />
          <hr style={{ margin: '30px 0' }} />
          <Login setToken={setToken} />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2>Logged In Successfully!</h2>
          <p><strong>JWT Token:</strong></p>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
            {token}
          </pre>
          <button 
            onClick={() => setToken('')} 
            style={{ 
              padding: '12px 24px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              marginTop: '20px'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;