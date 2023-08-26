import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai"
import { getPCN } from "@/utils/classes";
import useSpotifyPlaylists from "@/hooks/useSpotifyPlaylists";
import useUser from "@/hooks/useUser";

const className = 'add-song-card'
const pcn = getPCN(className)

export default function AddSongCard({ song, socket, roomInfo, ownerInfo }) {
    const { addSongToPlaylist } = useSpotifyPlaylists()
    const { updateAccessToken }  = useUser()
    const roomId = roomInfo.auxpartyId

    const addSong = useCallback(async () => {
        socket.emit('addSong', roomId, song)
        const response = await addSongToPlaylist(ownerInfo.accessToken, ownerInfo.refreshToken, roomInfo.playlistId, song)
        const newAccessToken = response.newAccessToken
        if (newAccessToken) {
            updateAccessToken(ownerInfo.auxpartyId, newAccessToken)
        }
    })

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <Image src={song.albumCover} alt='album cover' width={45} height={45} />
                <div className={pcn('__song-info')}>
                    <div className={pcn('__title')}>
                        {song.name}
                    </div>
                    <div className={pcn('__artist')}>
                        {song.artists}
                    </div>
                </div>
                <button className={pcn('__add-button')} onClick={addSong}>
                    <AiOutlinePlus size='30px'/>
                </button>
            </div>
        </div>
    )
}