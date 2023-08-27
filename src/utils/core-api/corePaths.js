const prefix = {
    SPOTIFY: '/spotify',
    USER: '/user',
    ROOM: '/room',
    VOTE: '/vote',
    SONG: '/song'
}

const corePaths = {
    HEALTH_CHECK: '/health-check',
    SPOTIFY_LOGIN: `${prefix.SPOTIFY}/login`,
    UPDATE_ACCESS_TOKEN: `${prefix.USER}/update/token`,
    GET_USER: `${prefix.USER}/get`,
    GET_ROOM_BY_NAME: `${prefix.ROOM}/get/name`,
    GET_ROOM_BY_AUXPARTYID: `${prefix.ROOM}/get/id`,
    GET_ALL_ROOMS: `${prefix.ROOM}/get/all`,
    CREATE_ROOM: `${prefix.ROOM}/create`,
    ADD_VOTE: `${prefix.VOTE}/add`,
    GET_VOTE: `${prefix.VOTE}/get`,
    GET_SONG: `${prefix.SONG}/get`,
    UPDATE_ROOM_ACTIVE: `${prefix.ROOM}/update/status`,
    UPDATE_SONG_ADDED: `${prefix.SONG}/update/added`,
    GET_USER_VOTE: `${prefix.VOTE}/get/user`
}

export default corePaths