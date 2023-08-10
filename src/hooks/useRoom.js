import api from "@/utils/api"
import { getUserId } from "@/utils/userId"

function useRoom() {
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
        const data = response.data;
        return data;
    }

    async function createRoom(roomName, roomPassword) {
        const userId = getUserId()
        const body = {
            auxpartyId: userId,
            roomName,
            roomPassword
        }
        if (!userId || !roomName || !roomPassword) { return }
        const response = (await api.core.createRoom(body)).data;
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data
        return data
    }

    async function getAllRooms() {
        const response = (await api.core.getAllRooms()).data;
        if (!response) { return }
        if (response.error) { return null }
        const data = response.data;
        return data;
    }

    return {
        getRoomByName: getRoomByName,
        getRoomByAuxpartyId: getRoomByAuxpartyId,
        createRoom: createRoom,
        getAllRooms: getAllRooms
    }
}

export default useRoom;