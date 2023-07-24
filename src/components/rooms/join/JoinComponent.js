import React, { useEffect, useState } from "react"
import useRoom from "@/hooks/useRoom"
import LoadingComponent from "@/components/shared/LoadingComponent";
import { getPCN } from "@/utils/classes";
import { GoSearch } from 'react-icons/go';

const className = 'join'
const pcn = getPCN(className)

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
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title')}>
                    active rooms
                </div>
                <div className={pcn('__search-section')}>
                    <div className={pcn('__searchbar')}>
                        <GoSearch className={pcn('__search-icon')} size={25} />
                        <input className={pcn('__search-text')} placeholder='Search' />
                    </div>
                    <div className={pcn('__separator')} />
                    <div className={pcn('__search-results')}>
                        {rooms.map((room, index) =>
                            <div className={pcn('__search-result')} key={index}>
                                <div className={pcn('__search-result-title')}>
                                    {room.name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}