import './App.css';
import styles from "./index.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import NoPage from './pages/NoPage';
import Login from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { useSpotifyAuth } from './contexts/SpotifyAuth';
import LoadingWheel from './components/LoadingWheel';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import PPModal from './components/PPModal';
import ToSModal from './components/ToSModal';

function App() {
  const { loggedIn, loading } = useSpotifyAuth();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isToSModalOpen, setIsToSModalOpen] = useState(false);
  const [isPPModalOpen, setIsPPModalOpen] = useState(false);
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
        <Footer onAboutClick={() => setIsAboutModalOpen(true)} onToSClick={() => setIsToSModalOpen(true)} onPPClick={() => setIsPPModalOpen(true)} />
        <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
        <ToSModal isOpen={isToSModalOpen} onClose={() => setIsToSModalOpen(false)} />
        <PPModal isOpen={isPPModalOpen} onClose={() => setIsPPModalOpen(false)} />
      </div>
    </Router> 
  );
}

export default App;
