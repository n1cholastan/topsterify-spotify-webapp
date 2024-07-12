import logo from "../assets/Logo.svg";
import black_star from "../assets/black_star.svg";
import { NavLink } from "react-router-dom";

function NoPage() {
    return (
        <div className="flex w-screen h-screen bg-white justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/2">
                <img src={black_star} className="m-10 spin" alt="Loading icon" />
                <img src={logo} className="w-1/3 pb-5" alt="Topsterify logo" />
                <h1 className="text-xl md:text-2xl lg:text-4xl text-black font-inter font-bold mb-10 text-center">
                    sorry, this page does not exist
                </h1>
                <div>
                    <NavLink to="/">
                        <button className="transition-colors duration-300 bg-green px-10 py-5 md:px-10 md:py-0 md:h-16 lg:h-20 rounded-full text-black font-bold text-2xl md:text-lg lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping">
                            go back
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NoPage;
