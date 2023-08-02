import React, { useState, useEffect } from "react";
import { getPCN } from "@/utils/classes";
import { nonEmptyString } from "@/utils/validators";
import { localStorageGet } from "@/utils/localStorage";
import useRoom from "@/hooks/useRoom";

const className = 'create-room-component';
const pcn = getPCN(className);

export default function CreateRoomComponent() {
    const { createRoom, getRoomByAuxpartyId} = useRoom();
    const [existingRooms, setExistingRooms] = useState()
    const [formData, setFormData] = useState({ roomName: '', roomPassword: '' });
    const [errors, setErrors] = useState({ roomName: '', roomPassword: '' });

    useEffect(() => {
        async function fetchData() {
            const userId = localStorageGet('user-id')
            const existingRoom = await getRoomByAuxpartyId(userId)
            if (!existingRoom) { return; }
            if (existingRoom.length > 0) {
                setExistingRooms(existingRoom);
            }
        }
        fetchData();

        
        const { roomName, roomPassword } = formData;
        if (!nonEmptyString(roomName)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: 'enter a valid name',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: '',
            }));
        }

        if (roomName.length > 20) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: 'name must be 20 characters or less',
            }));
        }

        if (!nonEmptyString(roomPassword)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomPassword: 'enter a valid password',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomPassword: '',
            }));
        }
    }, [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { roomName, roomPassword } = formData;
        if (nonEmptyString(roomName) && nonEmptyString(roomPassword)) {
            const room = await createRoom(roomName, roomPassword);
            if (!room) {
                return;
            }
            window.location.href = `/rooms/${roomName}`
        }
    };

    if (existingRooms) {
        window.location.href = `/rooms/${existingRooms[0].name}`
    }

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title')}>
                    create your room
                </div>
                <div className={pcn('__body-section')}>
                    <div className={pcn('__question-section')}>
                        <div className={pcn('__subtitle')}>
                            room name
                        </div>
                        <input
                            className={errors.roomName ? pcn('__input-box--error') : pcn('__input-box')}
                            name="roomName"
                            value={formData.roomName}
                            onChange={handleChange}
                        />
                        <div className={pcn('__error-message')}>{errors.roomName}</div>
                    </div>
                    <div className={pcn('__question-section')}>
                        <div className={pcn('__subtitle')}>
                            password
                        </div>
                        <input
                            className={errors.roomPassword ? pcn('__input-box--error') : pcn('__input-box')}
                            name="roomPassword"
                            value={formData.roomPassword}
                            onChange={handleChange}
                        />
                        <div className={pcn('__error-message')}>{errors.roomPassword}</div>
                    </div>
                </div>
                <div className={pcn('__submit-section')}>
                    <button className={pcn('__submit-button')} onClick={onSubmit}>
                        create
                    </button>
                </div>
            </div>
        </div>
    );
}