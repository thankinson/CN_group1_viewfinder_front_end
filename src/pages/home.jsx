import { useEffect, useState } from "react";
import {
    CollapsibleSearch,
    TemporaryContainer,
} from "../components/collapsibleMovie";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const Home = ({ user, watchList, setWatchlist }) => {
    useEffect(() => {
        document.title = "Home / ViewFinder";
    }, []);

    return (
        <>
            <Navbar />
            <TemporaryContainer>
                <CollapsibleSearch user = {user} watchList = {watchList} setWatchlist = {setWatchlist} />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
//imported L3, uncom L12
