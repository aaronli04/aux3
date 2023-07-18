import React, { useState } from "react"
import { getPCN } from "@/utils/classes"
import { AiOutlineClose } from 'react-icons/ai';
import { nonEmptyString } from "@/utils/validators";

const className = 'create-room-modal'
const pcn = getPCN(className)

export default function CreateRoomModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [roomPassword, setRoomPassword] = useState('')
    const [roomNameError, setRoomNameError] = useState('')
    const [roomPasswordError, setRoomPasswordError] = useState('')

    function handleRoomName(event) {
        setRoomName(event.target.value)
    }

    function handleRoomPassword(event) {
        setRoomPassword(event.target.value)
    }

    function handleOpen() {
        setRoomNameError('')
        setRoomPasswordError('')
        setIsOpen(!isOpen)
    }

    function onSubmit(event) {
        event.preventDefault()
        if (!nonEmptyString(roomName)) {
            setRoomNameError('that is not a valid room name')
        } else {
            setRoomNameError('')
        }
        if (!nonEmptyString(roomPassword)) {
            setRoomPasswordError('that is not a valid room password')
        } else {
            setRoomPasswordError('')
        }
        if (nonEmptyString(roomName) && nonEmptyString(roomPassword)) {
            console.log([roomName, roomPassword])
            // enter supabase insert here
        }
    }

    if (!isOpen) {
        return (
            <div className={className}>
                <button onClick={handleOpen}>create a room</button>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__close-button-section')}>
                    <button className={pcn('__close-button')} onClick={handleOpen}>
                        <AiOutlineClose className={pcn('__close-icon')} />
                    </button>
                </div>
                <div className={pcn('__title')}>
                    create a room
                </div>
                <div className={pcn('__question-section')}>
                    <div className={pcn('__subtitle')}>
                        room name
                    </div>
                    <input className={pcn('__input-box')} placeholder='enter room name here' onChange={handleRoomName} />
                    {roomNameError && <div className={pcn('__error-message')}>{roomNameError}</div>}
                </div>
                <div className={pcn('__question-section')}>
                    <div className={pcn('__subtitle')}>
                        password
                    </div>
                    <input className={pcn('__input-box')} placeholder='enter room password here' onChange={handleRoomPassword} />
                    {roomPasswordError && <div className={pcn('__error-message')}>{roomPasswordError}</div>}
                </div>
                <div className={pcn('__submit-section')}>
                    <button className={pcn('__submit-button')} onClick={onSubmit}>
                        submit
                    </button>
                </div>
            </div>
        </div>
    )
}