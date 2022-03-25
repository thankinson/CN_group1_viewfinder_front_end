import { useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../components/footer";
import { updatePass, updateEmail } from "../utils";
import Navbar from "../components/navbar";

// export const UserSettings = ({ user, setUser }) => {
//     //Changes document title on load
//     useEffect(() => {
//         document.title = "Account / ViewFinder";
//     }, []);

//     //useEffect for getting user data here?
//     useEffect(() => {}, []);

    //Function to change email? Stretch goal
    // const emailChanger = (user, emailUpdate) => {};
    //Function to change password
const passwordChanger = (user, passUpdate) => {

    return (
        <>
            <Navbar />
            <div id="settings-greeting">
                <h2>Welcome, {user}</h2>
                <p>Would you like to change your password or email address?</p>
            </div>
            <form id="settings-change-password" onSubmit={(e) => {}}>
                <input type="password" placeholder="password" />
            </form>
            <Footer />
        </>
    );

};

// {
//     /* <form id="settings-change-email" onSubmit={(e) => {}}>
// <input type="email" placeholder={userEmail} />
// </form> */
// }
