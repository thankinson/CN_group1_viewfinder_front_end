import {useEffect} from 'react'
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
                <button className='search-button' type='submit'>search</button>
            </form>
            
            <div className='search-results-container'>
                {/* map thru search results, make collapsable comp for each */}
            </div>
            <Footer />
        </>
    )
}
//imported L3, uncom L12
