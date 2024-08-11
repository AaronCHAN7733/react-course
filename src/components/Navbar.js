import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../Styles/Navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna el estado del menú
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className="navbar-center">
        <h2>App de Practica</h2>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
          View Users
        </Link>
      </div>
      <div className="navbar-right">
        <span className="username">{username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
