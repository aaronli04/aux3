import { localStorageGet, localStorageSet } from "@/utils/localStorage";
import { parse, stringify } from "@/utils/json";
import useSpotifyLogin from "./useSpotifyLogin";

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
                // id: 
                userDisplayName: result.display_name,
                userEmail: result.email,
                userSpotifyLink: result.external_urls.spotify,
                userAPILink: result.href,
                userId: result.id
            }
            localStorageSet('user-spotify-info', stringify(userData))
        } catch (err) {
            console.log(err)
        }
    }

    return {
        readSpotifyUserInfo: readSpotifyUserInfo
    };
}

export default useSpotifyReadUser