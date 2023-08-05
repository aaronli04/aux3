import React, { useEffect } from "react"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"
import { checkLinkForError, processValidLink } from "@/utils/spotify/link"
import { paths } from "@/utils/nav"

const className = 'callback'
const pcn = getPCN(className)

export default function CallbackComponent() {

    const { requestAccessToken } = useSpotifyLogin();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchData = async () => {
                const link = window.location.href;
                const error = checkLinkForError(link);

                if (!error) {
                    const info = processValidLink(link);
                    if (info) {
                        const token = await requestAccessToken(info);
                        // window.location.href = paths.CREATE;
                    } else {
                        // window.location.href = paths.LOGIN;
                    }
                }
            };

            fetchData();
        }
    }, []);

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title')}>
                    logging in...
                </div>
            </div>
        </div>
    )
}