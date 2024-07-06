import { useSortingContext } from "../contexts/SortingContext";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";
import { useEffect } from "react";

function SortingBar({page}) {
    return (
        <div className="flex gap-5 max-w-screen justify-center">
            <div className=" bg-black py-3 rounded-full w-1/6 flex justify-center">
                <h1 className="text-white text-4xl font-inter font-bold self-center">top {page}</h1>
            </div>
            <div className=" bg-black py-3 px-3 rounded-full w-1/3">
                <SortingButtons page={page}/>
            </div>
        </div>
    )
}

function SortingButtons({ page }) {
    const { activeSort, setActiveSort, setArtistsData, setTracksData, dataLoading, setDataLoading } = useSortingContext();
    const { getTopData } = useSpotifyAuth()


    async function buttonClick(index) {
        setDataLoading(true)
        setActiveSort(index);
        const time_ranges = {
            1: "short_term",
            2: "medium_term",
            3: "long_term"
        };
        const time_range = time_ranges[index];
        const top_data_type = page === "artists" ? "artists" : "tracks";

        const data = await getTopData(top_data_type, time_range);
        console.log(data)
        console.log(data.items[0].external_urls.spotify)
        if (page === "artists") {
            setArtistsData(data.items)
        } else if (page === "tracks") {
            setTracksData(data.items)
        }
        setDataLoading(false)
    }


    function buttonClasses(index) {
        return `w-1/2 text-2xl font-inter font-bold rounded-full p-2 transition-colors duration-300 ${activeSort === index ? "bg-white text-black" : "bg-black text-white hover:bg-grey"}`;
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