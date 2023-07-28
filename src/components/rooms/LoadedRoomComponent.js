import { getPCN } from "@/utils/classes"
import Link from "next/link"

const className = 'loaded-room-component'
const pcn = getPCN(className)

export default function LoadedRoomComponent({ ownerInfo, roomInfo }) {
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
                    </div>
                    <div className={pcn('__queue-section')}>
                        <div className={pcn('__subtitle')}>
                            queue
                        </div>
                        <div className={pcn('__queue')}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}