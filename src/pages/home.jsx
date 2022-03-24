import { useEffect, useState } from 'react'
import { CollapsibleMovies, movieWatchlistArray, TemporaryContainer, MovieContext } from '../components/collapsibleMovie'
import { Footer } from '../components/footer'
import Navbar from '../components/navbar'
export const Home = () => {

    const [homeWatchlistState, setHomeWatchlistState] = useState(movieWatchlistArray);

    useEffect(() => {
        document.title = "Home / ViewFinder"
    }, [])
    
    return (
        <>
            <Navbar />
            <form>
                <input type='search' placeholder='search for a film...'/>
                <button className='search-button' type='submit'>Search</button>
            </form>
            
            <div className='search-results-container'>
                {/* map thru search results, make collapsable comp for each */}
            </div>

            <TemporaryContainer>
                <CollapsibleMovies listType = "Search"/>
                <CollapsibleMovies moviesArrayState = {homeWatchlistState} moviesArrayStateSetter = {setHomeWatchlistState} listType = "Watchlist"/>

            </TemporaryContainer>
            <Footer />
        </>
    )
}
//imported L3, uncom L12
