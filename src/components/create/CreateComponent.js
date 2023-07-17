import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"
import { paths } from "@/utils/nav"
import { localStorageGet } from "@/utils/localstorage"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { refreshAccessToken } = useSpotifyLogin()

    function handleClick() {
        console.log('creating a room')
    }

    useEffect(() => {
        const tokens = JSON.parse(localStorageGet('spotify-access-token'));
      
        const fetchData = async () => {
          if (!tokens || tokens.accessToken === undefined) {
            window.location.href = paths.LOGIN;
          } else {
            await refreshAccessToken();
            console.log(localStorageGet('spotify-refresh-token'));
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