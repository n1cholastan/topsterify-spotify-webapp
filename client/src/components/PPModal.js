export default function PPModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white py-6 px-8 rounded-3xl w-11/12 md:w-3/4 lg:w-2/3 max-h-5/6 overflow-y-auto z-10">
          <h2 className="text-2xl text-black font-inter font-bold mb-4 text-center">Privacy Policy</h2>
          <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold text-center">
            To Be Implemented
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="mx-2 lg:my-0 transition-colors duration-300 bg-green px-6 lg:px-10 lg:py-3 h-14 lg:h-16 rounded-full text-black group-hover:text-white font-bold md:text-lg lg:text-xl xl:text-2xl w-fit md:hover:bg-black md:hover:text-white focus:animate-ping"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  