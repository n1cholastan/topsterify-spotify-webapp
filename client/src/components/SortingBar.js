import { useSortingContext } from "../contexts/SortingContext";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";
import { useEffect, useCallback } from "react";

function SortingBar({page}) {
    return (
        <div className="flex md:gap-5 max-w-screen justify-center">
            <div className=" bg-black py-3 rounded-full md:w-1/5 lg:w-1/6 md:flex justify-center hidden">
                <h1 className="text-white md:text-xl lg:text-2xl xl:text-3xl font-inter font-bold self-center">top {page}</h1>
            </div>
            <div className=" bg-black sm:py-3 sm:px-3 px-2 py-2 rounded-full w-full md:w-7/12 lg:w-1/2 xl:w-1/3 mx-5 md:mx-0 ">
                <SortingButtons page={page}/>
            </div>
        </div>
    )
}

function SortingButtons({ page }) {
    const { activeSort, setActiveSort, setArtistsData, setTracksData, dataLoading, setDataLoading } = useSortingContext();
    const { getTopData } = useSpotifyAuth()

    const buttonClick = useCallback(async (index) => {
        setDataLoading(true);
        setActiveSort(index);
        const time_ranges = {
            1: "short_term",
            2: "medium_term",
            3: "long_term"
        };
        const time_range = time_ranges[index];
        const top_data_type = page === "artists" ? "artists" : "tracks";

        const data = await getTopData(top_data_type, time_range);
        console.log(data);
        console.log(data.items[0].external_urls.spotify);
        if (page === "artists") {
            setArtistsData(data.items);
        } else if (page === "tracks") {
            setTracksData(data.items);
        }
        setDataLoading(false);
    }, [getTopData, page, setActiveSort, setArtistsData, setTracksData, setDataLoading]);

    useEffect(() => {
        buttonClick(activeSort);
    }, [activeSort, buttonClick]);


    function buttonClasses(index) {
        return `w-1/2 text-base sm:text-xl md:text-xl lg:2xl font-inter font-bold rounded-full p-2 transition-colors duration-300 ${activeSort === index ? "bg-white text-black" : "bg-black text-white hover:bg-grey"}`;
    }

    return (
        <div className="flex gap-1 justify-between">
            <button
                className={buttonClasses(1)}
                onClick={() => buttonClick(1)}
                disabled={activeSort === 1}
                >4 weeks
            </button>
            <button
                className={buttonClasses(2)}
                onClick={() => buttonClick(2)}
                disabled={activeSort === 2}
                >6 months
            </button>
            <button
                className={buttonClasses(3)}
                onClick={() => buttonClick(3)}
                disabled={activeSort === 3}
                >1 year
            </button>
        </div>
    )
}

export default SortingBar