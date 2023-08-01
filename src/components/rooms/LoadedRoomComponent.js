import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import Link from "next/link"
import SongCard from "../shared/SongCard"
import { io } from "socket.io-client"
import { localStorageGet } from "@/utils/localStorage"

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
    useEffect(() => {
        const userId = localStorageGet('user-id')
        const socket = io(process.env.NEXT_PUBLIC_BACKEND);
        socket.on("connect", () => {
            console.log("Connected to socket server")
        });
        socket.emit('join-room', userId, roomInfo.auxpartyId)

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
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
                        <SongCard song={songs[0]} />
                    </div>
                    <div className={pcn('__queue-section')}>
                        <div className={pcn('__subtitle')}>
                            queue
                        </div>
                        <div className={pcn('__queue')}>
                            {songs.map((song, index) =>
                                <SongCard key={index} song={song} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={pcn('__button-section')}>
                    <button className={pcn('__add-to-queue')}>
                        add to queue
                    </button>
                </div>
            </div>
        </div>
    )
}