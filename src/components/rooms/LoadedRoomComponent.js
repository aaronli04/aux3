import React, { useEffect, useCallback, useState } from "react"
import { cn, getPCN } from "@/utils/classes"
import Link from "next/link"
import SongCard from "../shared/SongCard"
import { io } from "socket.io-client"
import SpotifySearch from "../shared/SpotifySearch"
import constants from "@/utils/constants"
import { getUserId } from "@/utils/userId"

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
    const [owner, setOwner] = useState(ownerInfo)
    const [room, setRoom] = useState(roomInfo)
    const [deletePanel, setDeletePanel] = useState(false)

    const socket = io(constants.CORE_API_ORIGIN)
    const userId = getUserId()

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to socket server")
        });
        if (!userId || !room.auxpartyId) { return }
        socket.emit('join-room', userId, room.auxpartyId)
        socket.on('access-token-updated', (updatedToken) => {
            setOwner((prevInfo) => ({
                ...prevInfo,
                accessToken: updatedToken,
            }))
        })
        socket.on('room-deleted', () =>{
            window.location.href = '/rooms'
        })
        return () => {
            socket.off('connect');
        };
    }, []);

    const deleteRoom = useCallback(() => {
        socket.emit('deleteRoom', room.auxpartyId)
    })

    const renderPanel = useCallback(() => (
        <div className={panelOpen ? pcn('__panel') : cn(pcn('__panel'), 'hidden')}>
            <div className={pcn('__title')}>
                search songs
            </div>
            <SpotifySearch ownerInfo={owner} roomInfo={room} socket={socket} />
            <button className={pcn('__close-button')} onClick={() => setPanelOpen(false)}>
                return to queue
            </button>
        </div>
    ), [panelOpen, owner])

    const renderContentBodyComp = useCallback(() => (
        <>
            <div className={deletePanel ? pcn('__delete-panel') : cn(pcn('__delete-panel'), 'hidden')}>
                <div className={pcn('__title')}>
                    delete room
                </div>
                <div className={pcn('__warning-message')}>
                    are you sure you want to delete this room? this action can&apos;t be undone
                </div>
                <div className={pcn('__button-section')}>
                    <button className={pcn('__cancel-button')} onClick={() => setDeletePanel(false)}>
                        cancel
                    </button>
                    <button className={pcn('__delete-button')} onClick={deleteRoom}>
                        delete room
                    </button>
                </div>
            </div>
            <div className={panelOpen || deletePanel ? cn(pcn('__content-body'), 'hidden') : pcn('__content-body')}>
                <div className={pcn('__name')}>
                    {room.name}
                </div>
                <Link href={owner.spotifyExternalLink} className={pcn('__link')}>
                    {owner.spotifyDisplayName}
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
                    <button className={userId === owner.auxpartyId ? pcn('__delete-room') : cn(pcn('__delete-room'), 'hidden')} onClick={() => setDeletePanel(true)}>
                        delete room
                    </button>
                </div>
            </div>
        </>
    ), [songs, panelOpen, deletePanel])

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                {renderPanel()}
                {renderContentBodyComp()}
            </div>
        </div>
    )
}