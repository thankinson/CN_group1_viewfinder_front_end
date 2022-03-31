//  watch list
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import {
  CollapsibleWatchlist,
  TemporaryContainer,
} from "../components/collapsibleWatchlist";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { tokenLogin } from "../utils/index";

export const WatchList = ({ user, setUser }) => {
  //Changes document title on load
  useEffect(() => {
    document.title = "ViewFinder | Watchlist";
  }, []);

  // Navigates user to homepage if not logged in
  if (!user && !localStorage.key("myToken")) {
    <Navigate to="/" />;
  } else if (!user && localStorage.key("myToken")) {
    tokenLogin(setUser);
  }

  return (
    <div className="screen-wrapper">
      <div className="sub-wrapper">
        <Navbar setUser={setUser} />
        <TemporaryContainer>
          <CollapsibleWatchlist user={user} />
        </TemporaryContainer>
      </div>
      <Footer />
    </div>
  );
};
