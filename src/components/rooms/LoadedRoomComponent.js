import React, { useEffect, useCallback, useState } from "react"
import { cn, getPCN } from "@/utils/classes"
import Link from "next/link"
import SongCard from "../shared/SongCard"
import { io } from "socket.io-client"
import { localStorageGet } from "@/utils/localStorage"
import SpotifySearch from "../shared/SpotifySearch"
import constants from "@/utils/constants"

const className = 'loaded-room-component'
const pcn = getPCN(className)

const songs = [
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
    {
        name: 'ball w/o you',
        image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        artist: '21 Savage',
        votes: 123
    },
]

export default function LoadedRoomComponent({ ownerInfo, roomInfo }) {
    const [panelOpen, setPanelOpen] = useState(false)
    const [websocket, setWebsocket] = useState(null)

    const socket = io(constants.CORE_API_ORIGIN);
    const userId = localStorageGet('user-id')

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to socket server");
        });
        if (!userId || !roomInfo.auxpartyId) { return; }
        socket.emit('join-room', userId, roomInfo.auxpartyId);
        setWebsocket(socket);
        return () => {
            socket.off('connect');
        };
    }, []);

    const renderPanel = useCallback(() => (
        <div className={panelOpen ? pcn('__panel'): cn(pcn('__panel'), 'hidden')}>
            <div className={pcn('__title')}>
                search songs
            </div>
            <SpotifySearch />
            <button className={pcn('__close-button')} onClick={() => setPanelOpen(false)}>
                return to queue
            </button>
        </div>
    ), [panelOpen])

    const renderContentBodyComp = useCallback(() => (
        <div className={panelOpen ? cn(pcn('__content-body'), 'hidden'): pcn('__content-body')}>
            <div className={pcn('__name')}>
                {roomInfo.name}
            </div>
            <Link href={ownerInfo.spotifyExternalLink} className={pcn('__link')}>
                {ownerInfo.spotifyDisplayName}
            </Link>
            <div className={pcn('__body-section')}>
                <div className={pcn('__now-playing')}>
                    <div className={pcn('__subtitle')}>
                        now playing
                    </div>
                    <SongCard song={songs[0]} socket={socket} />
                </div>
                <div className={pcn('__queue-section')}>
                    <div className={pcn('__subtitle')}>
                        queue
                    </div>
                    <div className={pcn('__queue')}>
                        {songs.map((song, index) =>
                            <SongCard key={index} song={song} socket={socket} />
                        )}
                    </div>
                </div>
            </div>
            <div className={pcn('__button-section')}>
                <button className={pcn('__add-song')} onClick={() => setPanelOpen(true)}>
                    add song
                </button>
            </div>
        </div>
    ), [songs, panelOpen])

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                {renderPanel()}
                {renderContentBodyComp()}
            </div>
        </div>
    )
}