import { localStorageGet, localStorageSet } from "@/utils/localStorage";
import { parse } from "@/utils/json";

function useSpotifyReadUser() {

    async function readSpotifyUserInfo() {
        const accessToken = parse(localStorageGet('spotify-access-token')).accessToken
        let response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        response = await response.json()
        const userData = {
            userDisplayName: response.display_name,
            userEmail: response.email,
            userSpotifyLink: response.external_urls.spotify,
            userAPILink: response.href,
            userId: response.id
        }
        localStorageSet('user-spotify-info', JSON.stringify(userData))
    }


    return {
        readSpotifyUserInfo: readSpotifyUserInfo
    };
}

export default useSpotifyReadUser