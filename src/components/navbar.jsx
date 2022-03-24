// nav bar

import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import styled from 'styled-components';
import '../styles/navbar.css'
import { logout } from '../utils/index'

function Navbar() {
    const [click, setClick] = useState(false);
 
    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
              Put FLIXYGUY here
            </NavLink>
  
            {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
            <ul className='nav-list'>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/home"
                  activeClassName="active"
                  className="nav-links"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/watchlist"
                  activeClassName="active"
                  className="nav-links"
                >
                  WATCHLIST
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/user"
                  activeClassName="active"
                  className="nav-links"
                >
                  SETTINGS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  // onClick={logout}
                >
                  LOG OUT
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  
export default Navbar;
