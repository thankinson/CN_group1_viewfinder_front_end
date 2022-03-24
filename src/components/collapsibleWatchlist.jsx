import { useState, useEffect } from "react";
import styled from "styled-components";
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const CollapsibleWatchlist = ({ user }) => {
    const [watchlist, setWatchlist] = useState([]);
    // listUserFilms(setWatchlist);

    const RetrieveMovieByID = async (id) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`
            );
            const movieJSON = await response.json();
            console.log(movieJSON);
            return movieJSON;
        } catch (error) {
            console.log(error);
        }
    };

    const backendWatchList = [454626, 2, 3];
    const fakeWatchlist = [
        // { id: 454626, title: "A film", img: "" },
        // { id: 2 },
        // { id: 3 },
    ];
    const createMovieObjectArray = (backendWatchList) => {
        for (let x of backendWatchList) {
            fakeWatchlist.push(RetrieveMovieByID(x));
        }
        console.log(fakeWatchlist);
        return fakeWatchlist;
    };

    useEffect((backendWatchList) => {
        createMovieObjectArray(backendWatchList);
    }, []);

    const mapFakeWatchlist = (fakeWatchlist) => {
        return fakeWatchlist.map((item, index) => <p>{item.id}</p>);
    };

    return mapFakeWatchlist(fakeWatchlist);
};
//     const MovieWatchlistAdd = (movie) => {
//         addFilm(movie);
//         setWatchlist(listUserFilms);
//         console.log(watchlist);
//     };

//     const MovieItem = ({ movie }) => {
//         const [expanded, setExpanded] = useState(false);
//         if (expanded) {
//             return (
//                 <MovieItemDiv>
//                     <MovieItemTopDiv>
//                         <MovieItemElementDiv
//                             onClick={() => setExpanded(!expanded)}
//                         >
//                             <Logo src={TriangleFill} />
//                         </MovieItemElementDiv>
//                         <MovieItemTitle>{movie.title}</MovieItemTitle>
//                         <MovieItemElementDiv
//                             onClick={(movie) => MovieWatchlistAdd(movie)}
//                         >
//                             <Logo src={Star} />
//                         </MovieItemElementDiv>
//                     </MovieItemTopDiv>
//                     <MovieItemDetailsDiv>
//                         <MovieItemDetailsPoster
//                             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                             alt={`${movie.original_title} Poster`}
//                         />
//                         <MovieItemPlotDiv>
//                             <StarRating stars={movie.vote_average / 2} />
//                             {movie.overview}
//                         </MovieItemPlotDiv>
//                     </MovieItemDetailsDiv>
//                 </MovieItemDiv>
//             );
//         } else {
//             return (
//                 <MovieItemDiv>
//                     <MovieItemTopDiv>
//                         <MovieItemElementDiv
//                             onClick={() => setExpanded(!expanded)}
//                         >
//                             <Logo src={TriangleFill} />
//                         </MovieItemElementDiv>
//                         <MovieItemTitle>{movie.title}</MovieItemTitle>
//                         <MovieItemElementDiv
//                             onClick={() => MovieWatchlistAdd(movie)}
//                         >
//                             <Logo src={Star} />
//                         </MovieItemElementDiv>
//                     </MovieItemTopDiv>
//                 </MovieItemDiv>
//             );
//         }
//     };
//     return (
//         // <h2>
//         //     Placeholder
//         // </h2>
//         <MainMovieDiv>
//             <h2>CollapsibleWatchlist</h2>
//             {/* { watchlist && watchlist.map(
//                         (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
//                     )
//                 } */}
//             {["1", "2", "3", "4"].map(
//                 // (item, index) => <MovieItem movie = {RetrieveMovieByID(item)} />
//                 (item, index) => (
//                     <p>{RetrieveMovieByID(item).title} </p>
//                 )
//             )}
//         </MainMovieDiv>
//     );
// };

export const TemporaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: black 4px dashed;
    background-color: lightblue;
    padding: 2px;
`;
// const MainMovieDiv = styled.div`
//     width: 36em;
//     display: flex;
//     flex-direction: column;
//     border: black 4px solid;
// `;
// const MovieSearchDiv = styled.div`
//     display: flex;
//     border: black 4px solid;
//     margin: 2px;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     height: 3em;
//     // flex:1;
// `;
// const MovieSearchInput = styled.input`
//     width: 45%;
//     height: 2em;
//     margin: 1em;
// `;

// const Logo = styled.img`
//     height: 100%;
//     width: 100%;
// `;

// const SmallLogo = styled.img`
//     height: 1em;
//     width: 1em;
// `;
// // const MovieListDiv = styled.div`
// //     border: black 4px solid;
// //     margin: 2px;
// //     flex-direction: row;
// //     height: 3em;
// // `

// const MovieItemDiv = styled.div`
//     display: flex;
//     border: black 4px solid;
//     margin: 2px;
//     flex-direction: column;
//     align-items: center;
// `;

// const MovieItemTopDiv = styled.div`
//     display: flex;
//     border: black 4px solid;
//     margin: 2px;
//     flex-direction: row;
//     align-items: center;
//     height: 3em;
//     // background: cyan;
//     width: 24em;
// `;

// const StarDiv = styled.div`
//     display: flex;
//     flex-direction: row;
// `;

// const MovieItemElementDiv = styled.div`
//     // display: flex;
//     // justify-content: stretch;
//     // align-items: stretch;
//     border: black 4px solid;
//     margin: 2px;
//     height: 2em;
//     width: 2em;
//     // background-color: red;
// `;
// const MovieItemDetailsDiv = styled.div`
//     display: flex;
//     flex-direction: row;
//     border: black 4px solid;
//     margin: 2px;
//     flex: 1;
//     width: 24em;
//     // height: 2em;
//     // width: 2em;
// `;

// const MovieItemDetailsPoster = styled.img`
//     width: 30%;
// `;
// const MovieItemPlotDiv = styled.div`
//     border: black 4px solid;
//     margin: 2px;
//     flex: 1;
//     width: 50%;
//     // height: 2em;
//     // width: 2em;
// `;
// const MovieItemTitle = styled.p`
//     flex: 1;
//     text-align: left;
//     margin-left: 2em;
// `;
