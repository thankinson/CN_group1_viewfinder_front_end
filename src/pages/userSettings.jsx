import { useEffect, useState } from "react";
import { updatePass, deleteUser } from "../utils";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Navigate } from "react-router-dom";
import { tokenLogin } from "../utils/index";
import "../styles/settings.css";

export const UserSettings = ({ user, setUser }) => {
  const [passUpdate, setPassUpdate] = useState();

  //Changes document title on load
  useEffect(() => {
    document.title = "ViewFinder | Account";
  }, []);

  //useEffect for getting user data here? Stretch goal
  // useEffect(() => {}, []);

  //Function to change email? Stretch goal
  // const emailChanger = (user, emailUpdate) => {};

  //Function to change password
  const submitHandler = (e) => {
    e.preventDefault();
    updatePass(user, passUpdate);
  };

  // Navigates user to homepage if not logged in
  if (!user && !localStorage.key("myToken")) {
    <Navigate to="/" />;
  } else if (!user && localStorage.key("myToken")) {
    tokenLogin(setUser);
  }

  return (
    <>
      <Navbar setUser={setUser} />
      <div className="screen-wrapper">
      {(!user && !localStorage.key('myToken')) && <Navigate to="/"/>}
      {(!user && localStorage.key('myToken')) && async function(setUser){ await tokenLogin(setUser) } }
        <div className="settings-container">
          <div id="settings-greeting">
            <h2>Welcome {user}!</h2>
            <p>Would you like to change your password?</p>
          </div>
          <form id="settings-change-password" onSubmit={submitHandler}>
            <input
              className="change-password-input"
              type="password"
              placeholder="password"
              onChange={(e) => setPassUpdate(e.target.value)}
            />
            <button id="change-button" type="submit">Change Password</button>
          </form>
          <div id="settings-delete-user">
            <h2>Delete My Account</h2>
            <p>
              Are you <em>sure</em> you want to delete your account?
            </p>
            <button id="delete" onClick={() => deleteUser(user)}>
              Yes, I'm sure
            </button>
            <p>
              <em>This action is permanent!</em>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
