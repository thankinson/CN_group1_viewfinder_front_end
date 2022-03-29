import React from "react";
import { useState, useEffect } from "react";
import { createUser, login, tokenLogin } from "../utils/index";
import { Navigate } from "react-router-dom";
import { Footer } from "../components/footer";
import "../styles/login.css";

// This Login needs to be passed a setUser from root app.jsx
// App.jsx should check current user state and either root to here
// or homepage

export const Login = ({ user, setUser }) => {
    // Set username, email, password hooks
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    // This switches between log in or sign up render
    const [bool, setBool] = useState(false);

    useEffect(() => {
        document.title = "ViewFinder | Login";
    }, []);

    // Try a token login
    useEffect(() => {
        if (localStorage.key("myToken")) {
            tokenLogin(setUser);
        }
    }, []);

    // Runs on form submit
    const submitHandler = (event) => {
        // Prevent a refresh on form submit
        event.preventDefault();
        // Log in user
        if (bool) {
            login(username, pass, setUser);
        }
        // Create account for new user
        else {
            // !! This needs a decent email checker. Maybe regex.
            if (email && email.includes("@")) {
                createUser(username, email, pass, setUser);
            }
        }
    };

    return (
        <>
            {/* // Navigates user to homepage if not logged in */}
            {user && <Navigate to="/home" />}
            <div className="login-section">
                <div className="login-container">
                    {user && <Navigate to="/home" />}
                    {bool ? (
                        <h3 className="login-signup-title">log in</h3>
                    ) : (
                        <h3 className="login-signup-title">sign up</h3>
                    )}
                    <h1 className="admit-one">ADMIT ONE</h1>
                    <form className="login-form" onSubmit={submitHandler}>
                        <input
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="username"
                            required={true}
                        />
                        <br></br>
                        {!bool && (
                            <input
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="email"
                                type="email"
                                required={true}
                            />
                        )}
                        {!bool && <br></br>}
                        <input
                            onChange={(event) => setPass(event.target.value)}
                            placeholder="password"
                            type="password"
                            required={true}
                        />{" "}
                        <br></br>
                        <button className="submit-button" type="submit">
                            submit
                        </button>
                    </form>

                    {bool ? (
                        <p className="login-signup">
                            Click{" "}
                            <a
                                className="login-bool"
                                onClick={() => setBool(!bool)}
                            >
                                here
                            </a>{" "}
                            to sign up!
                        </p>
                    ) : (
                        <p className="login-signup">
                            Already have an account? Click{" "}
                            <a
                                className="login-bool"
                                onClick={() => setBool(!bool)}
                            >
                                here
                            </a>{" "}
                            to log in!
                        </p>
                    )}
                </div>
            </div>
            <div id="transition">
                <svg
                    id="scrolldown-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-double-down"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                </svg>
            </div>
            <div className="blurb-section">
                <div className="blurb-container">
                    <h3>What is ViewFinder?</h3>
                    <p>
                        ViewFinder is an easy-to-use service that will find what
                        streaming services, <i>and where</i> to stream your
                        favourite films.
                    </p>
                    <p>
                        Do you use Netflix, Amazon Prime, or Disney Plus? Do you
                        use a VPN to broaden your viewing options? ViewFinder
                        will quickly tell you where in the world you need to be
                        (wink wink) to watch your favourite films right now!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};
