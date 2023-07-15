import React, { useContext, useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyAccess from "../hooks/useSpotifyAccess"
import { UserContext } from "@/contexts/UserContext"

const className = 'login'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { user, setUser } = useContext(UserContext)
    const { generateAuthorizationCode } = useSpotifyAccess();

    function handleClick() {
        generateAuthorizationCode();
    }

    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                login to create a room
            </div>
            <div className={pcn('__button-section')}>
                <button onClick={handleClick}>
                    login
                </button>
            </div>
        </div>
    )
}