import React, { useContext } from "react"
import { getPCN } from "@/utils/classes"
import { UserContext } from "@/contexts/UserContext"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    const { user, setUser } = useContext(UserContext)
    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                aux3
            </div>
            {user}
        </div>
    )
}