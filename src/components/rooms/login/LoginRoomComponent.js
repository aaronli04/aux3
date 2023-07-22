import React, { useState } from "react";

export default function LoginRoomComponent({ password, onLogin }) {
    const [passwordGuess, setPasswordGuess] = useState("");
    const [error, setError] = useState(null)

    function handleLoginSubmit() {
        setError(null);
        if (passwordGuess === password) {
            onLogin();
        } else {
            setError("Wrong room password. Please try again.");
        }
    }

    return (
        <div>
            <div>Enter room password</div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        value={passwordGuess}
                        onChange={(e) => setPasswordGuess(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleLoginSubmit}>Log In</button>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
}