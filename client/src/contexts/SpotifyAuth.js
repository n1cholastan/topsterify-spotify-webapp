import { createContext, useContext, useState, useEffect, useRef } from 'react';
import LoadingWheel from '../components/LoadingWheel';
import TimeOutModal from '../components/TImeOutModal';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPE = "user-top-read user-read-email user-read-private";

const valid_token = {
  get access_token() { return localStorage.getItem("access_token") || null; },
  get refresh_token() { return localStorage.getItem("refresh_token") || null; },
  get expires_in() { return localStorage.getItem("expires_in") || null; },
  get expires() { return localStorage.getItem("expires") || null; },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem("expires", expiry);
  },
};

const SpotifyAuthContext = createContext();

export function SpotifyAuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const effectRan = useRef(false);
  const isRefreshing = useRef(false);
  useEffect(() => {
    async function handleAuthorization() {
      const url_parameters = new URLSearchParams(window.location.search);
      const code = url_parameters.get("code");
      if (code) {
        try {
          const token = await getToken(code);
          valid_token.save(token);

          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updated_url = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updated_url);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }

      if (valid_token.access_token) {
        await getUserData();
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
        } 

      setLoading(false); 
    };

    if (loading && !effectRan.current) {
      handleAuthorization();
      effectRan.current = true;
    }

    return
   }, [loading]);

  async function initiateSpotifyAuthorization() {
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
    };

    auth_url.search = new URLSearchParams(parameters).toString();
    window.location.href = auth_url.toString();
  }

  async function getToken(code) {
    const code_verifier = localStorage.getItem("code_verifier");
    const response = await fetch(TOKEN_ENDPOINT, {
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
    });
    const token = await response.json();
    console.log("Token response:", token);
    return token;
  }

  async function refreshToken() {
    if (isRefreshing.current) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isRefreshing.current){
            clearInterval(interval);
            resolve(valid_token.access_token);
          }
        }, 100);
      });
    }
    isRefreshing.current = true;
    console.log("Starting token refresh")
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: valid_token.refresh_token,
      }),
    });
    const token = await response.json();
    if (response.ok) {
      valid_token.save(token);
      console.log("Token refreshed:", token);
    } else {
      console.log("Refresh failed");
      SpotifyLogout()
      setIsModalOpen(true);
    }

    isRefreshing.current = false;
    return valid_token.access_token
  }

  async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + valid_token.access_token 
      },
    });

    const returnedUserData = await response.json();
    setUserData(returnedUserData)
  }

  async function getTopData(top_data_type, time_range, retry = true) {
    const data_parameters = {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + valid_token.access_token 
      },
    };

    const response = await fetch(`https://api.spotify.com/v1/me/top/${top_data_type}?time_range=${time_range}&limit=50`, data_parameters);
    if (response.status === 401) {
      console.log("Status = 401")
      if (retry) {
        await refreshToken();
        return getTopData(top_data_type, time_range, false);
      } else {
        console.log("Refresh failed")
      }
    }
    return await response.json();
  }

  async function SpotifyLogin() {
    await initiateSpotifyAuthorization();
  }

  function SpotifyLogout() {
    localStorage.clear();
    setLoggedIn(false);
    setUserData(null); 
  }

  return (
    <SpotifyAuthContext.Provider value={{ loggedIn, initiateSpotifyAuthorization, userData, getTopData, SpotifyLogin, SpotifyLogout, loading, getUserData }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingWheel />
        </div>
      ) : (
      children
    )}
      <TimeOutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SpotifyAuthContext.Provider>
  );
}
export function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
