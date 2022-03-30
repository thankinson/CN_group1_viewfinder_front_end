import { useEffect } from "react";
import {
    CollapsibleSearch,
    TemporaryContainer,
} from "../components/collapsibleMovie";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Navigate } from "react-router-dom";
import { tokenLogin } from "../utils/index";

export const Home = ({ user, setUser, watchList }) => {
    useEffect(() => {
        document.title = "ViewFinder | Home";
    }, []);

    // Navigates user to homepage if not logged in
    if (!user && !localStorage.key("myToken")) {<Navigate to="/" />}
    else if (!user && localStorage.key("myToken")) {tokenLogin({setUser})}

    return (
        <>
            <Navbar setUser={setUser}/>

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
