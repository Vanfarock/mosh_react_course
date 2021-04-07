import React from 'react';

function NavBar({ totalCounters }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#anchor" id="anchor">
          Navbar{" "}
          <span className="badge badge-pill badge-secondary">{totalCounters}</span>
        </a>
      </div>
    </nav>
  );
}
 
export default NavBar;