import logo from '../assets/Logo.svg';
import profile_pic from "../assets/ph_icon.jpg";
import { useSpotifyAuth } from '../contexts/SpotifyAuth';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
    const { userData } = useSpotifyAuth();
    const location = useLocation();


    return (
      <div className="flex flex-row justify-between max-w-screen my-5 top-5">
        <NavLink to="/home">
            <img src={logo} className="w-2/3"></img>
        </NavLink>
        {location.pathname !== "/home" && (
        <div className="flex flex-row gap-10 w-1/3 self-center">
            <SkinnyButton
                linkto="/artists"
                buttontext="top artists" 
            />
            <SkinnyButton
                linkto="/tracks"
                buttontext="top tracks" 
            />
        </div>
        )}
        <div className="w-fit flex flex-row justify-around gap-5">
          <div className="w-20 h-20 overflow-hidden rounded-full group relative">
            <img src={profile_pic} className="object-cover w-full h-full group-hover:brightness-50"></img>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-md font-inter font-bold">options</button>
            </div>
          </div>
          <LogOutButton />
        </div>
      </div>
    )
};

const LogOutButton = () => {
    const { SpotifyLogout } = useSpotifyAuth()

    return (
        <div>
        <button onClick={SpotifyLogout} className="transition-colors duration-300 bg-green px-10 py-5 h-20 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping ">
            log out
        </button>
        </div>
    )
};

function SkinnyButton({ linkto, buttontext }) {
    return (
        <div>
            <NavLink
                to={linkto}
                className={({ isActive }) =>
                    `px-10 py-3 rounded-full font-bold md:text-lg lg:text-xl xl:text-2xl w-fit transition-colors duration-300 ease-in-out ${
                        isActive
                            ? "bg-black text-white "
                            : "bg-green text-black hover:bg-black hover:text-white"
                    }`
                }
            >
                {buttontext}
            </ NavLink>
        </div>
    )
};

export default NavBar;