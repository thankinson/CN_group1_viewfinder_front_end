import { useEffect, useState } from "react";
import {
    CollapsibleSearch,
    CollapsibleWatchlist,
    TemporaryContainer,
} from "../components/collapsibleMovie";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Navigate } from "react-router-dom";
import { createUser, login, tokenLogin } from "../utils/index";

export const Home = ({ user, setUser, watchList, setWatchList }) => {
    useEffect(() => {
        document.title = "ViewFinder | Home";
    }, []);

    return (
        <>
            // Navigates user to homepage if not logged in
            {!user && <Navigate to="/" />}
            <Navbar />
            {/* <form>
                <input type="search" placeholder="search for a film..." />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form> */}
            <div className="search-results-container">
                {/* map thru search results, make collapsable comp for each */}
            </div>
            <TemporaryContainer>
                <CollapsibleSearch
                    user={user}
                    setUser={setUser}
                    watchList={watchList}
                    setWatchList={watchList}
                />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
//imported L3, uncom L12
