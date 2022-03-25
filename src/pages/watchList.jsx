//  watch list
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import {
    CollapsibleWatchlist,
    TemporaryContainer,
} from "../components/collapsibleWatchlist";

// useEffect(() => {
//     document.title = "This is a title"
//   }, [])

export const WatchList = ({ user, watchList, setWatchlist }) => {
    return (
        <>
            <Navbar />
            <TemporaryContainer>
                <CollapsibleWatchlist user = {user} watchList = {watchList} setWatchlist = {setWatchlist} />
            </TemporaryContainer>
            <Footer />
        </>
    );
};
