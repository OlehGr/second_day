import { useEffect, useState } from "react"
import { BASE_URL, base_headers } from "../services/services"


export const useFetch = (path, keys=[]) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const [query, newQuery] = useState(0)

    const fetchData = async () => {
        const response = await fetch(`${BASE_URL}${path}`, {
            headers: {
                ...base_headers,
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        const result  = await response.json()
         

        if(response.status === 200) {
            setData(result.data)
            setStatus(200)
        } else {
            setError(result.error)
            setStatus(response.status)
        }
    }

    useEffect(() => {
        fetchData()
    }, [query, ...keys])

    const invalidate = () => newQuery(q => q+1)

    return {data, error, status, invalidate}
}
