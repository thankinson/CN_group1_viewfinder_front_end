import { useEffect } from 'react'
import { CollapsibleMovies, movieWatchlistArray, TemporaryContainer } from '../components/collapsibleMovie'
import { Footer } from '../components/footer'
import Navbar from '../components/navbar'
export const Home = () => {

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
                <CollapsibleMovies moviesArray = {movieWatchlistArray} listType = "Watchlist"/>

            </TemporaryContainer>
            <Footer />
        </>
    )
}
//imported L3, uncom L12
