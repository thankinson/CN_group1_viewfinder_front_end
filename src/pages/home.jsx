import React from 'react'
import { Footer } from '../components/footer'
export const Home = () => {
    
    return (
        <>
            {/* <Navbar /> */}
            <form>
                <input type='search' placeholder='search for a film...'/>
            </form>
            
            <div className='search-results-container'>
                {/* map thru search results, make collapsable comp for each */}
            </div>
            {/* <Footer /> */}
        </>
    )
}
