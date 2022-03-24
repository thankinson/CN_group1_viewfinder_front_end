//  watch list
import { Footer } from '../components/footer'
import Navbar from '../components/navbar'
import { CollapsibleWatchlist, TemporaryContainer } from '../components/collapsibleMovie'

// useEffect(() => {
//     document.title = "This is a title"
//   }, [])
  
export const WatchList = ( {user} ) => {
    return (
        <>
            <Navbar />
            <TemporaryContainer>
                <CollapsibleWatchlist user = {user}/>
            </TemporaryContainer>
            <Footer />
        </>
    )
}
