import { useSortingContext } from "../contexts/SortingContext";
import { useSpotifyAuth } from "../contexts/SpotifyAuth";
import { useEffect, useCallback, useMemo } from "react";

function SortingBar({ page }) {
    return (
        <div className="flex md:gap-5 max-w-screen justify-center">
            <div className="
                bg-black 
                py-3 
                rounded-full 
                md:w-1/5 
                lg:w-1/6 
                md:flex 
                justify-center 
                hidden
            ">
                <h1 className="
                    text-white 
                    md:text-xl 
                    lg:text-2xl 
                    xl:text-3xl 
                    font-inter 
                    font-bold 
                    self-center
                ">
                    top {page}
                </h1>
            </div>
            <div className="
                bg-black 
                sm:py-3 
                sm:px-3 
                px-2 
                py-2 
                rounded-full 
                w-full 
                md:w-7/12 
                lg:w-1/2 
                xl:w-1/3 
                mx-5 
                md:mx-0
            ">
                <SortingButtons page={page} />
            </div>
        </div>
    )
}

function SortingButtons({ page }) {
    const { 
        activeSort, 
        setActiveSort, 
        setArtistsData, 
        setTracksData, 
        setDataLoading, 
        cache, 
        setCache 
    } = useSortingContext();
    const { getTopData } = useSpotifyAuth();

    const time_ranges = useMemo(() => ({
        1: "short_term",
        2: "medium_term",
        3: "long_term"
    }), []);

    const top_data_type = useMemo(() => page === "artists" ? "artists" : "tracks", [page]);

    const buttonClick = useCallback(async (index) => {
        setActiveSort(index);
        const cacheKey = `${page}-${index}`;

        if (cache[cacheKey]) {
            if (page === "artists") {
                setArtistsData(cache[cacheKey]);
            } else if (page === "tracks") {
                setTracksData(cache[cacheKey]);
            }
            return;
        }

        setDataLoading(true);

        try {
            const time_range = time_ranges[index];
            const data = await getTopData(top_data_type, time_range);

            setCache(prevCache => ({
                ...prevCache,
                [cacheKey]: data.items
            }));

            if (page === "artists") {
                setArtistsData(data.items);
            } else if (page === "tracks") {
                setTracksData(data.items);
            }
        } catch (error) {
            console.error("Failed to fetch top data:", error);
        } finally {
            setDataLoading(false);
        }
    }, [getTopData, page, setActiveSort, setArtistsData, setTracksData, setDataLoading, cache, setCache, time_ranges, top_data_type]);

    useEffect(() => {
        buttonClick(activeSort);
    }, [activeSort, buttonClick]);

    const buttonClasses = (index) => `
        w-1/2 
        text-base 
        sm:text-xl 
        md:text-xl 
        lg:2xl 
        font-inter 
        font-bold 
        rounded-full 
        p-2 
        transition-colors 
        duration-300 
        ${activeSort === index ? "bg-white text-black" : "bg-black text-white hover:bg-grey"}
    `;

    return (
        <div className="flex gap-1 justify-between">
            <button
                className={buttonClasses(1)}
                onClick={() => buttonClick(1)}
                disabled={activeSort === 1}
            >
                4 weeks
            </button>
            <button
                className={buttonClasses(2)}
                onClick={() => buttonClick(2)}
                disabled={activeSort === 2}
            >
                6 months
            </button>
            <button
                className={buttonClasses(3)}
                onClick={() => buttonClick(3)}
                disabled={activeSort === 3}
            >
                12 months
            </button>
        </div>
    )
}

export default SortingBar;
