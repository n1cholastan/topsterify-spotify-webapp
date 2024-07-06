import { useSpotifyAuth } from "../contexts/SpotifyAuth"
import logo from '../assets/Logo.svg';
import star from "../assets/star.svg";

export default function Login() {
    return (
      <div>
        <div className="h-screen w-screen bg-white flex flex-col lg:justify-center justify-between pb-16">
          <div className="flex flex-col items-center flex-grow justify-center">
            <div className="h-fit self-center z-20 lg:1/4 xl:w-1/3">
              <img src={logo} className="w-fit lg:py-2 px-10 lg:px-6"></img>
              <div className="flex justify-between pl-10 lg:pl-6 md:mr-10">
                <h2 className="font-bold font-inter text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl">powered by spotify</h2>
                <div className="hidden md:block md:mt-2 lg:mt-0">
                  <LogInButton />
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden self-center">
            <LogInButton />
          </div>
        </div>
        <div>
          <img src={star} className= "lg:w-1/3 spin absolute lg:left-60 lg:top-52 z-10 w-3/4 top-28 left-12 md:top-24 md:w-1/2"></img>
        </div>
      </div>
    )
  }
  
  
function LogInButton() {
    const { SpotifyLogin } = useSpotifyAuth()

    return (
        <div>
        <button onClick={SpotifyLogin} className="transition-colors duration-300 bg-green px-10 py-5 rounded-full text-black font-bold text-2xl lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping ">
            log in
        </button>
        </div>
    )
}
