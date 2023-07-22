import React, { useState } from "react";
import { getPCN } from "@/utils/classes";
import { AiOutlineClose } from 'react-icons/ai';
import { nonEmptyString } from "@/utils/validators";
import useRoom from "@/hooks/useRoom";

const className = 'create-room-modal';
const pcn = getPCN(className);

export default function CreateRoomModal() {
    const { createRoom } = useRoom();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ roomName: '', roomPassword: ''});
    const [errors, setErrors] = useState({ roomName: '', roomPassword: '', roomExists: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleOpen = () => {
        setErrors({
            roomName: '',
            roomPassword: '',
            roomExists: '',
        });
        setIsOpen(!isOpen);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { roomName, roomPassword } = formData;
        if (!nonEmptyString(roomName)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: 'that is not a valid room name',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: '',
            }));
        }
        if (!nonEmptyString(roomPassword)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomPassword: 'that is not a valid room password',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomPassword: '',
            }));
        }
        if (nonEmptyString(roomName) && nonEmptyString(roomPassword)) {
            const room = await createRoom(roomName, roomPassword);
            if (!room) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    roomExists: 'you already have an active room; end it to create a new one',
                }));
                return;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    roomExists: ''
                }));
            }
        }
    };

    if (!isOpen) {
        return (
            <div className={className}>
                <button onClick={handleOpen}>create a room</button>
            </div>
        );
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
                    <input
                        className={pcn('__input-box')}
                        placeholder='enter room name here'
                        name="roomName"
                        value={formData.roomName}
                        onChange={handleChange}
                    />
                    {errors.roomName && <div className={pcn('__error-message')}>{errors.roomName}</div>}
                </div>
                <div className={pcn('__question-section')}>
                    <div className={pcn('__subtitle')}>
                        password
                    </div>
                    <input
                        className={pcn('__input-box')}
                        placeholder='enter room password here'
                        name="roomPassword"
                        value={formData.roomPassword}
                        onChange={handleChange}
                    />
                    {errors.roomPassword && <div className={pcn('__error-message')}>{errors.roomPassword}</div>}
                </div>
                <div className={pcn('__submit-section')}>
                    <button className={pcn('__submit-button')} onClick={onSubmit}>
                        submit
                    </button>
                </div>
                <div>
                    {errors.roomExists && <div className={pcn('__error-message')}>{errors.roomExists}</div>}
                </div>
            </div>
        </div>
    );
}