import React, { useEffect, useCallback, useState } from "react"
import { cn, getPCN } from "@/utils/classes"
import Link from "next/link"
import SongCard from "../shared/SongCard"
import { io } from "socket.io-client"
import SpotifySearch from "../shared/SpotifySearch"
import constants from "@/utils/constants"
import { getUserId } from "@/utils/userId"
import { parse } from "@/utils/json"
import useSpotifyPlaylists from "@/hooks/useSpotifyPlaylists"
import useUser from "@/hooks/useUser"
import useSongs from "@/hooks/useSongs"

const className = 'loaded-room-component'
const pcn = getPCN(className)

export default function LoadedRoomComponent({ ownerInfo, roomInfo }) {
    const { addSongToPlaylist } = useSpotifyPlaylists()
    const { updateAccessToken } = useUser()
    const { getSongByAuxpartyId } = useSongs()

    const [panelOpen, setPanelOpen] = useState(false)
    const [owner, setOwner] = useState(ownerInfo)
    const [room, setRoom] = useState(roomInfo)
    const [deletePanel, setDeletePanel] = useState(false)
    const [songs, setSongs] = useState([])

    const socket = io(constants.CORE_API_ORIGIN)
    const userId = getUserId()


    useEffect(() => {
        async function fetchSongData() {
            const existingQueue = parse(room.queue)
            if (existingQueue) {
                existingQueue.forEach(async (song) => {
                    const songData = await getSongByAuxpartyId(song)
                    if (songData) {
                        setSongs([...songs, songData])
                    }
                })
            }
        }
        fetchSongData()
        if (!userId || !room.auxpartyId) { return }
        socket.emit('joinRoom', userId, room.auxpartyId)
        socket.on('accessTokenUpdated', (updatedToken) => {
            setOwner((prevInfo) => ({
                ...prevInfo,
                accessToken: updatedToken,
            }))
        })
        socket.on('roomDeleted', () => {
            window.location.href = '/rooms'
        })
        socket.on('songAdded', async (song) => {
            setSongs([...songs, song])
            const response = await addSongToPlaylist(ownerInfo.accessToken, ownerInfo.refreshToken, roomInfo.playlistId, song)
            const newAccessToken = response.newAccessToken
            if (newAccessToken) {
                updateAccessToken(ownerInfo.auxpartyId, newAccessToken)
            }
        })
        return () => {
            socket.off('accessTokenUpdated')
            socket.off('roomDeleted')
            socket.off('songAdded')
            socket.off('pong')
            socket.disconnect()
        }
    }, [])

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
                        {songs[0] && <SongCard song={songs[0]} socket={socket} roomInfo={roomInfo} />}
                    </div>
                    <div className={pcn('__queue-section')}>
                        <div className={pcn('__subtitle')}>
                            queue
                        </div>
                        <div className={pcn('__queue')}>
                            {songs.slice(1).map((song, index) =>
                                <SongCard key={index} song={song} socket={socket} roomInfo={roomInfo}/>
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