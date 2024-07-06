import logo from '../assets/Logo.svg';
import profile_pic from "../assets/ph_icon.jpg";
import { useSpotifyAuth } from '../contexts/SpotifyAuth';
import { NavLink, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function NavBar() {
    const { userData } = useSpotifyAuth();
    const location = useLocation();
    const responsive = {
        mobile: {
            breakpoint: { max: 767, min: 0},
            items: 1
        }
    }


    return (
    <div className='flex flex-col max-w-screen'>
        <div className="flex flex-row justify-between max-w-screen my-5">
            <NavLink to="/home" className="w-1/2 md:w-1/4 lg:w-3/12 2xl:w-2/12 self-center">
                <img src={logo} className="w-fit"></img>
            </NavLink>
            <div className='hidden md:block w-fit self-center'>
                {location.pathname !== "/home" && (
                <div className="flex flex-row lg:gap-12 xl:gap-24 md:gap-7 max-w-fit self-center">
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
            </div>
            <div className="self-center min-w-fit">
                <ProfileCorner />
            </div>
        </div>
        {location.pathname !== "/home" && (
            <div className='md:hidden mb-10 mt-2 flex-row flex justify-around'>
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
    </div>
    )
};

function ProfileCorner() {
    const { SpotifyLogout } = useSpotifyAuth()

    return (
        <div className="min-w-1/2 md:min-w-fit flex flex-row justify-around md:gap-1 lg:gap-3">
          <div className="hidden md:block md:w-14 md:h-14 lg:w-16 lg:h-16 overflow-hidden rounded-full group relative self-center">
            <img src={profile_pic} className="object-cover w-full h-full group-hover:brightness-50"></img>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-sm font-inter font-bold">options</button>
            </div>
          </div>
          <div className="bg-green rounded-full md:bg-transparent md:block flex flex-row w-fit items-center px-2 py-2 self-center">
            <div className="md:hidden w-10 h-10 aspect-square overflow-hidden rounded-full group relative">
                <img src={profile_pic} className="object-cover w-full h-full"></img>
                
            </div>
            <button onClick={SpotifyLogout} className="mx-2 lg:my-0 transition-colors duration-300 md:bg-green md:px-6 lg:px-10 lg:py-3 md:h-14 lg:h-16 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl w-fit md:hover:bg-black md:hover:text-white focus:animate-ping ">
                log out
            </button>
          </div>
        </div>

    )
}


function SkinnyButton({ linkto, buttontext }) {
    return (
        <div>
            <NavLink
                to={linkto}
                className={({ isActive }) =>
                    `px-5 sm:px-10 sm:text-xl md:px-6 lg:px-10 py-4 rounded-full font-bold md:text-lg lg:text-xl xl:text-2xl w-fit transition-colors duration-300 ease-in-out ${
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