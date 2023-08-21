import api from "@/utils/api"

function useUser() {

  async function createUserAccount(spotifyUserInfo) {
    if (!spotifyUserInfo) { return }
    const response = (await api.core.createUserAccount(spotifyUserInfo)).data
    if (response.error) { return null }
    const data = response.data
    return data
  }

  async function getUserInfo(auxpartyId) {
    if (!auxpartyId) { return }
    const response = (await api.core.getUserInfo({ auxpartyId })).data
    if (response.error) { return null }
    const data = response.data
    return data
  }

  async function updateAccessToken(auxpartyId, accessToken) {
    if (!auxpartyId || !accessToken) { return }
    const response = (await api.core.updateAccessToken({ auxpartyId, accessToken })).data
    if (response.error) { return null }
    const data = response.data
    return data
  }

  return {
    getUserInfo,
    createUserAccount,
    updateAccessToken,
  }
}

export default useUser