import { localStorageGet, localStorageSet } from "@/utils/localStorage";
import { parse, stringify } from "@/utils/json";
import useSpotifyLogin from "./useSpotifyLogin";
import { getCookie } from "@/utils/cookies";

function useSpotifyReadUser() {

    const { refreshAccessToken } = useSpotifyLogin();

    async function readSpotifyUserInfo() {
        try {
            const accessToken = parse(localStorageGet('spotify-access-token')).accessToken
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const result = await response.json()
            const error = result.error
            if (error) {
                if (error.message === 'The access token expired') {
                    await refreshAccessToken();
                }
                return;
            }
            const userData = {
                auxpartyId: getCookie('userID'),
                spotifyDisplayName: result.display_name,
                spotifyEmail: result.email,
                spotifyExternalLink: result.external_urls.spotify,
                spotifyAPILink: result.href,
                spotifyUserId: result.id
            }
            localStorageSet('user-spotify-info', stringify(userData))
            return userData
        } catch (err) {
            console.log(err)
        }
    }

    return {
        readSpotifyUserInfo: readSpotifyUserInfo
    };
}

export default useSpotifyReadUser