// Collapsible Bar
import { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import "../globalstyles/styles.css";
import styled from "styled-components";
import Star from "../assets/star.svg";
import StarFill from "../assets/star-fill.svg";
import Triangle from  "../assets/triangle1.svg";
import TriangleFill from  "../assets/triangle-fill1.svg";
import { addFilm, listUserFilms } from "../utils";



//        <img src={Flixy} className="App-logo" alt="logo" />

const { REACT_APP_API_KEY } = process.env;
//

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

export let movieWatchlistArray = [];

export const CollapsibleSearch = ( { user } ) => {
    
    const [movieSearch, setMovieSearch] = useState();
    const [movieResults, setMovieResults] = useState([]);

    const MovieWatchlistAdd = ( movie ) => {
        addFilm(user, movie);
    }

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
                    <MovieItemTopDiv>
                        <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                        <MovieItemTitle>{movie.title}</MovieItemTitle>
                        <MovieItemElementDiv onClick={() => MovieWatchlistAdd(movie)}>
                        <Logo src={Star}/>
                        </MovieItemElementDiv>
                    </MovieItemTopDiv>
                        <MovieItemDetailsDiv>

                            <MovieItemDetailsPoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.original_title} Poster`} /> 
                            <MovieItemPlotDiv>
                                <StarRating stars={movie.vote_average/2}/>
                                {movie.overview}
                            </MovieItemPlotDiv>
                        </MovieItemDetailsDiv>
                </MovieItemDiv>
            )
        }
        else {
            return (
                <MovieItemDiv>
                    <MovieItemTopDiv>
                        <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                        <MovieItemTitle>{movie.title}</MovieItemTitle>
                        <MovieItemElementDiv onClick={() => MovieWatchlistAdd(movie)}>
                        <Logo src={Star}/>
                        </MovieItemElementDiv>
                    </MovieItemTopDiv>
                </MovieItemDiv>
            )
        }
    }
        
    return (
        <MainMovieDiv>
            <h2>
                CollapsibleSearch
            </h2>
                <MovieSearchDiv>
                {/* MovieSearchDiv */}
                {/* <MovieSearchInput onClick={(e) => SearchMovie(e.target.value)} /> */}
                <MovieSearchInput onChange={(e) => setMovieSearch(e.target.value)} />
                    <button onClick={() => SearchMovie(movieSearch)}>Search</button>

                </MovieSearchDiv>
                {movieResults && movieResults.map(
                        (item, index) => <MovieItem movie = {item} />
                    )
                }
        </MainMovieDiv>
    )


}

export const CollapsibleWatchlist = () => {
    const [watchlist, setWatchlist] = useState ([]);
    // listUserFilms(setWatchlist);

    useEffect(() => {
    }, []);

    const MovieWatchlistAdd = ( movie ) => {
        addFilm(movie);
        setWatchlist(listUserFilms);
        console.log(watchlist);
    }

    const MovieItem = ( { movie } ) => {
        console.log("MovieItem movie =", movie);
        const [expanded, setExpanded] = useState(false);
        if (expanded) {
            return (
                <p>
                    MovieItem...
                </p>
                // <MovieItemDiv>
                //     <MovieItemTopDiv>
                //         <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                //         <MovieItemTitle>{movie.title}</MovieItemTitle>
                //         <MovieItemElementDiv onClick={() => MovieWatchlistAdd(movie)}>
                //         <Logo src={Star}/>
                //         </MovieItemElementDiv>
                //     </MovieItemTopDiv>
                //         <MovieItemDetailsDiv>

                //             <MovieItemDetailsPoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.original_title} Poster`} /> 
                //             <MovieItemPlotDiv>
                //                 <StarRating stars={movie.vote_average/2}/>
                //                 {movie.overview}
                //             </MovieItemPlotDiv>
                //         </MovieItemDetailsDiv>
                // </MovieItemDiv>
            )
        }
        else {
            return (
                <p>
                    MovieItem...
                </p>
                // <MovieItemDiv>
                //     <MovieItemTopDiv>
                //         <MovieItemElementDiv onClick={() => setExpanded(!expanded)}><Logo src={TriangleFill}/></MovieItemElementDiv>
                //         <MovieItemTitle>{movie.title}</MovieItemTitle>
                //         <MovieItemElementDiv onClick={() => MovieWatchlistAdd(movie)}>
                //         <Logo src={Star}/>
                //         </MovieItemElementDiv>
                //     </MovieItemTopDiv>
                // </MovieItemDiv>
            )
        }
    }
    // const MovieItemByID = async ( {movieID} ) => {
    const MovieItemByID = async ( ) => {
        try {
            console.log("Begin MovieItemByID");
            // const response = await fetch (`https://api.themoviedb.org/3/movie/${movieID}?api_key=${REACT_APP_API_KEY}`);
            // const movieJSON = await response.json();
            // console.log("Movie id", movieID, "retrieved: ", movieJSON);

            // return movieJSON;
            return (
                <MovieItem movie = "A string" />
            )

        } catch (error) {
            console.log(error);
            return (
                <h2>Placeholder MIBID</h2>
                // <h2>{error} on movie {movieID}</h2>
            )
        }

    }

    const assembleWatchlist = async (IDArray, state, setter) => {
        for (let movieID of IDArray) {
            try {
                const response = await fetch (`https://api.themoviedb.org/3/movie/${movieID}?api_key=${REACT_APP_API_KEY}`);
                const movieJSON = await response.json();
                setter([...state, movieJSON]);

            } catch (error) {
                console.log(error);
            }
        }
    }

    assembleWatchlist([2,3], watchlist, setWatchlist);

    return (
        // <h2>
        //     Placeholder
        // </h2>
            <h2>
                CollapsibleWatchlist
                {}
            </h2>

    //     <MainMovieDiv>
    //         <h2>
    //             CollapsibleWatchlist
    //         </h2>
    //             {/* { watchlist && watchlist.map(
    //                     (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
    //                 )
    //             } */}
    //             {/* { [2, 3, 2, 3].map(
    //                 // (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
    //                 (item, index) => <RetrieveMovieByID id={item} />
    //                 )
    //             } */}
    //         {/* <MovieItemByID movieID = {2} /> */}
    //         <MovieItemByID />
                
    //     </MainMovieDiv>
    )

}

