import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const {refreshAccessToken} = useSpotifyLogin()
    function handleClick() {
        refreshAccessToken();
        console.log('creating a room')
    }

    /**
     * curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
     -H "Authorization: Bearer  BQBNcxNpiMvvHTwodu6FAUGlWmye1xVdbJW1F6EMIDrdSPc4yUmEQKLd0vp0ABoVkMdnUfzHOHhSGmQQNOLJX07CfeIqyhmHfhrRX3mSJ-hIdOlx1NFBrwbBdqduBenV8ceUIALkHcjM44te1uZNB21ZApaqJHlRVEu0v_rHz_Or_raeafT590yxUdLjrKDhjCnzc7YzrW7cWad_PXAtF0j_mBMc"

     */

    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('spotify-access-token'))
        if (!tokens || tokens.accessToken === undefined) {
            window.location.href = 'http://localhost:3000/login'
        } else {
            console.log(tokens.accessToken)
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