import React, { useEffect, useContext } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyAccess from "../hooks/useSpotifyAccess"
import { UserContext } from "@/contexts/UserContext"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { user, setUser } = useContext(UserContext)
    const { requestAccessToken } = useSpotifyAccess();

    function handleClick() {
        requestAccessToken()
    }

    if (typeof window !== "undefined" && !user) {
        window.location.href = 'http://localhost:3000/login'
    }

    if (user) {
        return (
            <div className={className}>
                <div className={pcn('__title-section')}>
                    create a room
                </div>
            </div>
        )
    }
}