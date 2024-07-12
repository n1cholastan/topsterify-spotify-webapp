import black_star from "../assets/black_star.svg";

function LoadingWheel() {
  return (
    <div className="bg-green flex flex-col justify-center items-center w-fit h-fit mt-10 rounded-full py-6 px-10">
      <img 
        src={black_star} 
        className="w-1/2 spinfast mt-5 mb-2"
        alt="Loading"
      />
      <h2 className="text-lg font-inter font-semibold text-black text-center p-2">loading</h2>
    </div>
  );
}

export default LoadingWheel;
