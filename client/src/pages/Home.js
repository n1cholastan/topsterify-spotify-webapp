import logo from '../assets/Logo.svg';
import star from "../assets/star.svg";

function Home() {
    return <LandingPage />;
};

function LandingPage() {
    return (
      <div className="">
        <img src={logo} className=""></img>
        <h2 className="font-bold font-inter text-2xl">powered by spotify</h2>
        <LogInButton className="" />
        <img src={star} className="absolute -z-10"></img>
      </div>
    )
  }

function LogInButton() {
return (
    <div>
    <button onClick={SpotifyLogin} className="bg-green px-10 py-5 rounded-3xl text-black font-bold text-2xl w-fit">
        log in
    </button>
    </div>
)
}

export default Home;