export const TemporaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: black 4px dashed;
    background-color: lightblue;
    padding: 2px;
`
const MainMovieDiv = styled.div`
    width: 36em;
    display: flex;
    flex-direction: column;
    border: black 4px solid;
`
const MovieSearchDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3em;
    // flex:1;

`
const MovieSearchInput = styled.input`
    width: 45%;
    height: 2em;
    margin: 1em;
`

const Logo = styled.img`
    height: 100%
    width: 100%
`

const SmallLogo = styled.img`
    height: 1em;
    width: 1em;
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
    flex-direction: column;
    align-items: center;
`

const MovieItemTopDiv = styled.div`
    display: flex;
    border: black 4px solid;
    margin: 2px;
    flex-direction: row;
    align-items: center;
    height: 3em;
    // background: cyan;
    width: 24em;
`

const StarDiv = styled.div`
    display: flex;
    flex-direction: row;
`

const MovieItemElementDiv = styled.div`
    // display: flex;
    // justify-content: stretch;
    // align-items: stretch;
    border: black 4px solid;
    margin: 2px;
    height: 2em;
    width: 2em;
    // background-color: red;
`
const MovieItemDetailsDiv = styled.div`
    display: flex;
    flex-direction: row;
    border: black 4px solid;
    margin: 2px;
    flex: 1;
    width: 24em;
    // height: 2em;
    // width: 2em;
`

const MovieItemDetailsPoster = styled.img`
    width: 30%;
`
const MovieItemPlotDiv = styled.div`
    border: black 4px solid;
    margin: 2px;
    flex: 1;
    width: 50%;
    // height: 2em;
    // width: 2em;
`
const MovieItemTitle = styled.p`
    flex: 1;
    text-align: left;
    margin-left: 2em;
`

