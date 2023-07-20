import { localStorageGet } from "@/utils/localStorage"

function useRoom() {

    async function createRoom(roomName, roomPassword) {
        const userId = localStorageGet('user-id')
        try {
            if (!userId || !roomName || !roomPassword) { return }
            // const creatorInfo = parse(localStorageGet('user-spotify-info'))
            // const { error } = await supabase
            // .from('rooms')
            // .insert({ 
            //     ownerId: userId,
            //     ownerName: creatorInfo.userDisplayName,
            //     ownerEmail: creatorInfo.userEmail,
            //     ownerSpotifyLink: creatorInfo.userSpotifyLink,
            //     ownerAPILink: creatorInfo.userAPILink,
            //     ownerSpotifyId: creatorInfo.userId,
            //     roomName: roomName,
            //     roomPassword: roomPassword,
            //     created_at: new Date(),
            //     updated_at: new Date(),
            //     active: true
            // })

            // if (error) {
            //     console.log(error)
            // }
        } catch (err) {
            console.log(err)
        }
    }

    return {
        createRoom: createRoom
    }
}

export default useRoom;