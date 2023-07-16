import React from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "../hooks/useSpotifyLogin"

const className = 'login'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { generateAuthorizationCode } = useSpotifyLogin();

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