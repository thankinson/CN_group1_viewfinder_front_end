// nav bar

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../utils/index";
import "../styles/navbar.css";
import Flixy from "../Flixy.svg";

export const Navbar = ({ setUser }) => {
    const [showBurger, setShowBurger] = React.useState(false)

    const links = [{
        to: "/home",
        label: "HOME"
    },
    {
        to: "/watchlist",
        label: "WATCHLIST"
    },
    {
        to: "/user",
        label: "SETTINGS"
    },
    {
        to: "/",
        label: "LOGOUT",
        onClick: ()=> logout(setUser)
    }];

    const Links = () => (
        <>
            {links.map(link => (
                <li className="nav-item">
                    <NavLink
                        to={link.to}
                        activeClassName="active"
                        className="nav-links"
                        onClick={link.onClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </>
    )

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
                    <div id="hamburger-wrapper">
                        <div class="burger" onClick={() => setShowBurger(shown => !shown)} >
                            <div className="line" />
                            <div className="line" />
                            <div className="line" />
                            <div id="buffer"></div>
                        </div>
                        {showBurger &&
                            <div className="burger-item-wrapper">
                                <Links />
                            </div>
                        }
                    </div>

                    <script type="text/javascript" src="hamburger.js"></script>

                    {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
                    <ul className="nav-list">
                        <Links />
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
