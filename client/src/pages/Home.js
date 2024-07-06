import logo from '../assets/Logo.svg';
import star from "../assets/star.svg";
import profile_pic from "../assets/ph_icon.jpg";
import { useSpotifyAuth } from '../contexts/SpotifyAuth';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Home() {

  return (
    <div className="mx-5 lg:mx-7 h-screen flex flex-col">
      <NavBar />
      <div className="justify-self-center mt-56 z-20">
        <WelcomeText />
      </div>
      <div className='flex flex-row gap-10 mt-5 '>
        <NavButton
          linkto="/artists"
          buttontext="top artists" 
        />
        <NavButton
          linkto="/tracks"
          buttontext="top tracks" 
        />
      </div>
      <div>
        <img src={star} className= "w-1/3 spin absolute right-60 top-52 z-10"></img>
      </div>
    </div>
  )
}



function WelcomeText() {
  const { userData } = useSpotifyAuth()
  return (
    <div className="">
      <h1 className="font-bold font-inter text-black text-6xl py-3">hey {userData.display_name}.</h1>
      <h2 className="font-inter text-black text-6xl font-normal py-3">what stats would you like to look at?</h2>
    </div>

  )
}
const LogOutButton = () => {
  const { SpotifyLogout } = useSpotifyAuth()

  return (
      <div>
      <button onClick={SpotifyLogout} className="transition-colors duration-300 bg-green px-10 py-5 h-20 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping ">
          log out
      </button>
      </div>
  )
}

function NavButton({ linkto, buttontext }) {
  return (
    <div>
        <NavLink to={linkto}>
          <button className="transition-colors duration-300 bg-green px-10 py-5 h-20 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping ">
              {buttontext}
          </button>
        </ NavLink>
      </div>
  )
}

export default Home;