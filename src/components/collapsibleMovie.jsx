// Collapsible Bar
import { useState } from "react";
import Collapsible from "react-collapsible";
import "../globalstyles/styles.css";
import styled from "styled-components";
import Star from "../assets/star.svg";
import StarFill from "../assets/star-fill.svg";



//        <img src={Flixy} className="App-logo" alt="logo" />

const { REACT_APP_API_KEY } = process.env;
//
export const CollapsibleMovie = ( { moviesArray } ) => {
    const [watchlist, setWatchlist] = useState([]);
    const [movieSearch, setMovieSearch] = useState();
    const [movieResult, setMovieResult] = useState();

    const MovieItem = ( {movie} ) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <MovieItemDiv>
                <MovieItemElementDiv onClick={() => alert("Arrow")}>▼</MovieItemElementDiv>
                <MovieItemTitle>{movie.title}</MovieItemTitle>
                <MovieItemElementDiv
                    onClick={   () =>   {   
                                            watchlist.length ? setWatchlist([ ...watchlist, movie.title]) : setWatchlist([movie.title]);
                                            console.log(watchlist);
                                        }
                    }
                >
                    ★
                </MovieItemElementDiv>
            </MovieItemDiv>
        )
    }

    const SearchMovie = async (searchString) => {
        try {
            const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&query=${searchString}`);
            const movieJSON = await response.json();
            setMovieResult(movieJSON);
            console.log(movieResult);
        } catch (error) {
            console.log(error);
        }
        // return (
        //     <>
        //         <p>{movieSearch}</p>
        //     </>
        // )
    }

    return (
        <MainMovieDiv>
                {/* setWatchlist([ ...watchlist, movie.title]) */}
                <MovieSearchDiv onChange={(e) => setMovieSearch(e.target.value)}>
                {/* MovieSearchDiv */}
                <MovieSearchInput>
                </MovieSearchInput>
                <button onClick={(e) => SearchMovie(movieSearch)}>
                    Search
                </button>
            </MovieSearchDiv>
                { moviesArray.map(
                        (item, index) => <MovieItem movie = {item} />
                    )
                }
        </MainMovieDiv>
    )
}

const MainMovieDiv = styled.div`
    width: 30vw;
    height: 20vw;
    display: flex;
    flex-direction: column;
    border: black 4px solid;
`
const MovieSearchDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 3em;
    // flex:1;

`
const MovieSearchInput = styled.input`
    width: 60%;
    height: 2em;
`
// const MovieListDiv = styled.div`
//     border: black 4px solid;
//     margin: 2px;
//     flex-direction: row;
//     height: 3em;
// `


const MovieItemDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    align-items: center;
    // flex:1;
    height: 3em;
`
const MovieItemElementDiv = styled.div`
    // display: flex;
    // justify-content: stretch;
    // align-items: stretch;
    border: black 4px solid;
    margin: 2px;
    height: 2em;
    width: 2em;
`
const MovieItemTitle = styled.p`
    flex: 1;
    text-align: left;
    margin-left: 2em;
`

