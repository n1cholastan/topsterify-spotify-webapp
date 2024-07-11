export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white py-6 px-8 rounded-3xl w-11/12 md:w-3/4 lg:w-2/3 max-h-5/6 overflow-y-auto z-10">
        <h2 className="text-2xl text-black font-inter font-bold mb-4 text-center">
          About Topsterify
        </h2>
        <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold">
          Topsterify is a website that visualizes your listening habits using the Spotify Web API, developed solely by the music obsessive{' '}
          <a
            href="http://n1cholastan.github.io"
            className="underline hover:text-green"
          >
            Nicholas Tan
          </a>
        </p>
        <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold">
          Topsterify aims to make your music data easy to understand and enjoyable to explore, showcasing your top tracks and artists from three distinct time periods: the past 4 weeks, 6 months, and 12 months.
        </p>
        <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold">
          The listening data is taken straight from the Spotify web API. For the curious, Topsterify uses the{' '}
          <span className="font-bold">‘user-top-read user-read-email user-read-private’</span> scopes.
        </p>
        <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold">
          I plan on implementing new features like pie charts to visualize your favorite genres and tools to track changes in your most listened tracks and artists over time.
        </p>
        <p className="text-sm md:text-xl mb-4 text-black font-inter font-semibold">
          The repository for Topsterify is located{' '}
          <a
            href="https://github.com/n1cholastan/topsterify-spotify-webapp"
            className="underline hover:text-green"
          >
            here
          </a>, if you have any questions or requests, please{' '}
          <a
            href="http://n1cholastan.github.io#contact"
            className="underline hover:text-green"
          >
            contact me here
          </a>
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
