import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer>
      <hr />
      <div id="footer-container">
        <h2 id="footer-heading">Viewfinder</h2>
        <p>
          A project by <a href="https://github.com/chromey85">Yusuf Ayyub</a>,{" "}
          <a href="https://github.com/joelc95">Joel Conalty</a>,{" "}
          <a href="https://github.com/thankinson">Tom Hankinson</a>,{" "}
          <a href="https://github.com/Cha-M">Sha Megroff</a>,{" "}
          <a href="https://github.com/GlennPS">Glenn Sculthorp</a>, and{" "}
          <a href="https://github.com/web-lynx">Alexander R. Wayland</a>{" "}
        </p>
        <p>
          Thank you to <a href="https://www.themoviedb.org/">The Movie DB</a>{" "}
          for use of their API.
        </p>
        <p>
          Repostiories for the project can be found here:{" "}
          <a href="https://github.com/thankinson/CN_group1_viewfinder_front_end">
            Front-End
          </a>{" "}
          and{" "}
          <a href="https://github.com/thankinson/CN_group1_viewfinder_group_back_end">
            Back-End
          </a>
        </p>
      </div>
      <hr />
    </footer>
  );
};
