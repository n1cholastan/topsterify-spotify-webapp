import { createContext, useContext, useState, useEffect } from 'react';

const CLIENT_ID = "abd29aebc1a94db989876e775b4c2f81";
const REDIRECT_URL = "http://localhost:3000";
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
  }
};

const SpotifyAuthContext = createContext();

export const SpotifyAuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const url_parameters = new URLSearchParams(window.location.search);
    let code = url_parameters.get("code");

    if (code) {
      getToken(code).then(token => {
        valid_token.save(token);

        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        const updated_url = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updated_url);
      });
    }

    if (valid_token.access_token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const initiateSpotifyAuthorization = async () => {
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
  };

  const getToken = async (code) => {
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
    return await response.json();
  };

  const refreshToken = async () => {
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
    return await response.json();
  };

  const getUserData = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + valid_token.access_token 
      },
    });

    return await response.json();
  };

  const getTopData = async (top_data_type, time_range) => {
    const data_parameters = {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + valid_token.access_token 
      },
    };
    const response = await fetch(`https://api.spotify.com/v1/me/top/${top_data_type}?time_range=${time_range}&limit=50`, data_parameters);
    return await response.json();
  };

  const SpotifyLogin = async () => {
    await initiateSpotifyAuthorization();
  };

  const LogOut = async () => {
    localStorage.clear();
    window.location.href = REDIRECT_URL; 
  }

  return (
    <SpotifyAuthContext.Provider value={{ loggedIn, initiateSpotifyAuthorization, getUserData, getTopData, SpotifyLogin }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export const useSpotifyAuth = () => {
  return useContext(SpotifyAuthContext);
};
