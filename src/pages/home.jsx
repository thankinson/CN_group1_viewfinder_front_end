import { useEffect, useState } from "react";
import {
    CollapsibleSearch,
    CollapsibleWatchlist,
    TemporaryContainer,
} from "../components/collapsibleMovie";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const Home = (props) => {
    useEffect(() => {
        document.title = "Home / ViewFinder";
    }, []);

    return (
        <>
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
                <CollapsibleSearch user={props.user} />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
//imported L3, uncom L12
