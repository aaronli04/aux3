import { localStorageGet, localStorageSet } from "@/utils/localStorage";
import { parse, stringify } from "@/utils/json";
import { getUserId } from "@/utils/userId";

function useSpotifyReadUser() {

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
            if (result.error) {
                return;
            }
            const userData = {
                auxpartyId: getUserId(),
                spotifyDisplayName: result.display_name,
                spotifyEmail: result.email,
                spotifyExternalLink: result.external_urls.spotify,
                spotifyApiLink: result.href,
                spotifyUserId: result.id
            }
            localStorageSet('user-spotify-info', stringify(userData))
            return userData
        } catch (err) {
            console.log(err)
        }
    }

    return {
        readSpotifyUserInfo
    }
}

export default useSpotifyReadUser