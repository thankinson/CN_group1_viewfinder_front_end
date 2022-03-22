// Collapsible Bar
import { useState } from "react";
import Collapsible from "react-collapsible";
import "../globalstyles/styles.css";
import styled from "styled-components";


//

const MovieItem = ( {movie} ) => {
    return (
        <MovieItemDiv>
            <MovieItemElementDiv>▼</MovieItemElementDiv>
            <p>{movie.title}</p>
            <MovieItemElementDiv>★</MovieItemElementDiv>
        </MovieItemDiv>
    )
}

export const CollapsibleMovie = ( { moviesArray } ) => {
    return (
        <MainMovieDiv>
            MainMovieDiv
            <MovieSearchDiv>
                {/* MovieSearchDiv */}
                <MovieSearchInput>
                </MovieSearchInput>
            </MovieSearchDiv>
                { moviesArray.map(
                        (item, index) => <MovieItem movie = {item} />
                    )
                }
            <MovieItemDiv>
                <MovieItemElementDiv>▼</MovieItemElementDiv>
                    <p>Movie Title</p>
                <MovieItemElementDiv>★</MovieItemElementDiv>
            </MovieItemDiv>
            
            
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

