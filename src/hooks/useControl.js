import { useState } from "react"

export const useControl = (defaultValue='') => {
    const [value, setValue] = useState(defaultValue)

    const onChange = e => setValue(e.target.value)


    return [value, {value, onChange}, setValue]
}