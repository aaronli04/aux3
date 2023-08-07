import React, { useState, useCallback } from 'react';
import { GoSearch } from 'react-icons/go';
import { getPCN } from "@/utils/classes";
import useSpotifyTracks from '@/hooks/useSpotifyTracks';
import AddSongCard from './AddSongCard';

const className = 'spotify-search';
const pcn = getPCN(className)

export default function SpotifySearch({ accessToken, socket }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const { searchTrack } = useSpotifyTracks();

    const handleEnterKey = useCallback(async (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
            const results = await searchTrack(accessToken, event.target.value)
            setFilteredItems(results);
        }
    })

    const renderSearchResults = useCallback(() => (
        <div className={pcn('__search-results')}>
            {filteredItems && filteredItems.map((item, index) =>
                <AddSongCard key={index} song={item} socket={socket} />
            )}
        </div>
    ), [filteredItems])

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__searchbar')}>
                    <GoSearch className={pcn('__search-icon')} size={25} />
                    <input className={pcn('__search-text')} placeholder='Search and press enter' onKeyDown={handleEnterKey} />
                </div>
                <div className={pcn('__separator')} />
                {renderSearchResults()}
            </div>
        </div>
    )
}