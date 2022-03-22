import { useEffect } from 'react'
import { Footer } from '../components/footer'
import styled from 'styled-components';

export const UserSettings = ({user, setUser}) => {

    useEffect(() => {
        document.title = "Account / ViewFinder"
    }, [])

    return (
        <>
            {/* NAVBAR HERE */}
            <UserDetails>
                <p>username goes here</p>
                <p>email goes here</p>
            </UserDetails>
            <Footer />
        </>
    )
}

const UserDetails = styled.div`
    border: red solid 4px;
    height: 400px;
    width: 15vw;
`



  