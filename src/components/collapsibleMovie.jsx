// Collapsible Bar
import { useState, useEffect } from "react";
import styled from "styled-components";
import Star from "../assets/star.svg";
import StarFill from "../assets/star-fill.svg";
import TriangleFill from "../assets/black-triangle.svg";
import { addFilm, removeFilm, listUserFilms } from "../utils";
import "../styles/collapsibleMovie.css";
import "../styles/global.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        /* Font Families - use font-family: var(--marquee-font) etc*/
        --marquee-font: "Bebas Neue", impact, sans-serif;
        --main-font: "Lexend", arial, sans-serif;
        --accent-font: "Lexend Deca", arial, sans-serif;
      
        /* Colours - use color: var(--background-color) etc */
        --color-background-main: #23233d;
        --color-light: #fffad0;
    }
`;

const { REACT_APP_API_KEY } = process.env;

const StarRating = ({ stars }) => {
  let fiveStars = [0, 0, 0, 0, 0];
  fiveStars = fiveStars.slice(0, Math.round(stars));
  return (
    <StarDiv>
      {fiveStars &&
        fiveStars.map((item, index) => (
          <SmallLogo src={StarFill} key={`Star${index}`} />
        ))}
    </StarDiv>
  );
};

export const CollapsibleSearch = ({ user }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(async () => {
    await listUserFilms(setWatchlist);
  }, []);

  function openTab(e, serviceName) {
    // declare vars
    let i;
    let tabContent;
    let tabLinks;

    // Get all elements with className="tab-content" and hide em
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }

    // Get all elements with className="tab-links" and remove class "active"
    tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show current tab, and add an "active" class to the button that opened the tab
    document.getElementById(serviceName).style.display = "block";
    e.currentTarget.className += " active";
  }

  const [movieSearch, setMovieSearch] = useState();
  const [movieResults, setMovieResults] = useState([]);

  const movieWatchlistAdd = async (movie) => {
    console.log("movieWatchlistAdd", user, movie);
    // setWatchlist(watchlist.filter((item) => item.id !== movie));
    let newWatchlist = [...watchlist, movie];
    console.log(newWatchlist);
    setWatchlist(newWatchlist);
    // setWatchlist(watchlist.push(movie));
    await addFilm(user, movie.id);
  };

  const movieWatchlistRemove = async (movie) => {
    console.log("movieWatchlistRemove", user, movie);
    setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    // setWatchlist([...watchlist, movie]);
    await removeFilm(user, movie.id);
  };

  const SearchMovie = async (e, searchString) => {
    e.preventDefault();
    try {
      // Fetch 'n' number of films
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&query=${searchString}`
      );
      const movieJSON = await response.json();

      // Here, we want to add an array for each service to every returned movie object
      for (let i = 0; i < movieJSON.results.length; i++) {
        movieJSON.results[i].netflix = [];
        movieJSON.results[i].amazonPrime = [];
        movieJSON.results[i].disneyPlus = [];
      }

      // number of films returned
      const numOfReturnedFilms = movieJSON.results.length;
      // all the objects returned from the region query go here
      const regionObjects = [];

      // Here, we want to query for streaming regions using each ID
      // Loop thru returned films
      for (let i = 0; i < numOfReturnedFilms; i++) {
        // Fetch region data using id number 'i' from returned films
        const regionResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieJSON.results[i].id}/watch/providers?api_key=${REACT_APP_API_KEY}`
        );
        // JSONify the data
        const regionJSON = await regionResponse.json();
        // Push to array of region objects
        regionObjects.push(regionJSON);
      }

      // The 'flatrate' key we are interested in is tucked quite far into each region object
      // Loop thru all of the region objects returned
      for (let i = 0; i < regionObjects.length; i++) {
        // for each key-val pair in the array of region objects
        for (const [country, val] of Object.entries(regionObjects[i].results)) {
          // if the object has a flatrate array
          if (val.flatrate) {
            // check each element of flatrate array
            for (let item of val.flatrate) {
              // now we can return the service name

              if (item.provider_name == "Netflix") {
                // console.log('netflix ' + country)
                movieJSON.results[i].netflix.push(country);
              } else if (item.provider_name == "Amazon Prime Video") {
                // console.log('prime ' + country)
                movieJSON.results[i].amazonPrime.push(country);
              } else if (item.provider_name == "Disney Plus") {
                // console.log('disney+ ' + country)
                movieJSON.results[i].disneyPlus.push(country);
              } else {
                console.log("nope");
              }
            }
          }
        }
      }

      // Finally, we can set the movieResults hook to our new array of modified objects
      // This will now be passed into the collapsibleMovie renderer below
      setMovieResults(movieJSON.results);

      // I added the section for available streaming services in the HTML inside
      // the MovieItem component
    } catch (error) {
      console.log(error);
    }
  };

  const MovieItem = ({ movie }) => {
    const [expanded, setExpanded] = useState(false);

    const LogoEffect = ({ logo1, logo2 }) => {
      if (
        watchlist.map((a) => a.id).find((element) => element == movie.id) ==
        undefined
      ) {
        return <Logo src={logo1} />;
      } else {
        return <Logo src={logo2} />;
      }
    };

    // console.log("MovieItem:",movie.id, movie.title);
    if (expanded) {
      return (
        <MovieItemDiv>
          <MovieItemTopDiv>
            <MovieItemElementDiv onClick={() => setExpanded(!expanded)}>
              <SmallLogo src={TriangleFill} />
            </MovieItemElementDiv>
            <MovieItemTitle>
              {movie.title} (
              {movie.release_date && movie.release_date.substring(0, 4)})
            </MovieItemTitle>
            <MovieItemElementDiv
              onClick={() => {
                console.log(
                  watchlist
                    .map((a) => a.id)
                    .find((element) => element == movie.id)
                );
                if (
                  watchlist
                    .map((a) => a.id)
                    .find((element) => element == movie.id) == undefined
                ) {
                  console.log("Not found on watchlist. Adding.");
                  movieWatchlistAdd(movie);
                } else {
                  console.log("Found on watchlist. Removing.");
                  movieWatchlistRemove(movie);
                }
              }}
            >
              <LogoEffect logo1={Star} logo2={StarFill} />
            </MovieItemElementDiv>
          </MovieItemTopDiv>

          <div className="movie-item-details">
            <div className="movie-info">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.original_title} Poster`}
              />
              <MovieItemPlotDiv>
                <StarRating stars={movie.vote_average / 2} />
                <p className="plot">{movie.vote_average}</p>
                {/* <br></br> */}
                <p className="plot">{movie.overview}</p>
              </MovieItemPlotDiv>
            </div>

            <div className="streaming-div">
              <div className="service-tab-picker">
                <div className="tab">
                  <button
                    className="tab-links"
                    onClick={(event) => openTab(event, "Netflix")}
                  >
                    Netflix
                  </button>
                  <button
                    className="tab-links"
                    onClick={(event) => openTab(event, "Prime")}
                  >
                    Prime
                  </button>
                  <button
                    className="tab-links"
                    onClick={(event) => openTab(event, "Disney+")}
                  >
                    Disney+
                  </button>
                </div>

                <div id="Netflix" class="tab-content">
                  <h3>Netflix</h3>
                  <div className="region-container">
                    {movie.netflix.map((region) => (
                      <div>
                        <img
                          className="region-flag"
                          alt={region}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${region}.svg`}
                        />{" "}
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
                <div id="Prime" class="tab-content">
                  <h3>Prime</h3>
                  <div className="region-container">
                    {movie.amazonPrime.map((region) => (
                      <div>
                        <img
                          className="region-flag"
                          alt={region}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${region}.svg`}
                        />{" "}
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
                <div id="Disney+" class="tab-content">
                  <h3>Disney+</h3>
                  <div className="region-container">
                    {movie.disneyPlus.map((region) => (
                      <div>
                        <img
                          className="region-flag"
                          alt={region}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${region}.svg`}
                        />{" "}
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MovieItemDiv>
      );
    } else {
      return (
        <MovieItemDiv>
          <MovieItemTopDiv>
            <MovieItemElementDiv onClick={() => setExpanded(!expanded)}>
              <SmallLogo src={TriangleFill} />
            </MovieItemElementDiv>
            <MovieItemTitle>
              {movie.title} (
              {movie.release_date && movie.release_date.substring(0, 4)})
            </MovieItemTitle>
            <MovieItemElementDiv
              onClick={() => {
                console.log(
                  watchlist
                    .map((a) => a.id)
                    .find((element) => element == movie.id)
                );
                if (
                  watchlist
                    .map((a) => a.id)
                    .find((element) => element == movie.id) == undefined
                ) {
                  console.log("Not found on watchlist. Adding.");
                  movieWatchlistAdd(movie);
                } else {
                  console.log("Found on watchlist. Removing.");
                  movieWatchlistRemove(movie);
                }
              }}
            >
              <LogoEffect logo1={Star} logo2={StarFill} />
            </MovieItemElementDiv>
          </MovieItemTopDiv>
        </MovieItemDiv>
      );
    }
  };

  return (
    <MainMovieDiv>
      <MovieSearchForm onSubmit={(e) => SearchMovie(e, movieSearch)}>
        <MovieSearchInput
          placeholder="Search for a movie!"
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        <button className="search-button" onClick={() => SearchMovie(movieSearch)}>
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </button>
      </MovieSearchForm>
      {movieResults &&
        movieResults.map((item, index) => {
          return <MovieItem key={`Star${index}`} movie={item} />;
        })}
      {movieResults.length === 0 && (
        <p className="placeholder-text">
          Search for a movie above to see the results!
        </p>
      )}
    </MainMovieDiv>
  );
};

//
// :root {
//     /* Font Families - use font-family: var(--marquee-font) etc*/
//     --marquee-font: "Bebas Neue", impact, sans-serif;
//     --main-font: "Lexend", arial, sans-serif;
//     --accent-font: "Lexend Deca", arial, sans-serif;

//     /* Colours - use color: var(--background-color) etc */
//     --color-background-main: #23233d;
//     --color-light: #fffad0;
//   }

export const TemporaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // border: var(--color-light) 4px dashed;
  // background-color: var(--color-background-main);
  padding: 2px;
`;
const MainMovieDiv = styled.div`
  // width: 85%;
  display: flex;
  flex-direction: column;
  // border: red 4px dashed;
  align-items: center;
`;

const MovieItemTopDiv = styled.div`
  display: flex;
  flex: 1;
  // border: pink 4px solid;
  border-radius:25px;
  margin: 8px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3em;
  // background: cyan;
  // background-color: var(--color-light);
  background-color: #dbdbdb;
  // width: 80%;
`;

const MovieItemDiv = styled.div`
  display: flex;
  // border: blue 4px solid;
  margin: 0px;
  min-width: 70vw;
  max-width: 70vw;
  // width: 80%;
  flex-direction: column;
  align-items: center;
`;

const MovieSearchForm = styled.form`
  display: flex;
  // border: green 4px solid;
  // background-color: var(--color-light);
  margin: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 3em;
  width: 70vw;
  // flex:1;
`;
const MovieSearchInput = styled.input`
  width: 45%;
  height: 2em;
  margin: 1em;
  width: 70%;
  height: 40px;
  padding: 4px;
  padding-left: 15px;
  border-radius: 25px;
  border-style: none;
  background-color: #c7c7c7;
  &:focus{
    background-color: white;
    outline:none;
  }
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

const SmallLogo = styled.img`
  height: 1em;
  width: 1em;
  cursor: pointer;
`;

// const MovieListDiv = styled.div`
//     border: black 4px solid;
//     margin: 2px;
//     flex-direction: row;
//     height: 3em;
// `

const StarDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px;
  margin-top: 4px;
  cursor: pointer;
`;

const MovieItemElementDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // border: red 4px solid;
  margin: 8px;
  height: 2em;
  width: 2em;
  cursor:pointer;
`;

const MovieItemDetailsDiv = styled.div`
  flex-direction: row;
  // border: var(--color-light) 4px solid;
  margin: 2px;

  flex: 1;
  width: 100%;
  // background-color: var(--color-light);

  // height: 2em;
  // width: 2em;
`;

const MovieItemDetailsPoster = styled.img`
  max-width: 300px;
  // margin: 4px;
`;

const MovieItemPlotDiv = styled.div`
  // border: var(--color-background-main) 4px solid;
  background-color: #dbdbdb;
  flex: 1;
  max-width: 70%
  min-width: 70%;
  // margin: 4px;
  padding: 1em;
`;

const MovieItemTitle = styled.p`
  flex: 1;
  text-align: left;
  margin-left: 2em;
  // background-color: var(--color-light);
`;
