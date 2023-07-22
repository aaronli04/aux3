import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"

export default function JoinComponent() {
    const { getAllRooms } = useRoom();
    const [rooms, setRooms] = useState();

    useEffect(() => {
        async function fetchData() {
            const roomInfo = await getAllRooms();
            setRooms(roomInfo)
        }
        fetchData()
    }, [])

    if (!rooms) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>here are some rooms to join...</div>
    )
}