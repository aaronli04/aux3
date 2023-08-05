import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"
import { localStorageGet } from "@/utils/localStorage"
import { parse } from "@/utils/json"
import CreateRoomComponent from "./CreateRoomComponent"
import { paths } from "@/utils/nav"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
  const { refreshAccessToken } = useSpotifyLogin()

  useEffect(() => {
    const tokens = parse(localStorageGet('spotify-access-token'));

    const fetchData = async () => {
      console.log(tokens)
      if (!tokens || tokens.accessToken === undefined) {
        window.location.href = paths.LOGIN;
      } else {
        await refreshAccessToken();
      }
    };

    fetchData();
  }, []);

  return (
    <div className={className}>
      <div className={pcn('__liner')}>
        <CreateRoomComponent />
      </div>
    </div>
  )
}