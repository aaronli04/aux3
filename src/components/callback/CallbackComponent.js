import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "../hooks/useSpotifyLogin"

const className = 'callback'
const pcn = getPCN(className)

export default function CallbackComponent() {
    const { processValidLink, checkLinkForError, requestAccessToken } = useSpotifyLogin();


    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window object is available (client side)
            const fetchData = async () => {
                const link = window.location.href;
                const error = checkLinkForError(link);

                if (!error) {
                    const info = processValidLink(link);
                    if (info) {
                        const token = await requestAccessToken(info);
                        console.log(token)
                        // window.location.href = 'http://localhost:3000/create';
                    } else {
                        window.location.href = 'http://localhost:3000/login';
                    }
                }
            };

            fetchData();
        }
    }, []);









    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                callback
            </div>
        </div>
    )
}