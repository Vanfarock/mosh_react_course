import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() { 
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Vidly</Link>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/movies" className="nav-link">Movies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/customers" className="nav-link">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/rentals" className="nav-link">Rentals</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
 
export default NavBar;