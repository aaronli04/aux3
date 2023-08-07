const constants = {
    // Core API
    CORE_API_ORIGIN: process.env.NEXT_PUBLIC_CORE_API_ORIGIN,

    // Spotify
    SPOTIFY_API_ORIGIN: 'https://api.spotify.com',
    SPOTIFY_HEADER_AUTHORIZATION: 'Basic ' + btoa(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
    SPOTIFY_SCOPES: 'user-read-playback-state user-modify-playback-state playlist-modify-public user-read-email user-read-private'
}

export default constants