import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import useUser from "@/hooks/useUser";
import LoginRoomComponent from "./login/LoginRoomComponent";
import LoadingComponent from "../shared/LoadingComponent";

export default function RoomComponent({ roomName }) {
    const { getRoomByName } = useRoom();
    const { getUserInfo } = useUser()

    const [loggedIn, setLoggedIn] = useState(false)
    const [roomInfo, setRoomInfo] = useState()
    const [ownerInfo, setOwnerInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            if (!roomName) {
                setIsLoading(false);
                return;
            }
            const roomData = (await getRoomByName(roomName))
            if (!roomData) {
                setIsLoading(false);
                return;
            }
            setRoomInfo(roomData[0])
            if (!roomInfo) {
                setIsLoading(false)
                return;
            }
            const ownerData = (await getUserInfo(roomInfo.auxpartyId))[0]
            setOwnerInfo(ownerData)
            setIsLoading(false)
        }
        if (roomName) {
            fetchData()
        }
    }, [roomName, loggedIn])

    function handleLogin() {
        setLoggedIn(true)
    }

    if (isLoading) {
        return <LoadingComponent />
    }

    if (!roomInfo && !isLoading) {
        return (
            <div>this room does not exist</div>
        )
    }

    if (!loggedIn) {
        return (
            <LoginRoomComponent name={roomInfo.name} password={roomInfo.password} onLogin={handleLogin} />
        )
    }

    if (loggedIn && ownerInfo && roomInfo) {
        return (
            <div>welcome to {ownerInfo.spotifyDisplayName}&apos;s room</div>
        )
    }

    return (
        <LoadingComponent />
    )
}