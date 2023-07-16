import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "../hooks/useSpotifyLogin"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const {refreshAccessToken} = useSpotifyLogin()
    function handleClick() {
        refreshAccessToken();
        console.log('creating a room')
    }

    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('spotify-access-token'))
        console.log(tokens)
        if (!tokens || tokens.accessToken === undefined) {
            // window.location.href = 'http://localhost:3000/login'
        }
    }, [])


    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                create a room
            </div>
            <div className={pcn('__button-section')}>
                <button onClick={handleClick}>
                    create
                </button>
            </div>
        </div>
    )
}