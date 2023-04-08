import { useState } from "react"
import { BASE_URL, base_headers } from "../services"

const sucStatus = [200, 201, 204]

export const useMutate = ({path, body, method='POST', onEnd}) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState()

    const mutate = async () => {
        setLoading(true)

        const response = await fetch(`${BASE_URL}/${path}`, {
            method,
            headers: {
                ...base_headers,
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })

        let result = {}

        try {
            result = await response.json()
        } catch (err) {}

        if(sucStatus.includes(response.status)) {
            setData(result.data)
            setSuccess(true)
            setError(null)
        } else {
            setError(result.error)
            setSuccess(false)
            setData(null)
        }

        setLoading(false)

        if(!!onEnd) onEnd()
    }

    return [mutate, {isLoading, isSuccess, data, error}]
}