import { useEffect, useState } from "react";
import styled from "styled-components";
import { updatePass, deleteUser } from "../utils";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const UserSettings = ({ user, setUser }) => {
    const [passUpdate, setPassUpdate] = useState();

    //Changes document title on load
    useEffect(() => {
        document.title = "Account / ViewFinder";
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

    return (
        <>
            <Navbar />
            <div id="settings-greeting">
                <h2>Welcome, {user}</h2>
                <p>Would you like to change your password?</p>
            </div>
            <form id="settings-change-password" onSubmit={submitHandler}>
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassUpdate(e.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>
            <div id="settings-delete-user">
                <h2>Delete My Account</h2>
                <p>
                    Are you <em>sure</em> you want to delete your account?
                </p>
                <button onClick={() => deleteUser(user)}>Yes, I'm sure</button>
                <p>
                    <em>This action is permanent!</em>
                </p>
            </div>
            <Footer />
        </>
    );
};

{
    /* <form id="settings-change-email" onSubmit={(e) => {}}>
<input type="email" placeholder={userEmail} />
</form> */
}
