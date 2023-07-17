import React, { useState, useEffect } from "react"
import { getPCN } from "@/utils/classes"
import { parse } from "@/utils/json"
import { localStorageGet } from "@/utils/localstorage"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    const [user, setUser] = useState()
    useEffect(() => {
        var auth = parse(localStorageGet('spotify-auth'));
        if (auth) {
            setUser(auth.state)
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