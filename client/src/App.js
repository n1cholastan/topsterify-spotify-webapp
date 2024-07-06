import './App.css';
import styles from "./index.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import NoPage from './pages/NoPage';
<<<<<<< Updated upstream
=======
import Login from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useSpotifyAuth } from './contexts/SpotifyAuth';
import LoadingWheel from './components/LoadingWheel';
>>>>>>> Stashed changes

const CLIENT_ID = "abd29aebc1a94db989876e775b4c2f81";
const REDIRECT_URL = "http://localhost:3000";

<<<<<<< Updated upstream
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const SCOPE = "user-top-read user-read-email user-read-private"
 
const valid_token = {
  get access_token() {return localStorage.getItem("access_token") || null; },
  get refresh_token() {return localStorage.getItem("refresh_token") || null; },
  get expires_in() {return localStorage.getItem("refresh_in") || null; },
  get expires() {return localStorage.getItem("expires") || null;},
=======
function App() {
  const { loggedIn, loading } = useSpotifyAuth();
  if (loading) {
    return (
      <div className='h-screen w-screen bg-white flex align-middle items-center justify-center'>
        <LoadingWheel />
      </div>
    )
  }
>>>>>>> Stashed changes

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem("expires", expiry);
  }
};

async function SpotifyRedirectAuthorization() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const random_values = crypto.getRandomValues(new Uint8Array(64));
  const random_string = random_values.reduce((acc, x) => acc + characters[x % characters.length], "");

  const code_verifier = random_string;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);
  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  window.localStorage.setItem('code_verifier', code_verifier);
  
  const auth_url = new URL(AUTH_ENDPOINT);
  const parameters = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: REDIRECT_URL,
  }

  auth_url.search = new URLSearchParams(parameters).toString();
  window.location.href = auth_url.toString();
}

const url_parameters = new URLSearchParams(window.location.search);
let code = url_parameters.get("code");

if (code) {
  const token = await getToken(code);
  valid_token.save(token);

  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updated_url = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updated_url);
} 

if (valid_token.access_token) {
  const user_data = await getUserData();
  // render logged in version of site
}

if (!valid_token.access_token) {
  // render logged out version of site 
}

async function getToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");
  const response = await(fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URL,
      code_verifier: code_verifier,
    }),
  }));
  return await response.json();
}

async function refreshToken() {
  const response = await(fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: valid_token.refreshToken,
    }),
  }));
  return await response.json();
}

async function SpotifyLogin() {
  await SpotifyRedirectAuthorization();
}
async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + valid_token.access_token 
    },
  });

  return await response.json();
}

async function getTopData(top_data_type, time_range) {
  const data_parameters = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + valid_token.access_token 
    },
  }
  var response = await fetch("https://api.spotify.com/v1/me/top/" + top_data_type + "?time_range=" + time_range + "&limit=50", data_parameters)
  .then(response => response.json())
  .then(data => console.log(data))
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
<<<<<<< Updated upstream
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
=======
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/artists" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
          <Route path="/tracks" element={<ProtectedRoute><Tracks /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router> 
>>>>>>> Stashed changes
  );
}

export default App;
<<<<<<< Updated upstream


function GetDataButton() {
  return (
    <div>
      <button onClick={() => getTopData("artists", "long_term")} className="bg-green p-5 rounded-2xl text-white font-bold text-2xl w-1/4">
        Get Data
      </button>
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
=======
>>>>>>> Stashed changes
