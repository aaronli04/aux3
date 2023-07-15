import React, { useEffect, useContext } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyAccess from "../hooks/useSpotifyAccess"
import { UserContext } from "@/contexts/UserContext"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { user, setUser } = useContext(UserContext)
    const { processValidLink, checkLinkForError, requestAccessToken } = useSpotifyAccess();

    function handleClick() {
        requestAccessToken()
    }

    if (typeof window !== "undefined") {
    }

    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem('spotify-auth'));
        if (!auth) {
            const link = window.location.href
            const error = checkLinkForError(link)
            if (!error) {
                const info = processValidLink(link)
                if (info) {
                    setUser(info.code)
                    localStorage.setItem('spotify-auth', JSON.stringify(info))
                } else if (!user) {
                    window.location.href = 'http://localhost:3000/login'
                }
            }
        } else {
            setUser(auth.code)
        }
    }, [])


    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                create a room
            </div>
        </div>
    )
}