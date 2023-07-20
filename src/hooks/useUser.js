import { stringify } from "@/utils/json"

function useUser() {

    async function getUserInfo(auxpartyId) {
        try {
            if (!auxpartyId) { return }

            const body = stringify({ auxpartyId: auxpartyId })

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/get`, {
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

    return {
        getUserInfo: getUserInfo
    }
}

export default useUser