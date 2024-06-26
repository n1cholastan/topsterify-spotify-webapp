import logo from '../assets/Logo.svg';
import star from "../assets/star.svg";
import { SpotifyLogin } from '../App';

function Home() {
    return <LandingPage />;
};

function LandingPage() {
  return (
    <div>
      <div className="h-screen w-screen bg-white flex align-middle justify-center">
        <div className=" h-fit self-center z-20 w-1/3">
          <img src={logo} className="w-fit"></img>
          <div className="flex justify-between mr-10">
            <h2 className="font-bold font-inter md:text-lg lg:text-xl xl:text-3xl">powered by spotify</h2>
            <LogInButton className="" />
          </div>
        </div>
      </div>
      <div>
        <img src={star} className= "w-1/3 spin absolute left-60 top-52 z-10"></img>
      </div>
    </div>
  )
}


function LogInButton() {
  return (
      <div>
      <button onClick={SpotifyLogin} className="bg-green px-10 py-5 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl w-fit hover:bg-black hover:text-white focus:animate-ping ">
          log in
      </button>
      </div>
  )
}

function LoggedInPage() {
  return <h1>Logged In</h1>;
}

export default Home;