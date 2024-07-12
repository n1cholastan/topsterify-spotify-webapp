import NavBar from "../components/NavBar";
import SortingBar from "../components/SortingBar";
import placeholder from "../assets/ph_image.png";
import { useSortingContext } from "../contexts/SortingContext";
import LoadingWheel from "../components/LoadingWheel";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Artist() {
    return (
        <div className="bg-white md:mx-5 lg:mx-7 flex flex-col">
            <div className="mx-5 md:mx-0">
                <NavBar />
            </div>
            <SortingBar page="artists" />
            <ArtistsTray />
            <ScrollToTopButton />
        </div>
    );
}

function ArtistsTray() {
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
                    pt-12 
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
                <ArtistsGrid />
            </div>
        </div>
    );
}

function ArtistsGrid() {
    const { artistsData } = useSortingContext();

    if (!artistsData) {
        return (
            <div className="flex justify-center items-center h-40 text-white text-md sm:text-xl font-inter font-bold">
                <p>sorry, no top artists information available.</p>
            </div>
        );
    }

    return (
        <div className="
            grid 
            grid-cols-3 
            gap-1 
            md:gap-2 
            p-1 
            md:p-2 
            mt-2 
            md:mt-0
        ">
            {artistsData.map((artist, i) => (
                <ArtistCard
                    key={artist.id}
                    album_cover={artist.images[0]?.url || placeholder}
                    artist_name={artist.name}
                    index={i + 1}
                    artist_link={artist.external_urls.spotify}
                />
            ))}
        </div>
    );
}

function ArtistCard({ album_cover, artist_name, index, artist_link }) {
    return (
        <div className="p-2 md:p-5 relative">
            <a href={artist_link} className="block">
                <div className="
                    relative 
                    w-full 
                    aspect-square 
                    group 
                    overflow-hidden 
                    rounded-3xl
                ">
                    <img
                        src={album_cover}
                        alt={artist_name}
                        className="
                            w-full 
                            h-full 
                            object-cover 
                            transition-all 
                            duration-300 
                            ease-in-out 
                            group-hover:brightness-50
                        "
                    />
                    <div className="
                        absolute 
                        inset-0 
                        flex 
                        items-center 
                        justify-center 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300 
                        ease-in-out
                    ">
                        <p className="
                            text-white 
                            text-sm 
                            md:text-lg 
                            font-bold
                        ">
                            open in Spotify
                        </p>
                    </div>
                </div>
            </a>
            <div className="flex mt-2 md:mt-2">
                <h4 className="
                    font-inter 
                    font-bold 
                    text-white 
                    text-xs 
                    sm:text-sm 
                    md:text-base 
                ">
                    {index}.
                </h4>
                <h4 className="
                    font-inter 
                    font-bold 
                    text-white 
                    text-xs 
                    sm:text-sm 
                    md:text-base  
                    ml-1
                ">
                    {artist_name}
                </h4>
            </div>
        </div>
    );
}

export default Artist;
