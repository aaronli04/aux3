import React, { useState, useCallback } from 'react';
import { GoSearch } from 'react-icons/go';
import { getPCN } from "@/utils/classes";
import useSpotifyTracks from '@/hooks/useSpotifyTracks';
import AddSongCard from './AddSongCard';
import updateAccessToken from '@/utils/spotify/updateAccessToken';

const className = 'spotify-search';
const pcn = getPCN(className)

export default function SpotifySearch({ ownerInfo, roomInfo, socket }) {
    const [filteredItems, setFilteredItems] = useState([])
    const { searchTrack } = useSpotifyTracks()

    const accessToken = ownerInfo.accessToken
    const refreshToken = ownerInfo.refreshToken
    const ownerId = ownerInfo.auxpartyId

    const handleEnterKey = useCallback(async (event) => {
        if (event.key === 'Enter') {
            const response = await searchTrack(accessToken, refreshToken, event.target.value)
            setFilteredItems(response.results)
            let newAccessToken = response.newAccessToken
            if (newAccessToken) {
                updateAccessToken(socket, ownerId, newAccessToken)
            }
        }
    })

    const renderSearchResults = useCallback(() => (
        <div className={pcn('__search-results')}>
            {filteredItems && filteredItems.map((item, index) =>
                <AddSongCard key={index} song={item} socket={socket} roomInfo={roomInfo} ownerInfo={ownerInfo} />
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