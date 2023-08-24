import api from "@/utils/api"

function useSongs() {

    async function getSongByAuxpartyId(auxpartyId) {
        if (!auxpartyId) { return }
        const params = {
            auxpartyId
        }
        const response = (await api.core.getSongByAuxpartyId(params)).data
        if (response.error) { return }
        const data = response.data
        return data
    }

    return {
        getSongByAuxpartyId,
    }

}

export default useSongs