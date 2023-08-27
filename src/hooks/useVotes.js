import api from "@/utils/api"

function useVotes() {

    async function addVote(songId, userId, voteValue) {
        if (!songId || !userId || !voteValue) { return }
        const params = {
            auxpartyId: songId,
            userId,
            voteValue
        }
        const response = (await api.core.addVoteToSong(params)).data
    }

    async function getVotesBySong(songId) {
        if (!songId) { return }
        const params = {
            auxpartyId: songId
        }
        const response = (await api.core.getVotesBySong(params)).data
        if (response.error) { return null }
        const data = response.data
        return data
    }

    async function getUserVoteBySong(songId, userId) {
        if (!songId || !userId) { return }
        const params = {
            auxpartyId: songId,
            userId
        }
        const response = (await api.core.getVotesBySong(params)).data
        if (response.error) { return null }
        const data = response.data
        return data
    }

    return {
        addVote,
        getVotesBySong,
        getUserVoteBySong
    }

}

export default useVotes