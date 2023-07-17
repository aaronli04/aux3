import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"
import { paths } from "@/utils/nav"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { refreshAccessToken } = useSpotifyLogin()

    function handleClick() {
        console.log('creating a room')
    }

    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('spotify-access-token'));
      
        const fetchData = async () => {
          if (!tokens || tokens.accessToken === undefined) {
            window.location.href = paths.LOGIN;
          } else {
            await refreshAccessToken();
            console.log(localStorage.getItem('spotify-refresh-token'));
          }
        };
      
        fetchData();
      }, []);

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