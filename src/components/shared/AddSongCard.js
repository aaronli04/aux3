import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai"
import { getPCN } from "@/utils/classes";

const className = 'add-song-card'
const pcn = getPCN(className)

export default function AddSongCard({ song, socket, roomInfo }) {
    const roomId = roomInfo.auxpartyId

    const addSong = useCallback(() => {
        socket.emit('addSong', roomId, song)
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