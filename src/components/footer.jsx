import styled from "styled-components";

export const Footer = () => {
    return (
        <FooterContainer>
            <hr />
            <FooterDiv>
                <h2 id="footer-heading">Viewfinder</h2>

                <p>
                    A project by{" "}
                    <HyperLinks>
                        <a href="https://github.com/chromey85">Yusuf Ayyub</a>,{" "}
                        <a href="https://github.com/joelc95">Joel Conalty</a>,{" "}
                        <a href="https://github.com/thankinson">
                            Tom Hankinson
                        </a>
                        , <a href="https://github.com/Cha-M">Sha Megroff</a>
                        , <a href="https://github.com/GlennPS">Glenn Sculthorp</a>
                        , and{" "}
                        <a href="https://github.com/web-lynx">
                            Alexander R. Wayland
                        </a>{" "}
                    </HyperLinks>
                </p>
                <p>
                    <HyperLinks>
                        Thank you to{" "}
                        <a href="https://www.themoviedb.org/">The Movie DB</a>{" "}
                        for use of their API.
                    </HyperLinks>
                </p>
                <p>
                    Repostiories for the project can be found here:{" "}
                    <HyperLinks>
                        <a href="https://github.com/thankinson/CN_group1_viewfinder_front_end">
                            Front-End
                        </a>{" "}
                        and{" "}
                        <a href="https://github.com/thankinson/CN_group1_viewfinder_group_back_end">
                            Back-End
                        </a>
                    </HyperLinks>
                </p>
            </FooterDiv>
            <hr />
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    width: 100vw;
`;
const FooterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`;
const HyperLinks = styled.a`
    a {
        color: white;
        text-decoration: none;
        text-decoration-line: underline;
    }
`;
