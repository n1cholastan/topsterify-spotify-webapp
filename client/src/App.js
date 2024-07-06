import './App.css';
import styles from "./index.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import NoPage from './pages/NoPage';
import Login from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useSpotifyAuth } from './contexts/SpotifyAuth';
import LoadingWheel from './components/LoadingWheel';

function App() {
  const { loggedIn, loading } = useSpotifyAuth();
  if (loading) {
    return (
      <div className='h-screen w-screen bg-white flex align-middle items-center justify-center'>
        <LoadingWheel />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/artists" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
          <Route path="/tracks" element={<ProtectedRoute><Tracks /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
