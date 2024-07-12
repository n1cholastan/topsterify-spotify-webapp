import star from "../assets/star.svg";
import black_star from "../assets/black_star.svg";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div>
      <div className="
          bg-white 
          mx-5 
          lg:mx-7 
          h-screen 
          flex 
          flex-col 
          justify-between 
          md:justify-start
      ">
        <NavBar />
        <div className="
            flex-grow 
            md:flex-grow-0 
            md:mt-56 
            flex 
            flex-col 
            items-center 
            md:items-start 
            justify-center
        ">
          <div className="z-20">
            <WelcomeText />
          </div>
        </div>
        <div className="
            flex 
            flex-col 
            self-center 
            md:self-start  
            sm:flex-row 
            gap-5 
            sm:gap-10 
            mb-20 
            md:mt-5 
            md:mb-0 
            justify-center 
            md:justify-start
        ">
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
          <img 
            src={star} 
            className="
                hidden 
                md:block 
                md:w-5/12 
                lg:w-1/3 
                spin 
                md:absolute 
                md:right-24 
                lg:right-60 
                md:top-64 
                lg:top-52 
                z-10
            "
            alt="Decorative star"
          />
        </div>
      </div>
    </div>
  );
}

function WelcomeText() {
  const { userData } = useSpotifyAuth();
  const displayName = userData?.display_name || "";

  return (
    <div className="
        text-center 
        md:text-left 
        flex 
        flex-col
    ">
      <img 
        src={black_star} 
        className="
            w-1/8 
            md:hidden 
            item-center 
            m-auto 
            spin
        " 
        alt="Decorative black star"
      />
      <h1 className="
          font-bold 
          font-inter 
          text-black 
          text-3xl 
          md:text-5xl 
          lg:text-6xl 
          mt-5 
          pt-1 
          md:py-3
      ">
        hey{displayName ? ` ${displayName}.` : "."} 
      </h1>
      <h2 className="
          font-inter 
          text-black 
          text-3xl 
          md:text-5xl 
          lg:text-6xl 
          font-light 
          md:font-normal 
          pt-1 
          md:py-3
      ">
        what stats would you like to look at?
      </h2>
    </div>
  );
}

function NavButton({ linkto, buttontext }) {
  return (
    <div>
      <NavLink to={linkto}>
        <button 
          className="
              transition-colors 
              duration-300 
              bg-green 
              md:px-10 
              px-10 
              py-5 
              md:py-0 
              md:h-16 
              lg:h-20 
              rounded-full 
              text-black 
              font-bold 
              text-2xl 
              md:text-lg 
              lg:text-xl 
              xl:text-2xl 
              w-fit 
              hover:bg-black 
              hover:text-white 
              focus:animate-ping
          "
        >
          {buttontext}
        </button>
      </NavLink>
    </div>
  );
}

export default Home;
