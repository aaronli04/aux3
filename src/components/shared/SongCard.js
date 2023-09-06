import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { cn, getPCN } from "@/utils/classes";
import { getUserId } from "@/utils/userId";
import useVotes from "@/hooks/useVotes";

const className = 'song-card'
const pcn = getPCN(className)

export default function SongCard({ song, socket, roomInfo }) {
    const { getUserVoteBySong } = useVotes()

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const userId = getUserId()
    const roomId = roomInfo.auxpartyId
    const songId = song.auxpartyId

    useEffect(() => {
        async function fetchUserVote() {
            const userVote = await getUserVoteBySong(songId, userId)
            if (userVote === 1) {
                setDownvote(false)
                setUpvote(true)
            }
            else if (userVote === 0) {
                setDownvote(false)
                setUpvote(false)
            }
            else if (userVote === -1) {
                setDownvote(true)
                setUpvote(false)
            }
        }
        fetchUserVote()
    })

    function handleDownvote() {
        if (downvote) { 
            setDownvote(false)
            socket.emit('addVote', roomId, songId, userId, 0)
        }
        else {
            setUpvote(false)
            setDownvote(true)
            socket.emit('addVote', roomId, songId, userId, -1)
        }
    }

    function handleUpvote() {
        if (upvote) { 
            setUpvote(false)
            socket.emit('addVote', roomId, songId, userId, 0)
        }
        else {
            setUpvote(true)
            setDownvote(false)
            socket.emit('addVote', roomId, songId, userId, 1)
        }
    }

    const renderVotes = useCallback(() => (
        <div className={pcn('__vote-section')}>
            <button className={downvote ? cn(pcn('__downvote'), 'selected') : pcn('__downvote')} onClick={handleDownvote}>
                <BiSolidDownvote size='30px' />
            </button>
            <div className={pcn('__votes')}>
                {song.voteCount}
            </div>
            <button className={upvote ? cn(pcn('__upvote'), 'selected') : pcn('__upvote')} onClick={handleUpvote}>
                <BiSolidUpvote size='30px' />
            </button>
        </div>
    ), [upvote, downvote, song.voteCount])

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
                {renderVotes()}
            </div>
        </div>
    )
}