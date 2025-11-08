import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', background: '#003087', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
      {!token && <Link to="/register" style={{ color: 'white', marginRight: '1rem' }}>Register</Link>}
      {token && <Link to="/pay" style={{ color: 'white', marginRight: '1rem' }}>Pay</Link>}
      {token && <button onClick={logout} style={{ float: 'right' }}>Logout</button>}
    </nav>
  );
}