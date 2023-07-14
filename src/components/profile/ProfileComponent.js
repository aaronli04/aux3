import { getPCN } from "@/utils/classes"
import UserData from "./UserData"

const className = 'profile'
const pcn = getPCN(className)

export default function ProfileComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__header')}>
                    profile
                </div>
                <div className={pcn('__data-section')}>
                    <UserData />
                </div>
            </div>
        </div>
    )
}