import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  function parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  let isLoggedIn;
  let jwtToken = localStorage.getItem('token');

  if (jwtToken) {
    const decoded = parseJwt(jwtToken);
    const currentDate = Date.now(); // Get current time in milliseconds
    
    console.log({ decoded });

    // Check if the token is expired
    if ((decoded.exp * 1000) <= currentDate) {
      console.log('JWT expired');
      isLoggedIn = false;
      // localStorage.removeItem('token'); // Uncomment if you want to remove the token
    } else {
      isLoggedIn = true;
    }
  } else {
    isLoggedIn = false;
  }


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
