import NavBar from "../components/NavBar";
import { useSpotifyAuth } from '../contexts/SpotifyAuth';
import { NavLink } from 'react-router-dom';
import { useSortingContext } from "../contexts/SortingContext";
import SortingBar from "../components/SortingBar";
import LoadingWheel from "../components/LoadingWheel";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Track() {
    return (
        <div className="bg-white mx-5 lg:mx-7 h-screen flex flex-col">
            <NavBar className="" />
            <SortingBar page="tracks" />
            <TracksTray />
            <ScrollToTopButton />
        </div>
    );
};

function TracksTray() {
    const { dataLoading } = useSortingContext()
    if (dataLoading) {
        return (
            <div className="flex justify-center ">
                <div className="bg-black w-1/2 rounded-t-3xl mt-8 h-screen flex justify-center">
                    <LoadingWheel />
                </div>
            </div>
    )}

    return (
        <div className="flex justify-center ">
            <div className="bg-black w-1/2 rounded-t-3xl mt-8">
                <TracksList />
            </div>
        </div>
    )
}
function TracksList() {
    const {tracksData} = useSortingContext()
    console.log(tracksData)
    return (
        <div className="flex flex-col gap-5 py-7">
            {tracksData.map((track, i) => {
                const artistNames = track.artists.map(artist => artist.name).join(', ');

                return (
                    <TracksCard
                        key={track.id} 
                        track_name={track.name}
                        album_cover={track.album.images[0].url} 
                        artist_name={artistNames}
                        index={i + 1}
                        track_link={track.external_urls.spotify}
                />
                )
            })}
        </div>
    )
}

function TracksCard({ track_name, artist_name, album_cover, index, track_link }) {
    return (
        <div className="flex flex-row">
            <h1 className="font-inter font-bold text-3xl text-white px-5 self-center min-w-20">{index}.</h1>
            <div className="relative w-1/12 aspect-square group overflow-hidden rounded-lg">
                    <img 
                        src={album_cover}
                        alt={`Album cover of ${track_name} by ${artist_name}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
            <div className="flex flex-row justify-between self-center w-full px-5">
                <div className="w-1/2 self-center">
                    <h2 className="font-inter font-semibold text-md text-white">{track_name}</h2>
                </div>
                <div className="w-1/3 self-center">
                    <h2 className="font-inter text-md text-white">{artist_name}</h2>
                </div>
            </div>
        </div>
    )
}


export default Track;