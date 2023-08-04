import React, { useEffect, useState, useCallback } from "react"
import Link from "next/link";
import useRoom from "@/hooks/useRoom"
import LoadingComponent from "@/components/shared/LoadingComponent";
import { getPCN } from "@/utils/classes";
import { GoSearch } from 'react-icons/go';

const className = 'join'
const pcn = getPCN(className)

export default function JoinComponent() {
    const { getAllRooms } = useRoom();
    const [rooms, setRooms] = useState();
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const roomInfo = await getAllRooms();
            setRooms(roomInfo)
            setFilteredRooms(roomInfo)
        }
        fetchData()
    }, [])

    const checkItems = useCallback((search) => {
        let matchingRooms = [];
        if (!rooms) {
            return;
        }
        for (let i = 0; i < rooms.length; ++i) {
            if (rooms[i].name.includes(search)) {
                matchingRooms.push(rooms[i]);
            }
        }
        setFilteredRooms(matchingRooms);
    }, [rooms]);

    const handleSearchChange = useCallback((event) => {
        checkItems(event.target.value);
    }, [checkItems]);

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
                        <input className={pcn('__search-text')} placeholder='Search' onChange={handleSearchChange} />
                    </div>
                    <div className={pcn('__separator')} />
                    <div className={pcn('__search-results')}>
                        {filteredRooms.map((room, index) =>
                            <Link href={`rooms/${room.name}`} className={pcn('__search-result')} key={index}>
                                <div className={pcn('__search-result-title')}>
                                    {room.name}
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}