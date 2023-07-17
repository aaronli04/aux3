import React, { useState } from "react"

export default function CreateRoomModal() {
    const [isOpen, setIsOpen] = useState(false)

    function handleClick() {
        setIsOpen(!isOpen)
    }

    if (!isOpen) {
        return <button onClick={handleClick}>create a room</button>
    }

    return (
        <div>it changed</div>
    )
}