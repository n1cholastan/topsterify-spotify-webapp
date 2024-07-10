import star from "../assets/star.svg"
import black_star from "../assets/black_star.svg";

function LoadingWheel() {
    return (
        <div className="bg-green flex flex-col justify-center align-middle w-fit h-fit mt-10 rounded-full py-6 px-10">
            <img 
            src={black_star} 
            className= "w-1/2 spinfast self-center mt-5 mb-2"
            ></img>
            <h2 className="w-fit text-lg font-inter font-semibold text-black text-center self-center p-2">loading</h2>
        </div>
        
    )
}

export default LoadingWheel