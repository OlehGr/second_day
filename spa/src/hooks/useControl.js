import { useState } from "react";

const useControl = (defaultValue='') => {
    const [value, setValue] = useState(defaultValue)

    const onChange = e => {
        setValue(e.currentTarget.value)
    }

    return [value, {value, onChange}, setValue]
}

export default useControl;