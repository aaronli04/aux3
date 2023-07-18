import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import { parse } from "@/utils/json"
import { localStorageGet } from "@/utils/localStorage"
import useSpotifyReadUser from "@/hooks/useSpotifyReadUser"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    const { readSpotifyUserInfo } = useSpotifyReadUser();

    useEffect(() => {
        async function fetchUserData() {
            await readSpotifyUserInfo();
        }
        fetchUserData()
        console.log(parse(localStorageGet('user-spotify-info')))
    })

    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                aux3
            </div>
        </div>
    )
}