import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import useUser from "@/hooks/useUser";
import LoginRoomComponent from "./login/LoginRoomComponent";

export default function RoomComponent({ roomName }) {
    const { getRoomByName } = useRoom();
    const { getUserInfo } = useUser()

    const [loggedIn, setLoggedIn] = useState(false)
    const [roomInfo, setRoomInfo] = useState()
    const [ownerInfo, setOwnerInfo] = useState()

    useEffect(() => {
        async function fetchData() {
            if (!roomName) { return }
            const roomData = (await getRoomByName(roomName))
            if (!roomData) { return }
            setRoomInfo(roomData[0])
            if (!roomInfo) { return }
            const ownerData = (await getUserInfo(roomInfo.auxpartyId))[0]
            setOwnerInfo(ownerData)
        }
        fetchData()
    }, [roomName, loggedIn])

    function handleLogin() {
        setLoggedIn(true)
    }

    if (!roomInfo) {
        return (
            <div>this room does not exist</div>
        )
    }

    if (!loggedIn) {
        return (
            <LoginRoomComponent password={roomInfo.password} onLogin={handleLogin} />
        )
    }

    if (loggedIn && ownerInfo && roomInfo) {
        return (
            <div>welcome to {ownerInfo.spotifyDisplayName}&apos;s room</div>
        )
    }

    return (
        <div>loading...</div>
    )
}