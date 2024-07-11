import NavBar from "../components/NavBar";
import { useSortingContext } from "../contexts/SortingContext";
import SortingBar from "../components/SortingBar";
import LoadingWheel from "../components/LoadingWheel";
import ScrollToTopButton from "../components/ScrollToTopButton";
import placeholder from "../assets/ph_image.png"

function Track() {
    return (
        <div className="
            bg-white 
            md:mx-5 
            min-h-screen 
            lg:mx-7 
            flex 
            flex-col
        ">
            <div className="mx-5 md:mx-0">
                <NavBar />
            </div>
            <SortingBar page="tracks" />
            <TracksTray />
            <ScrollToTopButton />
        </div>
    );
}

function TracksTray() {
    const { dataLoading } = useSortingContext();

    if (dataLoading) {
        return (
            <div className="flex justify-center">
                <div className="
                    bg-black 
                    w-full 
                    md:w-9/12 
                    lg:w-2/3 
                    xl:w-1/2 
                    rounded-3xl 
                    mt-8 
                    mb-12 
                    h-screen 
                    flex 
                    justify-center
                ">
                    <LoadingWheel />
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="
                bg-black 
                w-full 
                md:w-9/12 
                lg:w-2/3 
                xl:w-1/2 
                rounded-3xl 
                mt-8 
                mb-12
            ">
                <TracksList />
            </div>
        </div>
    );
}

function TracksList() {
    const { tracksData } = useSortingContext();

    if (!tracksData) {
        return (
            <div className="flex justify-center items-center h-40 text-white text-md sm:text-xl font-inter font-bold">
                <p>sorry, no top tracks information available.</p>
            </div>
        );
    }

    return (
        <div className="
            flex 
            flex-col 
            gap-5 
            py-7
        ">
            {tracksData.map((track, i) => {
                const artistNames = track.artists.map(artist => artist.name).join(', ');

                return (
                    <TracksCard
                        key={track.id} 
                        track_name={track.name}
                        album_cover={track.album.images[0]?.url || placeholder}
                        artist_name={artistNames}
                        index={i + 1}
                        track_link={track.external_urls.spotify}
                    />
                );
            })}
        </div>
    );
}

function TracksCard({ track_name, artist_name, album_cover, index, track_link }) {
    return (
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4
        ">
            <h1 className="
                font-inter 
                font-bold 
                text-3xl 
                text-white 
                pl-10 
                min-w-24 
                xl:min-w-32
            ">
                {index}.
            </h1>
            <a href={track_link} className="block w-1/4 h-1/4 sm:h-auto sm:w-1/6 md:w-1/6">
                <div className="
                    relative 
                    w-full 
                    h-full 
                    aspect-square 
                    group 
                    overflow-hidden 
                    rounded-lg
                ">
                    <img
                        src={album_cover}
                        alt={`Album cover of ${track_name} by ${artist_name}`}
                        className="
                            w-full 
                            h-full 
                            object-cover
                        "
                    />
                    <div className="
                        absolute 
                        inset-0 
                        flex 
                        items-center 
                        justify-center 
                        bg-black 
                        bg-opacity-50 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300 
                        ease-in-out
                    ">
                        <p className="
                            p-10 
                            text-white
                            text-xs 
                            md:text-sm 
                            font-bold
                        ">
                            play on Spotify
                        </p>
                    </div>
                </div>
            </a>
            <div className="
                flex 
                flex-col 
                sm:flex-row 
                justify-between 
                w-full 
                px-5
            ">
                <div className="w-fit sm:w-1/2">
                    <h2 className="
                        font-inter 
                        font-semibold 
                        text-sm 
                        sm:text-base 
                        md:text-sm 
                        lg:text-base 
                        xl:text-sm 
                        2xl:text-base 
                        text-white
                    ">
                        {track_name}
                    </h2>
                </div>
                <div className="w-fit sm:w-1/3">
                    <h2 className="
                        font-inter 
                        text-sm 
                        sm:text-base 
                        md:text-sm 
                        lg:text-base 
                        xl:text-sm 
                        2xl:text-base 
                        text-white
                    ">
                        {artist_name}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Track;
