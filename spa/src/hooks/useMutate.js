import { useState } from "react"
import { base_headers, BASE_URL } from "../services/services"

const successContent = [200, 201, 204]

export const useMutate = ({path, body, method="POST", onEnd}) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const [isSuccess, setSuccess] = useState()
    const [isLoading, setLoading] = useState(false)


    const mutate = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}${path}`, {
            method: method.toUpperCase(),
            body: JSON.stringify(body),
            headers: {
                ...base_headers,
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const result  = await response.json().catch(err => null)

        if(successContent.includes(response.status)) {
            setData(result?.data)
            setStatus(response.status)
            setSuccess(true)

            setError(null)
        } else {
            setError(result.error)
            setStatus(response.status)
            setSuccess(false)

            setData(null)
        } 

        setLoading(false)
        
        if(!!onEnd) {
            onEnd()
        }
    }

    return [mutate, {data, error, isSuccess, isLoading, status}]
}
