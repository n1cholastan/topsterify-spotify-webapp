import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import SortingBar from "../components/SortingBar";
import ph_album from "../assets/ph_album.jpeg"
import { useSortingContext } from "../contexts/SortingContext";
import LoadingWheel from "../components/LoadingWheel";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Artist() {    
    return (
        <div className="bg-white mx-5 lg:mx-7 flex flex-col">
            <NavBar />
            <SortingBar page="artists" />
            <ArtistsTray />
            <ScrollToTopButton />
            
        </div>
    );
};



function ArtistsTray() {
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
                <ArtistsGrid />
            </div>
        </div>
    )
}

function ArtistsGrid() {
    const { artistsData } = useSortingContext();
    
    return (
        <div className="grid grid-cols-3 gap-2 p-2">
            {artistsData.map((artist, i) => (
                <ArtistCard
                    key={artist.id} 
                    album_cover={artist.images[0].url} 
                    artist_name={artist.name}
                    index = {i + 1}
                    artist_link = {artist.external_urls.spotify}
                />
            ))}
        </div>
    );
}


function ArtistCard({ album_cover, artist_name, index, artist_link }) {
    return (
        <div className="p-5 relative">
            <a href={artist_link} className="block">
                <div className="relative w-full aspect-square group overflow-hidden rounded-3xl">
                    <img 
                        src={album_cover} 
                        alt={`Artist photo of ${artist_name}`} 
                        className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <p className="text-white text-lg font-bold">open in Spotify</p>
                    </div>
                </div>
            </a>
            <div className="flex mt-2">
                <h4 className="font-inter font-bold text-white text-md">{index}.</h4>
                <h4 className="font-inter font-bold text-white text-md ml-1">{artist_name}</h4>
            </div>
        </div>
    );
}




export default Artist;


async function fetchTopArtists() {
    return (
      <div>
        {/*<button onClick={() => getTopData("artists", "long_term")} className="bg-green p-5 rounded-2xl text-white font-bold text-2xl w-1/4">
          Get Data
        </button>*/}
      </div>
    )
  }