import { createContext, useContext, useState, useEffect, useRef } from "react";
import ErrorModal from "../components/ErrorModal";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPE = "user-top-read user-read-email user-read-private";

const validToken = {
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

}

const SpotifyAuthContext = createContext();

export function SpotifyAuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const effectRan = useRef(false);
  const isRefreshing = useRef(false);

  useEffect(() => {
    async function handleAuthorization() {
      const urlParameters = new URLSearchParams(window.location.search);
      const code = urlParameters.get("code");
      if (code) {
        try {
          const token = await getToken(code);
          validToken.save(token);

          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        } catch (error) {
          handleError(error.message);
        }
      }

      if (validToken.access_token) {
        try {
          validToken.clearAccessToken()
          await getUserData();
          setLoggedIn(true);
        } catch (error) {
          handleError(error.message);
        }
      } else {
        setLoggedIn(false);
      }

      setLoading(false);
    }

    if (loading && !effectRan.current) {
      handleAuthorization();
      effectRan.current = true;
    }
  }, [loading]);

  async function initiateSpotifyAuthorization() {
    const code_verifier = generateCodeVerifier();
    window.localStorage.setItem("code_verifier", code_verifier);

    const authUrl = new URL(AUTH_ENDPOINT);
    authUrl.search = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: "S256",
      code_challenge: await generateCodeChallenge(code_verifier),
      redirect_uri: REDIRECT_URL,
    }).toString();

    window.location.href = authUrl.toString();
  }

  function generateCodeVerifier() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    return Array.from(randomValues, x => characters[x % characters.length]).join("");
  }

  async function generateCodeChallenge(code_verifier) {
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
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
    if (!response.ok) throw new Error("Failed to get token");

    return response.json();
  }

  async function refreshToken() {
    if (isRefreshing.current) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isRefreshing.current) {
            clearInterval(interval);
            resolve(validToken.access_token);
          }
        }, 100);
      });
    }

    isRefreshing.current = true;
    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "refresh_token",
          refresh_token: validToken.refresh_token,
        }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const token = await response.json();
      validToken.save(token);
      console.log("Token refreshed:", token);
    } catch (error) {
      handleError(error.message);
    } finally {
      isRefreshing.current = false;
    }

    return validToken.access_token;
  }

  async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { "Authorization": `Bearer ${validToken.access_token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    setUserData(await response.json());
  }

  async function getTopData(topDataType, timeRange, retry = true) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/${topDataType}?time_range=${timeRange}&limit=50`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${validToken.access_token}` },
      });

      if (response.status === 401) {
        if (retry) {
          await refreshToken();
          return getTopData(topDataType, timeRange, false);
        } else {
          throw new Error("Failed to refresh token and retry");
        }
      }

      if (!response.ok) throw new Error("Failed to fetch top data");

      return response.json();
    } catch (error) {
      handleError(error.message);
    }
  }

  async function SpotifyLogin() {
    await initiateSpotifyAuthorization();
  }

  function SpotifyLogout() {
    localStorage.clear();
    setLoggedIn(false);
    setUserData(null);
  }

  function handleError(message) {
    console.error(message);
    SpotifyLogout();
    setErrorText(message);
    setIsModalOpen(true);
  }

  return (
    <SpotifyAuthContext.Provider
      value={{
        loggedIn,
        initiateSpotifyAuthorization,
        userData,
        getTopData,
        SpotifyLogin,
        SpotifyLogout,
        loading,
        getUserData
      }}
    >
      {children}
      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} errorText={errorText} />
    </SpotifyAuthContext.Provider>
  );
}

export function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
