import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Vidly</Link>
        <div className="navbar-collapse">
          <div className="navbar-nav">
            <NavLink to="/movies" className="nav-link">Movies</NavLink>
            <NavLink to="/customers" className="nav-link">Customers</NavLink>
            <NavLink to="/rentals" className="nav-link">Rentals</NavLink>

          {!user && (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/profile" className="nav-link">{user.name}</NavLink>
              <NavLink to="/logout" className="nav-link">Logout</NavLink>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;