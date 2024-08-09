import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Apps</h2>
        <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
        <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>View Users</Link>
      </div>
      <div className="navbar-right">
        <span className="username">{username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
