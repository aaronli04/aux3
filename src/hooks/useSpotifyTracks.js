import api from "@/utils/api";

function useSpotifyTracks() {

    async function searchTrack(accessToken, trackName) {
        if (!trackName) { return; }
        const params = {
            q: trackName,
            type: 'track'
        }
        const response = (await api.spotify.searchTrack(accessToken, params)).data
        const tracks = response.tracks.items;
        const results = [];
        const processedURIs = new Set();
        tracks.forEach(track => {
            const albumCover = track.album.images[0].url;
            const spotifyArtists = track.artists;
            let artists = [];
            spotifyArtists.forEach(artist => {
                artists.push(artist.name)
            })
            artists = artists.join(', ')
            const name = track.name;
            const uri = track.uri;
            const song = {
                albumCover,
                artists,
                name,
                uri
            }

            if (!processedURIs.has(uri)) {
                results.push(song);
                processedURIs.add(uri);
            }
        });
        return results;
    }

    return {
        searchTrack: searchTrack,
    }
}

export default useSpotifyTracks