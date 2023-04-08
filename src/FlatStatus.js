import { useEffect } from "react"
import { useControl, useMutate } from "./hooks"

export const FlatStatus = ({id, flat_number, status, rooms, size, price, invalidate}) => {
    const [flatSt, stmod] = useControl(status)

    const {mutate} = useMutate({
        path: `flat/${id}`,
        method: 'PATCH',
        body: {
            status: flatSt
        },
        onEnd: invalidate
    })
    useEffect(() => {
        if(!!flatSt && flatSt !== status) mutate()
    }, [flatSt])


    return <td id="1025">
        <span className="" data-bs-toggle="tooltip" data-bs-html="true"
            title={`Площадь:<br>${size} кв.м.<br>Стоимость:<br>${price}р.`}>
            <b>{rooms || 'С'}{!!rooms && 'к'}</b> Квартира №{flat_number}</span>
        <form>
            <select className="form-select" name="status" {...stmod}>
                <option value="free">Свободна</option>
                <option value="reserved">Бронь</option>
                <option value="sold">Продана</option>
            </select>
        </form>
    </td>
}