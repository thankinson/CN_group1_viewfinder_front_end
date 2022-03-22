// nav bar

import React, { useState } from "react";
import { NavLink } from "react-router-dom"

function Navbar() {
    const [click, setClick] = useState(false);
 
    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
              Put FLIXYGUY here
            </NavLink>
  
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/home"
                  activeClassName="active"
                  className="nav-links"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/watchlist"
                  activeClassName="active"
                  className="nav-links"
                >
                  watchlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/user"
                  activeClassName="active"
                  className="nav-links"
                >
                  Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  
  export default Navbar;
