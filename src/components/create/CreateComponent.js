import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyAccess from "../hooks/useSpotifyAccess"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
    const { processValidLink, checkLinkForError, requestAccessToken } = useSpotifyAccess();

    function handleClick() {
        requestAccessToken()
    }

    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem('spotify-auth'));
        if (!auth) {
            const link = window.location.href
            const error = checkLinkForError(link)
            if (!error) {
                const info = processValidLink(link)
                if (info) {
                    localStorage.setItem('spotify-auth', JSON.stringify(info))
                } else {
                    window.location.href = 'http://localhost:3000/login'
                }
            }
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