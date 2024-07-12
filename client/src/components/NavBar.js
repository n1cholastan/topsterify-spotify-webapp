import logo from "../assets/Logo.svg";
import placeholder_pic from "../assets/ph_icon.png";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    return (
        <div className="flex flex-col max-w-screen">
            <div className="flex flex-row justify-between max-w-screen my-5">
                <NavLink
                    to="/home"
                    className="w-1/2 md:w-1/4 lg:w-3/12 2xl:w-2/12 self-center"
                >
                    <img src={logo} className="w-fit" alt="Topsterify Logo" />
                </NavLink>
                <div className="hidden md:block w-fit self-center">
                    {location.pathname !== "/home" && (
                        <div className="flex flex-row gap-7 lg:gap-12 xl:gap-24 max-w-fit self-center">
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
                <div className="md:hidden mb-10 mt-5 sm:mt-2 flex-row flex justify-around">
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
    );
}

function ProfileCorner() {
    const { SpotifyLogout, userData } = useSpotifyAuth();
    const userImage = userData?.images?.[0]?.url || placeholder_pic;

    return (
        <div className="flex flex-row items-center justify-around md:gap-1 lg:gap-3">
            <div className="hidden md:block w-14 h-14 lg:w-16 lg:h-16 overflow-hidden rounded-full self-center">
                <img
                    src={userImage}
                    className="object-cover w-full h-full"
                    alt="User Profile"
                />
            </div>
            <div className="bg-green rounded-full md:bg-transparent flex flex-row items-center px-2 py-2 hover:bg-black group md:hover:bg-transparent transition-colors duration-300 ease-in-out">
                <div className="md:hidden w-10 h-10 aspect-square overflow-hidden rounded-full group relative">
                    <img
                        src={userImage}
                        className="object-cover w-full h-full"
                        alt="User Profile"
                    />
                </div>
                <button
                    onClick={SpotifyLogout}
                    className="mx-2 lg:my-0 transition-colors duration-300 md:bg-green md:px-6 lg:px-10 lg:py-3 md:h-14 lg:h-16 rounded-full text-black group-hover:text-white font-bold md:text-lg lg:text-xl xl:text-2xl w-fit md:hover:bg-black md:hover:text-white focus:animate-ping"
                >
                    log out
                </button>
            </div>
        </div>
    );
}

function SkinnyButton({ linkto, buttontext }) {
    return (
        <div>
            <NavLink
                to={linkto}
                className={({ isActive }) =>
                    `px-5 sm:px-10 md:px-6 lg:px-10 py-4 rounded-full font-bold sm:text-xl md:text-lg lg:text-xl xl:text-2xl w-fit transition-colors duration-300 ease-in-out ${
                        isActive
                            ? "bg-black text-white"
                            : "bg-green text-black hover:bg-black hover:text-white"
                    }`
                }
            >
                {buttontext}
            </NavLink>
        </div>
    );
}

export default NavBar;
