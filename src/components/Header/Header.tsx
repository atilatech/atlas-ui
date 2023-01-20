import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const isLoggedIn = !!localStorage.getItem('token');
    
  return (
    <header className="mt-3 py-1">
      <div className="container">
        <p className="float-start mb-1">
          <Link to="/">
            Atlas
          </Link>
        </p>
        <p className="float-end mb-1">
            {isLoggedIn ? <Link to="/profile">
            Profile
          </Link> : <Link to="/register">
            Sign Up
          </Link>}
          
        </p>
      </div>
    </header>
  );
}

export default Header;
