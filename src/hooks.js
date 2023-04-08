import { useEffect, useState } from "react"


export const BASE_URL = 'http://127.0.0.1:8000/api/'
export const base_headers = {
    "Content-Type": "application/json"
}

export const useControl = (def='') => {
    const [value, setValue] = useState(def)

    const onChange = e => setValue(e.target.value)


    return [value, {value, onChange}, setValue]
}

export const useFetch = (path, keys=[]) => {
    const [data, setData] = useState()
    const [query, setQuery] = useState(0)


    const fetchData = async () => {
        const res = await fetch(BASE_URL+path, {
            headers: {...base_headers, "Authorization": "Bearer "+localStorage.getItem('token')},
        })

        const result = await res.json()

        if(res.status === 200) {
            setData(result.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [query, ...keys])

    const invalidate = () => {
        setQuery(q => q+1)
    }

    return {data, invalidate}
}

const good = [200, 201, 204]

export const useMutate = ({path, method='POST', body, onEnd}) => {
    const [data, setData] = useState()
    const [error, setErr] = useState()
    const [isLoading, setLoading] = useState()
    const [isSuccess, setSuccess] = useState()


    const mutate = async () => {
        setLoading(true)

        const res = await fetch(BASE_URL+path, {
            headers: {...base_headers, "Authorization": "Bearer "+localStorage.getItem('token')},
            body: JSON.stringify(body),
            method
        })

        let result = {}
        try {
            result = await res.json()

        } catch(err) {}

        if(good.includes(res.status)) {
            setData(result.data)
            setSuccess(true)
            setErr(null)
        } else {
            setErr(result.error)
            setData(null)
            setSuccess(false)
        }

        setLoading(false)

        if(!!onEnd) onEnd()
    }

    return {mutate, error, data, isLoading, isSuccess}
}


export const serializeSectionFlats = (flats) => {
    if(!flats) return {}

        const floors = [...new Set(flats.map(f => f.floor))].sort().reverse()

        const FloorsFlats = floors.map(flr => {

            return [flr, flats.filter(f => f.floor === flr)]
        })

        const floorTypes = flats.filter(f => f.floor ===1)

        return {floors, FloorsFlats, floorTypes}
}

export const serializeHouseFlats = flats => {
    if(!flats) return
    const sections = [...new Set(flats.map(f => JSON.stringify(f.section)))].map(s => JSON.parse(s))


    const SecFloorFlats = sections.map(sec => {
        const secFlats = flats.filter(f => f.section.id === sec.id)

        const floors = [...new Set(secFlats.map(f => f.floor))].sort().reverse()

        const FloorsFlats = floors.map(flr => {

            return [flr, secFlats.filter(f => f.floor === flr)]
        })

        return [sec, FloorsFlats]
    })

    return SecFloorFlats
}