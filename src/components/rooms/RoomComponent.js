import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import useUser from "@/hooks/useUser";

export default function RoomComponent({ roomName }) {
    const { getRoom } = useRoom();
    const { getUserInfo } = useUser()

    const [roomInfo, setRoomInfo] = useState()
    const [ownerInfo, setOwnerInfo] = useState()

    useEffect(() => {
        async function fetchData() {
            if (!roomName) { return }
            const roomData = (await getRoom(roomName))[0]
            setRoomInfo(roomData)
            const ownerData = (await getUserInfo(roomInfo.auxpartyId))[0]
            setOwnerInfo(ownerData)
            console.log(ownerInfo)
        }
        fetchData()
    }, [roomName])

    return (
        <div>welcome to {ownerInfo.spotifyDisplayName}&apos;s room</div>
    )
}