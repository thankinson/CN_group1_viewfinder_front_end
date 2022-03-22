// Collapsible Bar
import { useState } from "react";
import Collapsible from "react-collapsible";
import "../globalstyles/styles.css";
import styled from "styled-components";
import Star from "../assets/star.svg";
import StarFill from "../assets/star-fill.svg";
import Triangle from  "../assets/triangle1.svg";
import TriangleFill from  "../assets/triangle-fill1.svg";



//        <img src={Flixy} className="App-logo" alt="logo" />

const { REACT_APP_API_KEY } = process.env;
//
export const CollapsibleMovie = ( { moviesArray } ) => {
    const [watchlist, setWatchlist] = useState([]);
    const [movieSearch, setMovieSearch] = useState();
    const [movieResults, setMovieResults] = useState([]);

        const SearchMovie = async (searchString) => {
            try {
                const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&query=${searchString}`);
                const movieJSON = await response.json();

                setMovieResults(movieJSON.results);
                console.log(movieResults);
            } catch (error) {
                console.log(error);
            }
        }

    const MovieItem = ( {movie} ) => {
        const [expanded, setExpanded] = useState(false);
        if (expanded) {
            return (
                <MovieItemDiv>
                    <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                    <MovieItemTitle>{movie.title} (expanded!)</MovieItemTitle>
                    <MovieItemElementDiv
                        onClick={   () =>   {   
                                                watchlist.length ? setWatchlist([ ...watchlist, movie.title]) : setWatchlist([movie.title]);
                                                console.log(watchlist);
                                            }
                        }
                    >
                    <Logo src={Star}/>
                    </MovieItemElementDiv>
                    <MovieItemDetailsDiv>
                        <ul>
                            <li>
                                ghjjgh
                            </li>
                            <li>

                            </li>
                            <li>

                            </li>
                            <li>

                            </li>
                        </ul>
                    </MovieItemDetailsDiv>
                </MovieItemDiv>
            )
        }
        else {
            return (
                <MovieItemDiv>
                    <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                    <MovieItemTitle>{movie.title}</MovieItemTitle>
                    <MovieItemElementDiv
                        onClick={   () =>   {   
                                                watchlist.length ? setWatchlist([ ...watchlist, movie.title]) : setWatchlist([movie.title]);
                                                console.log(watchlist);
                                            }
                        }
                    >
                    <Logo src={Star}/>
                    </MovieItemElementDiv>
                </MovieItemDiv>
            )
        }
    }

    return (
        <MainMovieDiv>
                {/* setWatchlist([ ...watchlist, movie.title]) */}
                <MovieSearchDiv>
                {/* MovieSearchDiv */}
                <MovieSearchInput onClick={(e) => SearchMovie(e.target.value)} />
            </MovieSearchDiv>
                { movieResults && movieResults.map(
                        (item, index) => <MovieItem movie = {item} />
                    )
                }
        </MainMovieDiv>
    )
}

const MainMovieDiv = styled.div`
    width: 30vw;
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

const Logo = styled.img`
    height: 100%
    width: 100%
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
const MovieItemDetailsDiv = styled.div`
    border: black 4px solid;
    margin: 2px;
    flex: 1;
    // height: 2em;
    // width: 2em;
`
const MovieItemTitle = styled.p`
    flex: 1;
    text-align: left;
    margin-left: 2em;
`

