import React, { useEffect, useState } from "react"
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
    const socket = io(process.env.NEXT_PUBLIC_BACKEND);
    const userId = localStorageGet('user-id')

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to socket server");
        });
        if (userId && roomInfo) {
            socket.emit('join-room', userId, roomInfo.auxpartyId);
        }
        return () => {
            socket.off('connect');
        };
    }, []);

    function handleClick() {
        socket.emit('add-song', userId, 'Hello, everyone in the room!');
        socket.on('song-added', (data) => {
            console.log('Received message:', data.song, 'from user:', data.user);
        })
    }

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
                    <button className={pcn('__add-song')} onClick={handleClick}>
                        add song
                    </button>
                </div>
            </div>
        </div>
    )
}