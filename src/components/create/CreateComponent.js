import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyAccess from "../hooks/useSpotifyAccess"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { generateAuthorizationCode } = useSpotifyAccess();

    function handleClick() {
        generateAuthorizationCode()
    }

    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                create a room
            </div>
            <button onClick={handleClick}>
                login
            </button>
        </div>
    )
}