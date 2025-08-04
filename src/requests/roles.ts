import { fetcher } from "../util/axios.instance"

export const getRoles = async () => {
    const data = await fetcher({
        path: '/role'
    })
    return data || []
}