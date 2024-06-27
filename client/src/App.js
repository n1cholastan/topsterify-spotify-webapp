import './App.css';
import styles from "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import NoPage from './pages/NoPage';
import { useEffect } from 'react';
import { useSpotifyAuth } from './useSpotifyAuth';


const App = () => {
  const { loggedIn } = useSpotifyAuth()

  return (
      <Router>
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;


function GetDataButton() {
  return (
    <div>
      {/*<button onClick={() => getTopData("artists", "long_term")} className="bg-green p-5 rounded-2xl text-white font-bold text-2xl w-1/4">
        Get Data
      </button>*/}
    </div>
  )
}
function ImageGrid() {
  return (
    <div>
      <div className="grid gap-5 mx-2">
        <img src="#"></img>
        <img src="#"></img>
        <img src="#"></img>
        <img src="#"></img>
      </div>
    </div>
  )
}