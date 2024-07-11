import logo from '../assets/Logo.svg';
function Footer({ onAboutClick, onPPClick, onToSClick }) {
    return (
     <div className="bg-green w-screen text-black py-4 rounded-t-3xl flex flex-col items-center">
        <div className="w-2/12 mb-5">
            <p className="font-inter font-bold max-w-fit m-auto">&copy; {new Date().getFullYear()}</p>
            <img src={logo} className=""></img>
        </div>
      <div className="flex my-3 sm:gap-6 justify-center items-center w-screen">
        <FooterButton onClick={onAboutClick} buttontext="about"/>
        <FooterButton onClick={onToSClick} buttontext="terms of service"/>
        <FooterButton onClick={onPPClick} buttontext="privacy policy"/>
      </div>
      
    </div>
    )
}

function FooterButton({ buttontext, onClick }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="text-xs sm:text-sm md:text-base px-3 md:px-5 py-2 rounded-full font-bold transition-colors duration-300 ease-in-out bg-green text-black hover:bg-black hover:text-white">
                {buttontext}
            </ button>
        </div>
    )
};


export default Footer