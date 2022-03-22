import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Footer } from '../components/footer'
export const Home = ({user, setUser}) => {

    useEffect(() => {
        document.title = "Home / ViewFinder"
    }, [])
    
    return (
        <>
            {/* {!user && <Navigate to='/'/>} */}
            
            {/* <Navbar /> GOES HERE */}
            
            <form className='movie-search-form'>
                <input className='movie-search-bar'type='search' placeholder='search for a film...'/>
                <button className='search-button' type='submit'>search</button>
            </form>
            
            <div className='search-results-container'>
                {/* map thru search results, make collapsable comp for each */}
            </div>
            <Footer />
        </>
    )
}
