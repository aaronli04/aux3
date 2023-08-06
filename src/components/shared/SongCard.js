import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { cn, getPCN } from "@/utils/classes";

const className = 'song-card'
const pcn = getPCN(className)

export default function SongCard({ song, socket }) {
    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)

    useEffect(() => {
        socket.on('pong', () => {
            console.log('Received pong');
        });

        return () => {
            socket.off('pong');
        };
    }, [socket]);

    function handleDownvote() {
        if (upvote) { setUpvote(false) }
        setDownvote(!downvote)
        socket.emit('ping');
    }

    function handleUpvote() {
        if (downvote) { setDownvote(false) }
        setUpvote(!upvote)
        socket.emit('ping');
    }

    const renderVotes = useCallback(() => (
        <div className={pcn('__vote-section')}>
            <button className={downvote ? cn(pcn('__downvote'), 'selected') : pcn('__downvote')} onClick={handleDownvote}>
                <BiSolidDownvote size='30px' />
            </button>
            <div className={pcn('__votes')}>
                {song.votes}
            </div>
            <button className={upvote ? cn(pcn('__upvote'), 'selected') : pcn('__upvote')} onClick={handleUpvote}>
                <BiSolidUpvote size='30px' />
            </button>
        </div>
    ), [upvote, downvote])

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <Image src={song.image} alt='album cover' width={45} height={45} />
                <div className={pcn('__song-info')}>
                    <div className={pcn('__title')}>
                        {song.name}
                    </div>
                    <div className={pcn('__artist')}>
                        {song.artist}
                    </div>
                </div>
                {renderVotes()}
            </div>
        </div>
    )
}