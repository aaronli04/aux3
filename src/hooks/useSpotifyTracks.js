import api from "@/utils/api";
import constants from "@/utils/constants";
import useSpotifyLogin from "./useSpotifyLogin";
import { v4 as uuidv4 } from 'uuid';

function useSpotifyTracks() {
    
    const { refreshAccessToken } = useSpotifyLogin()

    async function searchTrack(accessToken, refreshToken, trackName) {
        if (!trackName) { return }
        const params = {
            q: trackName,
            type: 'track'
        }
        let response = (await api.spotify.searchTrack(accessToken, params)).data
        let newAccessToken = null;
        if (response.error) {
            if (response.error.message === constants.SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED || response.error.message === constants.SPOTIFY_ERROR_INVALID_ACCESS_TOKEN) {
                newAccessToken = await refreshAccessToken(refreshToken)
                response = (await api.spotify.searchTrack(newAccessToken, params)).data
            }
        }
        const tracks = response.tracks.items
        const results = []
        const processedURIs = new Set()
        tracks.forEach(track => {
            const albumCover = track.album.images[0].url
            const spotifyArtists = track.artists
            let artists = []
            spotifyArtists.forEach(artist => {
                artists.push(artist.name)
            })
            artists = artists.join(', ')
            const name = track.name
            const uri = track.uri
            const song = {
                albumCover,
                artists,
                name,
                uri,
                auxpartyId: uuidv4()
            }

            if (!processedURIs.has(uri)) {
                results.push(song)
                processedURIs.add(uri)
            }
        });
        return {results, newAccessToken}
    }

    return {
        searchTrack
    }
}

export default useSpotifyTracks