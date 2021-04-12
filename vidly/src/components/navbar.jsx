import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() { 
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Vidly</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/movies" className="nav-link" href="#">Movies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/customers" className="nav-link" href="#">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/rentals" className="nav-link" href="#">Rentals</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
 
export default NavBar;