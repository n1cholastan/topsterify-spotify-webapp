import { createContext, useState, useContext } from "react";

const SortingContext = createContext()

export function useSortingContext() {
    return useContext(SortingContext);
}

export function SortingProvider({ children }) {
    const [activeSort, setActiveSort] = useState(1);
    const [artistsData, setArtistsData] = useState([]);
    const [tracksData, setTracksData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [cache, setCache] = useState({});

    return (
        <SortingContext.Provider value={{ activeSort, setActiveSort, artistsData, tracksData, setArtistsData, setTracksData, dataLoading, setDataLoading, cache, setCache}}>
            {children}
        </SortingContext.Provider>
    );
}
