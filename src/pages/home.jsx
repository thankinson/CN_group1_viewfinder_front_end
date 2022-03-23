<<<<<<< HEAD
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
=======
import {useEffect} from 'react'
import { CollapsibleMovie } from '../components/collapsibleMovie'
>>>>>>> 3227c6f75ee56d5a6d05b5b113e5ae5d80da2017
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

            <CollapsibleMovie />
            <Footer />
        </>
    )
}
//imported L3, uncom L12
