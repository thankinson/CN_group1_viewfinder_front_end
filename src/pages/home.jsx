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
  // if (!user && !localStorage.key("myToken")) {
  //   <Navigate to="/" />;
  // } else if (!user && localStorage.key("myToken")) {
  //   tokenLogin(setUser);
  // }

  return (
    <div className="screen-wrapper">
      {(!user && !localStorage.key('myToken')) && <Navigate to="/"/>}
      {(!user && localStorage.key('myToken')) && async function(setUser){ await tokenLogin(setUser) } }
      <Navbar setUser={setUser} />
      <div className="sub-wrapper">
        <h2 className="page-header">International Movie Finder</h2>
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
      </div>
      <Footer />
    </div>
  );
};
