import api from "@/utils/api";
import constants from "@/utils/constants";
import useSpotifyLogin from "./useSpotifyLogin";

function useSpotifyPlaylists() {

    const { refreshAccessToken } = useSpotifyLogin()

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
        return { playlistId, newAccessToken }
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
        let newAccessToken = null;
        if (response.error) {
            if (response.error.message === constants.SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED || response.error.message === constants.SPOTIFY_ERROR_INVALID_ACCESS_TOKEN) {
                newAccessToken = await refreshAccessToken(refreshToken)
                response = (await api.spotify.addSongToPlaylist(newAccessToken, playlistId, params)).data
            }
        }
        return { newAccessToken }
    }

    return {
        createSpotifyPlaylist,
        addSongToPlaylist
    }
}

export default useSpotifyPlaylists