import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import useUser from "@/hooks/useUser";
import LoginRoomComponent from "./login/LoginRoomComponent";
import LoadingComponent from "../shared/LoadingComponent";
import LoadedRoomComponent from "./LoadedRoomComponent";
import RoomDoesNotExistComponent from "./RoomDoesNotExistComponent";
import { getUserId } from "@/utils/userId";

export default function RoomComponent({ roomName }) {
    const { getRoomByName } = useRoom();
    const { getUserInfo } = useUser()

    const [loggedIn, setLoggedIn] = useState(false)
    const [roomInfo, setRoomInfo] = useState()
    const [ownerInfo, setOwnerInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData(userId) {
            if (!roomName) {
                setIsLoading(false)
                return;
            }
            const roomData = (await getRoomByName(roomName))
            if (!roomData) {
                setIsLoading(false)
                return
            }
            const roomMembers = roomData.members
            setRoomInfo(roomData)
            const ownerData = (await getUserInfo(roomData.auxpartyId))
            setOwnerInfo(ownerData)
            if (!ownerData) {
                setIsLoading(false)
                return
            }
            if (ownerData.auxpartyId === userId || roomMembers.includes(userId)) {
                setLoggedIn(true)
            }
            setIsLoading(false)
        }
        if (roomName) {
            const userId = getUserId();
            fetchData(userId)
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
            <RoomDoesNotExistComponent />
        )
    }

    if (!loggedIn) {
        return (
            <LoginRoomComponent name={roomInfo.name} password={roomInfo.password} onLogin={handleLogin} />
        )
    }

    if (loggedIn && ownerInfo && roomInfo) {
        return (
            <LoadedRoomComponent roomInfo={roomInfo} ownerInfo={ownerInfo} />
        )
    }

    return (
        <LoadingComponent />
    )
}