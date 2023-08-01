import Image from "next/image";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { getPCN } from "@/utils/classes";

const className = 'song-card'
const pcn = getPCN(className)

export default function SongCard({ song }) {
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
                <div className={pcn('__vote-section')}>
                    <button className={pcn('__downvote')}>
                        <BiSolidDownvote size='30px'/>
                    </button>
                    <div className={pcn('__votes')}>
                        {song.votes}
                    </div>
                    <button className={pcn('__upvote')}>
                        <BiSolidUpvote size='30px'/>
                    </button>
                </div>
            </div>
        </div>
    )
}