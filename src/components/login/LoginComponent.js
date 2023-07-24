import React from "react"
import Image from "next/image"
import { getPCN } from "@/utils/classes"
import useSpotifyLogin from "@/hooks/useSpotifyLogin"
import SpotifyIcon from '../../images/spotify-icon-black.png'

const className = 'login'
const pcn = getPCN(className)

export default function LoginComponent() {
    const { generateAuthorizationCode } = useSpotifyLogin();

    function handleLogin() {
        generateAuthorizationCode();
    }

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__button-section')}>
                    <div className={pcn('__button-text')}>
                        connect account
                    </div>
                    <button className={pcn('__login-button')} onClick={handleLogin}>
                        <Image src={SpotifyIcon} alt='spotify icon'/>
                        <div>login with spotify</div>
                    </button>
                </div>
                <div className={pcn('__disclaimer-section')}>
                    <div className={pcn('__disclaimer-title')}>
                        we never store login info
                    </div>
                    <div className={pcn('__disclaimer-subtitle')}>
                        revoke access any time through spotify
                    </div>
                </div>
            </div>
        </div>
    )
}