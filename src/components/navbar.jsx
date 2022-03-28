// nav bar

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../utils/index";
import "../styles/navbar.css";
import Flixy from "../Flixy.svg";

export const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link exact to="/" className="nav-logo">
                        <img
                            src={Flixy}
                            className="App-logo"
                            alt="Flixy the friendly filmstrip"
                        />
                    </Link>

                    {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                to="/home"
                                activeClassName="active"
                                className="nav-links"
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/watchlist"
                                activeClassName="active"
                                className="nav-links"
                            >
                                WATCHLIST
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/user"
                                activeClassName="active"
                                className="nav-links"
                            >
                                SETTINGS
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={logout}
                            >
                                LOG OUT
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
