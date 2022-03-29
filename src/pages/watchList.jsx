//  watch list
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import {
    CollapsibleWatchlist,
    TemporaryContainer,
} from "../components/collapsibleWatchlist";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export const WatchList = ({ user }) => {

    //Changes document title on load
    useEffect(() => {
        document.title = "ViewFinder | Watchlist";
    }, []);
    
    return (
        <>
            {/* // Navigates user to homepage if not logged in */}
            {!user && <Navigate to="/" />}
            <Navbar />
            <TemporaryContainer>
                <CollapsibleWatchlist user={user} />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
