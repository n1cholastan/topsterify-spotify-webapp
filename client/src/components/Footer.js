import logo from '../assets/Logo.svg';

function Footer({ onAboutClick, onPPClick, onToSClick }) {
  return (
    <div className="bg-green w-screen text-black py-4 rounded-t-3xl flex flex-col items-center">
      <div className="w-4/12 md:w-2/12 mt-5 text-center">
        <p className="font-inter font-bold">&copy; {new Date().getFullYear()}</p>
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex my-3 sm:gap-6 justify-center items-center w-full">
        <FooterButton onClick={onAboutClick} buttonText="about" />
        <FooterButton onClick={onToSClick} buttonText="terms of service" />
        <FooterButton onClick={onPPClick} buttonText="privacy policy" />
      </div>
    </div>
  );
}

function FooterButton({ buttonText, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-xs sm:text-sm md:text-base px-3 md:px-5 py-2 rounded-full font-bold transition-colors duration-300 ease-in-out bg-green text-black hover:bg-black hover:text-white"
    >
      {buttonText}
    </button>
  );
}

export default Footer;
