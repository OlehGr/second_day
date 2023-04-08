import { useEffect, useState } from "react"
import { BASE_URL, base_headers } from "../services"

export const useFetch = (path, keys=[]) => {
    const [data, setData] = useState()
    const [query, setQuery] = useState(0)

    const fetchData = async () => {
        const response = await fetch(`${BASE_URL}/${path}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })

        const result = await response.json()

        if(response.status === 200) {
            setData(result.data)

        }
    }

    useEffect(() => {
        fetchData()
    }, [query, ...keys])

    const invalidate = () => setQuery(q => q+1)

    return {data, invalidate}
}