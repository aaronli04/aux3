import { stringify } from "@/utils/json"
import { localStorageGet } from "@/utils/localStorage"

function useRoom() {
    async function getRoomByName(name) {
        try {
            if (!name) { return }

            const body = stringify({ name: name })

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/room/get/name`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: body
            })

            const result = await response.json()
            const data = result.data
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async function getRoomByAuxpartyId(auxpartyId) {
        try {
            if (!auxpartyId) { return }

            const body = stringify({ auxpartyId: auxpartyId })

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/room/get/id`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: body
            })

            const result = await response.json()
            const data = result.data
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async function createRoom(roomName, roomPassword) {
        const userId = localStorageGet('user-id')
        const data = {
            auxpartyId: userId,
            roomName,
            roomPassword
        }
        const body = stringify(data)
        try {
            if (!userId || !roomName || !roomPassword) { return }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/room/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            })
            const result = await response.json()
            if (result.error) {
                return null
            }
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async function getAllRooms() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/room/get/all`, {
                method: 'GET'
            })
            const result = await response.json()
            const data = result.data
            return data
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getRoomByName: getRoomByName,
        getRoomByAuxpartyId: getRoomByAuxpartyId,
        createRoom: createRoom,
        getAllRooms: getAllRooms
    }
}

export default useRoom;