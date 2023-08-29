const constants = {
    // Core API
    CORE_API_ORIGIN: process.env.NEXT_PUBLIC_CORE_API_ORIGIN,

    // Spotify
    SPOTIFY_API_ORIGIN: 'https://api.spotify.com',
    SPOTIFY_HEADER_AUTHORIZATION: 'Basic ' + btoa(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
    SPOTIFY_SCOPES: 'user-read-playback-state user-modify-playback-state playlist-modify-public user-read-email user-read-private user-read-currently-playing',
    SPOTIFY_ERROR_ACCESS_TOKEN_EXPIRED: 'The access token expired',
    SPOTIFY_ERROR_INVALID_ACCESS_TOKEN: 'Invalid access token',
}

export default constants