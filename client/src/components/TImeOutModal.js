export default function TimeOutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            
            <div className="relative bg-white p-6 rounded-3xl w-full max-w-md z-10">
                <h2 className="text-2xl text-black font-inter font-bold mb-2 text-center">token refresh failed :(</h2>
                <p className="text-xl mb-4 text-black font-inter font-semibold text-center">please log back in</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="mx-2 lg:my-0 transition-colors duration-300 bg-green px-6 lg:px-10 lg:py-3 h-14 lg:h-16 rounded-full text-black group-hover:text-white font-bold md:text-lg lg:text-xl xl:text-2xl w-fit md:hover:bg-black md:hover:text-white focus:animate-ping ">
                        close
                    </button>
                </div>
            </div>
        </div>
    );
}