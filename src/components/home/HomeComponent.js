import React, { useState, useEffect } from "react"
import { getPCN } from "@/utils/classes"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    const [user, setUser] = useState()
    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem('spotify-auth'));
        if (auth) {
            setUser(auth.code)
        }
    }, [])

    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                aux3
            </div>
            {user}
        </div>
    )
}