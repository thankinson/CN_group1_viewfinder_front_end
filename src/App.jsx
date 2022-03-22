import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { UserSettings } from "./pages/userSettings";
import { WatchList } from "./pages/watchList";
//import Flixy from "./Flixy.svg";

function App() {
    const [user, setUser] = useState();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login user={user} setUser={setUser} />}
                />
                <Route
                    path="/home"
                    element={<Home user={user} setUser={setUser} />}
                />
                <Route
                    path="/user"
                    element={<UserSettings user={user} setUser={setUser} />}
                />
                <Route
                    path="/watchlist"
                    element={<WatchList user={user} setUser={setUser} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
