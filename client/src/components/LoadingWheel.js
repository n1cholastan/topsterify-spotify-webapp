import star from "../assets/star.svg"

function LoadingWheel() {
    return (
        <div className="flex flex-col justify-center align-middle w-fit h-fit mt-10">
            <img 
            src={star} 
            className= "w-1/3 spinfast self-center mb-5"
            ></img>
            <h2 className="w-fit text-2xl font-inter font-semibold text-green text-center self-center">loading</h2>
        </div>
    )
}

export default LoadingWheel