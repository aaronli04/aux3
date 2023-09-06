import useSongs from "@/hooks/useSongs"
import useVotes from "@/hooks/useVotes"

function useCompleteSongs() {

    const { getSongByAuxpartyId } = useSongs()
    const { getVotesBySong } = useVotes()

    async function fetchCompleteSongs(songs) {
        if (!songs || songs.length === 0) {
            return []
        }
    
        const completeSongs = []
    
        for (const song of songs) {
            const songData = await getSongByAuxpartyId(song)
            let voteCount = await getVotesBySong(song)
            if (!voteCount) {
                voteCount = 0
            }
            const completeSong = {
                auxpartyId: songData.auxpartyId,
                albumCover: songData.albumCover,
                name: songData.name,
                artists: songData.artists,
                uri: songData.uri,
                roomId: songData.roomId,
                voteCount
            }
            completeSongs.push(completeSong)
        }
    
        return completeSongs
    }

    return {
        fetchCompleteSongs,
    }
}

export default useCompleteSongs