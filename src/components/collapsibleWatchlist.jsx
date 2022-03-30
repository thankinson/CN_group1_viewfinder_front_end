import { useState, useEffect } from "react";
import styled from "styled-components";
import Star from "../assets/star-fill.svg";
import TriangleFill from  "../assets/triangle-fill1.svg";
import { addFilm, removeFilm, listUserFilms } from "../utils";

const StarRating = ({ stars }) =>  {
    let fiveStars = [0,0,0,0,0];
    fiveStars = fiveStars.slice(0, Math.round(stars));
    return (
        <StarDiv>
                { fiveStars && fiveStars.map(
                    (item, index) => <SmallLogo src={Star} key= {`Star${index}`}/>
                    )
                }
        </StarDiv>
    ) 
    
}
export const CollapsibleWatchlist = ({ user }) => {
    const [watchlist, setWatchlist] = useState([]);

    const movieWatchlistAdd = async ( movie ) => {
        console.log("movieWatchlistAdd", user, movie);
        // setWatchlist(watchlist.filter((item) => item.id !== movie));
        setWatchlist([...watchlist, movie]);
        await addFilm(user, movie);
    }

    const movieWatchlistRemove = async ( movie ) => {
        console.log("movieWatchlistRemove", user, movie);
        setWatchlist(watchlist.filter((item) => item.id !== movie));
        // setWatchlist([...watchlist, movie]);
        await removeFilm(user, movie);
    }
        
    // let copy = []

    // On page load, fetch user watchlist from db
    // This function will then fetch region data from our API
    // returning an array of movie objects containing region data
    useEffect(
        async () => {
            await listUserFilms(setWatchlist);
    }, []);

    
    // This function controls the tab display inside each movie item
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
            tabLinks[i].className = tabLinks[i].className.replace(" active","");
        }

        // Show current tab, and add an "active" class to the button that opened the tab
        document.getElementById(serviceName).style.display = "block";
        e.currentTarget.className += " active";
    }
            
    const MovieItem = ({ movie }) => {
        const [expanded, setExpanded] = useState(false);
        if (expanded) {
            return (
                <MovieItemDiv>
                    <MovieItemTopDiv>
                        <MovieItemElementDiv
                            onClick={() => setExpanded(!expanded)}
                        >
                            <Logo src={TriangleFill} />
                        </MovieItemElementDiv>
                        <MovieItemTitle>{movie.title} ({movie.release_date && movie.release_date.substring(0,4)})</MovieItemTitle>
                        <MovieItemElementDiv onClick={
                            () => {
                                    if (watchlist.map(a => a.id).find(element => element === movie.id) === undefined) {
                                        console.log("Not found on watchlist. Adding.")
                                        movieWatchlistAdd(movie.id);
                                    } else {
                                        console.log("Found on watchlist. Removing.")
                                        movieWatchlistRemove(movie.id);
                                    }
                                    // setRemoveFlag(!removeFlag);
                                }

                            }>
                            <Logo src={Star} />
                        </MovieItemElementDiv>
                    </MovieItemTopDiv>
                    <MovieItemDetailsDiv>
                        <div className='movie-info'>
                            <MovieItemDetailsPoster
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`${movie.original_title} Poster`}
                            />
                            <MovieItemPlotDiv>
                                <StarRating stars={movie.vote_average / 2} />
                                {movie.overview}
                            </MovieItemPlotDiv>
                        </div>

                        <div className="streaming-div">
                            <div className="service-tab-picker">
                                <div className="tab">
                                    <button
                                        className="tab-links"
                                        onClick={(event) =>
                                            openTab(event, "Netflix")
                                        }
                                    >
                                        Netflix
                                    </button>
                                    <button
                                        className="tab-links"
                                        onClick={(event) =>
                                            openTab(event, "Prime")
                                        }
                                    >
                                        Prime
                                    </button>
                                    <button
                                        className="tab-links"
                                        onClick={(event) =>
                                            openTab(event, "Disney+")
                                        }
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
                    </MovieItemDetailsDiv>
                </MovieItemDiv>
            );
        } else {
            return (
                <MovieItemDiv>
                    <MovieItemTopDiv>
                        <MovieItemElementDiv
                            onClick={() => setExpanded(!expanded)}
                        >
                            <Logo src={TriangleFill} />
                        </MovieItemElementDiv>
                        <MovieItemTitle>{movie.title} ({movie.release_date && movie.release_date.substring(0,4)})</MovieItemTitle>
                        <MovieItemElementDiv onClick={
                            () => {
                                if (watchlist.map(a => a.id).find(element => element === movie.id) === undefined) {
                                    console.log("Not found on watchlist. Adding.")
                                    movieWatchlistAdd(movie.id);
                                } else {
                                    console.log("Found on watchlist. Removing.")
                                    movieWatchlistRemove(movie.id);
                                }
                                // setRemoveFlag(!removeFlag);
                            }

                        }>
                            <Logo src={Star} />
                        </MovieItemElementDiv>
                    </MovieItemTopDiv>
                </MovieItemDiv>
            );
        }
    };

    return (
        // <h2>
        //     Placeholder
        // </h2>
        <MainMovieDiv>
            <h2>CollapsibleWatchlist</h2>
            {/* { watchlist && watchlist.map(
                        (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
                    )
                } */}
            {watchlist.map(
                // (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
                (item, index) => (
                    <div>
                        <MovieItem movie={item} />
                    </div>
                )
            )}
        </MainMovieDiv>
    );
};

export const TemporaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: black 4px dashed;
    background-color: lightblue;
    padding: 2px;
`;
const MainMovieDiv = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    border: red 4px solid;
    text-align: center;
    
`;
const Logo = styled.img`
    height: 100%;
    width: 100%;
`;

const SmallLogo = styled.img`
    height: 1em;
    width: 1em;
`;


const MovieItemDiv = styled.div`
    display: flex;
    // border: blue 4px solid;
    margin: 2px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: cyan;
`;

const MovieItemTopDiv = styled.div`
    display: flex;
    border: pink 4px solid;
    margin: 2px;
    flex-direction: row;
    align-items: center;
    height: 3em;
    background: cyan;
    width: 80%;
`;

const StarDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const MovieItemElementDiv = styled.div`
    // display: flex;
    // justify-content: stretch;
    // align-items: stretch;
    border: orange 4px solid;
    margin: 2px;
    height: 2em;
    width: 2em;
    // background-color: cyan;
`;
const MovieItemDetailsDiv = styled.div`
    flex-direction: row;
    border: grey 4px solid;
    margin: 2px;
    flex: 1;
    width: 100%;
    // height: 2em;
    // width: 2em;
`;

const MovieItemDetailsPoster = styled.img`
    max-height: 300px;
`;
const MovieItemPlotDiv = styled.div`
    border: purple 4px solid;
    margin: 2px;
`;
const MovieItemTitle = styled.p`
    flex: 1;
    text-align: left;
    margin-left: 2em;
`;
