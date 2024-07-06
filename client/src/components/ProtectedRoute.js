import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";

function ProtectedRoute({ children }) {
    const { loggedIn } = useSpotifyAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
    }, [loggedIn, navigate]);

    return loggedIn ? children : null;

}

export default ProtectedRoute;

