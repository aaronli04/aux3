import api from "@/utils/api"
import { getUserId } from "@/utils/userId"
import useUser from "./useUser"
import useSpotifyPlaylists from "./useSpotifyPlaylists"

function useRoom() {

    const { getUserInfo } = useUser()
    const { createSpotifyPlaylist } = useSpotifyPlaylists()

    async function getRoomByName(name) {
        if (!name) { return }
        const response = (await api.core.getRoomByName({ name })).data
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data
        return data
    }

    async function getRoomByAuxpartyId(auxpartyId) {
        if (!auxpartyId) { return }
        const response = (await api.core.getRoomByAuxpartyId({ auxpartyId })).data
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data
        return data
    }

    async function createRoom(roomName, roomPassword) {
        const userId = getUserId()
        const userInfo = await getUserInfo(userId)
        if (!userId || !roomName || !roomPassword || !userInfo) { return }
        const spotifyUserId = userInfo.spotifyUserId
        const spotifyResponse = await createSpotifyPlaylist(userInfo.accessToken, userInfo.refreshToken, spotifyUserId, roomName)
        if (!spotifyResponse) { return }
        const body = {
            auxpartyId: userId,
            roomName,
            roomPassword,
            playlistId: spotifyResponse.playlistId
        }
        const response = (await api.core.createRoom(body)).data
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data
        return {data, spotifyResponse}
    }

    async function getAllRooms() {
        const response = (await api.core.getAllRooms()).data
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data
        return data
    }

    return {
        getRoomByName: getRoomByName,
        getRoomByAuxpartyId: getRoomByAuxpartyId,
        createRoom: createRoom,
        getAllRooms: getAllRooms
    }
}

export default useRoom;