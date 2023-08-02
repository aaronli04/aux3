import Link from "next/link"
import { getPCN } from "@/utils/classes"

const className = 'room-does-not-exist'
const pcn = getPCN(className)

export default function RoomDoesNotExistComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__message')}>
                    this room does not exist
                </div>
            </div>
        </div>
    )
}