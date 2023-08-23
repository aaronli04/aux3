import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { cn, getPCN } from "@/utils/classes";
import { getUserId } from "@/utils/userId";
import useVotes from "@/hooks/useVotes";

const className = 'song-card'
const pcn = getPCN(className)

export default function SongCard({ song, socket, roomInfo }) {
    const { getVotesBySong } = useVotes()

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const [votes, setVotes] = useState()
    const userId = getUserId()
    const roomId = roomInfo.auxpartyId
    const songId = song.id

    useEffect(() => {
        socket.on('voteAdded', async (songVotes) => {
            if (songId === songVotes.songId) {
                setVotes(songVotes.voteCount)
            }
        })

        async function getVoteData() {
            const votes = await getVotesBySong(songId)
            setVotes(votes)
        }
        getVoteData()
    }, [])

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
                {votes}
            </div>
            <button className={upvote ? cn(pcn('__upvote'), 'selected') : pcn('__upvote')} onClick={handleUpvote}>
                <BiSolidUpvote size='30px' />
            </button>
        </div>
    ), [upvote, downvote, votes])

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