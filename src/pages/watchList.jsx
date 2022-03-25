//  watch list
import { useEffect } from "react";
import { createUser, login, tokenLogin } from "../utils/index";

import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import {
    CollapsibleWatchlist,
    TemporaryContainer,
} from "../components/collapsibleWatchlist";

// useEffect(() => {
//     document.title = "This is a title"
//   }, [])


export const WatchList = ({ user, setUser, watchList, setWatchList }) => {

    return (
        <>
            <Navbar />
            <TemporaryContainer>
                <CollapsibleWatchlist user={user} setUser={setUser} watchList={watchList} setWatchList={watchList} />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
