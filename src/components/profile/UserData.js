import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function UserData() {
    const { auth, createUser } = useAuth();
    const [userData, setUserData] = useState();

    useEffect(() => {
        async function fetchData() {
            if (auth) {
                const response = await createUser(auth);
                if (response !== null) {
                    setUserData(response)
                }
            }
        }
        fetchData();
    }, [auth])

    if (auth && !userData) {
        return (
            <div>...</div>
        )
    }

    if (auth && userData) {
        return (
            <div>
                you are logged in {userData.username}
            </div>
        )
    }

    return (
        <div>
            you are not logged in
        </div>
    )
}