import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ✨ Aurum & Co.
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/?category=watches" className="nav-link">Watches</Link>
          </li>
          <li className="nav-item">
            <Link to="/?category=jewelry" className="nav-link">Jewelry</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-register">Register</Link>
              </li>
            </>
          )}
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;