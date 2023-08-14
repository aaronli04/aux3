import React, { useState, useCallback } from "react";
import { getPCN } from "@/utils/classes";

const className = 'login-room-component';
const pcn = getPCN(className)

export default function LoginRoomComponent({ name, password, onLogin }) {
    const [passwordGuess, setPasswordGuess] = useState("");
    const [error, setError] = useState(null)

    const submitPasswordInput = useCallback(async (event) => {
        setError(null)
        if (event.key === 'Enter') {
            checkPassword()
        }
    })

    const checkPassword = useCallback(() => {
        if (passwordGuess === password) {
            onLogin();
        } else {
            setError("wrong password, try again");
        }
    })

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title')}>
                    login to {name}
                </div>
                <div className={pcn('__body-section')}>
                    <div className={pcn('__question-section')}>
                        <div className={pcn('__subtitle')}>
                            room password
                        </div>
                        <input
                            type="password"
                            className={pcn('__input-box')}
                            value={passwordGuess}
                            onChange={(e) => setPasswordGuess(e.target.value)}
                            onKeyDown={(e) => submitPasswordInput(e)}
                        />
                        <div className={pcn('__error-message')}>{error}</div>
                    </div>
                </div>
                <div className={pcn('__submit-section')}>
                    <button className={pcn('__submit-button')} onClick={checkPassword} >
                        login
                    </button>
                </div>
            </div>
        </div>
    );
}