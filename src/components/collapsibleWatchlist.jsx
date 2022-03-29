import { useState, useEffect } from "react";
import styled from "styled-components";

import Star from "../assets/star-fill.svg";
import StarFill from "../assets/star-fill.svg";
import Triangle from  "../assets/triangle1.svg";
import TriangleFill from  "../assets/triangle-fill1.svg";
import { addFilm, removeFilm, listUserFilms } from "../utils";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

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
            
    useEffect(
        async () => {
            await listUserFilms(setWatchlist);
    }, []);
            
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
                        <MovieItemTitle>{movie.title}</MovieItemTitle>
                        <MovieItemElementDiv onClick={
                            () => {
                                    if (watchlist.map(a => a.id).find(element => element == movie.id) == undefined) {
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
                        <MovieItemDetailsPoster
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.original_title} Poster`}
                        />
                        <MovieItemPlotDiv>
                            <StarRating stars={movie.vote_average / 2} />
                            {movie.overview}
                        </MovieItemPlotDiv>
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
                        <MovieItemTitle>{movie.title}</MovieItemTitle>
                        <MovieItemElementDiv onClick={
                            () => {
                                if (watchlist.map(a => a.id).find(element => element == movie.id) == undefined) {
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
    width: 36em;
    display: flex;
    flex-direction: column;
    border: black 4px solid;
`;
const MovieSearchDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3em;
    // flex:1;
`;
const MovieSearchInput = styled.input`
    width: 45%;
    height: 2em;
    margin: 1em;
`;

const Logo = styled.img`
    height: 100%;
    width: 100%;
`;

const SmallLogo = styled.img`
    height: 1em;
    width: 1em;
`;
const MovieListDiv = styled.div`
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    height: 3em;
`

const MovieItemDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: column;
    align-items: center;
`;

const MovieItemTopDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    align-items: center;
    height: 3em;
    // background: cyan;
    width: 24em;
`;

const StarDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const MovieItemElementDiv = styled.div`
    // display: flex;
    // justify-content: stretch;
    // align-items: stretch;
    border: black 4px solid;
    margin: 2px;
    height: 2em;
    width: 2em;
    // background-color: red;
`;
const MovieItemDetailsDiv = styled.div`
    display: flex;
    flex-direction: row;
    border: black 4px solid;
    margin: 2px;
    flex: 1;
    width: 24em;
    // height: 2em;
    // width: 2em;
`;

const MovieItemDetailsPoster = styled.img`
    width: 30%;
`;
const MovieItemPlotDiv = styled.div`
    border: black 4px solid;
    margin: 2px;
    flex: 1;
    width: 50%;
    // height: 2em;
    // width: 2em;
`;
const MovieItemTitle = styled.p`
    flex: 1;
    text-align: left;
    margin-left: 2em;
`;
