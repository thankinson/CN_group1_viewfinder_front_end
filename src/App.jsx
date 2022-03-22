import './App.css';
import Flixy from "./Flixy.svg";
import { CollapsibleMovie } from "./components/collapsibleMovie";

const tempObjArray = [{title: "The Mummy", actor: "Brendan Fraser"}, ];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Flixy} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <CollapsibleMovie moviesArray={tempObjArray}/>
    </div>
  );
}

export default App;