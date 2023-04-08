import { useEffect } from "react"
import { useControl } from "../hooks/useControl"
import { useMutate } from "../hooks/useMutate"
import { orderErrors } from "../services"

export const FlatsUpdate = ({type, index, flatsWithFloors, invalidate, setErrors}) => {


    const flatsId = flatsWithFloors?.map(([fl, fts]) => fts[index].id)

    const [size, sizecon, setsize] = useControl()
    const [rooms, roomscon, setrooms] = useControl()
    const [price, pricecon, setprice] = useControl()

    useEffect(() => {
        setsize(type.size||0)
        setprice(type.price||0)
        setrooms(type.rooms||0)
    }, [type])


    const [mutateFlats, {error, isSuccess, isLoading}] = useMutate({
        path: 'flat', method: "PATCH", onEnd: invalidate,
        body: {size, rooms, price, flats:flatsId}
    })

    useEffect(()=> {
        setErrors(error?.errors)
    }, [error]) 

    return <td key={index}>
    <form onSubmit={e => {
        e.preventDefault()
        mutateFlats()
    }}>
        <div className="mb-3">
            <label htmlFor="size" className="form-label">Площадь</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="size" {...sizecon} />
        </div>
        <div className="mb-3">
            <label htmlFor="rooms" className="form-label">Комнат</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="rooms"{...roomscon}/>
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Цена</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="price" {...pricecon} />
        </div>
        <button type="submit" className="btn btn-success btn-sm">Сохранить</button>
    </form>
</td>
}