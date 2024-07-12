export default function ErrorModal({ isOpen, onClose, errorText }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white p-6 rounded-3xl w-11/12 md:w-3/4 lg:w-1/3 z-10">
          <h1 className="text-md md:text-xl text-black font-inter font-bold mb-2 text-center lowercase">
            error:
          </h1>
          <h2 className="text-sm md:text-lg text-black font-inter font-semibold mb-8 ml-1 text-center lowercase">
            {errorText}
          </h2>
          <p className="text-sm md:text-lg mb-4 text-black font-inter font-semibold text-center">
            please log back in
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="transition-colors duration-300 bg-green px-6 lg:px-10 lg:py-3 h-14 lg:h-16 rounded-full text-black font-bold md:text-lg lg:text-xl xl:text-2xl hover:bg-black hover:text-white focus:animate-ping"
            >
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
  