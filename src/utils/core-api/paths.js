const prefix = {
    SPOTIFY: '/spotify',
    USER: '/user',
    ROOM: '/room'
}

const paths = {
    HEALTH_CHECK: '/health-check',
    SPOTIFY_LOGIN: `${prefix.SPOTIFY}/login`,
    GET_USER: `${prefix.USER}/get`,
    GET_ROOM_BY_NAME: `${prefix.ROOM}/get/name`,
    GET_ROOM_BY_AUXPARTYID: `${prefix.ROOM}/get/id`,
    GET_ALL_ROOMS: `${prefix.ROOM}/get/all`,
    CREATE_ROOM: `${prefix.ROOM}/create`
}

export default paths