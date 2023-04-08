import { useEffect, useState } from "react"
import { useControl } from "../hooks/useControl"
import { useMutate } from "../hooks/useMutate"

export const FlatStatus = ({id, defstatus, flat_number, rooms, price, size, invalidate}) => {
    const [status, control, setStatus] = useControl(defstatus)

    const [changeStatus] = useMutate({
        path: `flat/${id}`,
        method: 'PATCH',
        body: {
            status
        },
        onEnd: invalidate
    })

    useEffect(()=> {
        if(!!status && status !== defstatus) changeStatus()
    }, [status])

    const [isOpen, setOpen] = useState(false)
    return <>
        <td id="1025" onMouseEnter={e => setOpen(true)} onMouseLeave={e => setOpen(false)}>
            
            <span className="" data-bs-toggle="tooltip" data-bs-html="true"
                title={`Площадь:<br>${size} кв.м.<br>Стоимость:<br>${price}р.`}>
                <b>{rooms || 'C'}{!!rooms && 'к'}</b> Квартира №{flat_number}</span>
            <form>
                <select className="form-select" name="status" {...control}>
                    <option value="free">Свободна</option>
                    <option value="reserved">Бронь</option>
                    <option value="sold">Продана</option>
                </select>
            </form>
        </td>
    </>
}