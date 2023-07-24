import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import LoadingComponent from "@/components/shared/LoadingComponent";

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
            <LoadingComponent />
        )
    }

    return (
        <div>here are some rooms to join...</div>
    )
}