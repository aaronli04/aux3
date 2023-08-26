import api from "@/utils/api";
import constants from "@/utils/constants";
import useSpotifyLogin from "./useSpotifyLogin";
import useSongs from "./useSongs";
import { stringify } from "@/utils/json";

function useSpotifyPlaylists() {

    const { refreshAccessToken } = useSpotifyLogin()
    const { getSongByAuxpartyId, updateSongAdded } = useSongs()

    async function createSpotifyPlaylist(accessToken, refreshToken, spotifyUserId, playlistName) {
        if (!spotifyUserId || !playlistName) { return }
        const params = {
            name: playlistName,
            description: 'welcome to auxparty',
        }
        let response = (await api.spotify.createPlaylist(accessToken, spotifyUserId, params)).data
        let newAccessToken = null;
        if (response.error) {
            if (response.error.message === constants.SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED || response.error.message === constants.SPOTIFY_ERROR_INVALID_ACCESS_TOKEN) {
                newAccessToken = await refreshAccessToken(refreshToken)
                response = (await api.spotify.createPlaylist(newAccessToken, spotifyUserId, params)).data
            }
        }
        const playlistId = response.id
        const uri = response.uri
        return { playlistId, uri, newAccessToken }
    }

    async function addSongToPlaylist(accessToken, refreshToken, playlistId, song) {
        if (!song || !playlistId) { return }
        const songUri = song.uri
        const params = {
            "uris": [
                songUri
            ]
        }
        let response = (await api.spotify.addSongToPlaylist(accessToken, playlistId, params)).data
        let newAccessToken = null
        if (response.error) {
            if (response.error.message === constants.SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED || response.error.message === constants.SPOTIFY_ERROR_INVALID_ACCESS_TOKEN) {
                newAccessToken = await refreshAccessToken(refreshToken)
                response = (await api.spotify.addSongToPlaylist(newAccessToken, playlistId, params)).data
            }
        }
        return { newAccessToken }
    }

    async function playPlaylist(accessToken, refreshToken, deviceId, uri) {
        if (!uri) { return }
        const params = {
            "context_uri": `${uri}`
        }
        let newAccessToken
        try {
            let response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: stringify(params)
            })
            response = await response.json()
            console.log(response)
            if (response.error) {
                if (response.error.message === constants.SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED || response.error.message === constants.SPOTIFY_ERROR_INVALID_ACCESS_TOKEN) {
                    newAccessToken = await refreshAccessToken(refreshToken)
                    response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: stringify(params)
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
        return { newAccessToken }
    }



    return {
        createSpotifyPlaylist,
        addSongToPlaylist,
        playPlaylist
    }
}

export default useSpotifyPlaylists