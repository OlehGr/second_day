import { useEffect } from "react";
import useControl from "../../../hooks/useControl";
import { useMutate } from "../../../hooks/useMutate";
import { orderErrors } from "../../../services/services";

const FlatsForm = ({defualtValues, flatsIdArr, invalidateFlats, setErrors}) => {
    const [size, sizeControl, setSize] = useControl()
    const [rooms, roomsControl, setRooms] = useControl()
    const [price, priceControl, setPrice] = useControl()

    useEffect(() => {
        if(!defualtValues) return
        setSize(`${+defualtValues.size}`)
        setRooms(`${+defualtValues.rooms}`)
        setPrice(`${+defualtValues.price}`)
    }, [defualtValues])

    const [updateFlats, {error, isLoading}] = useMutate({
        path: '/flat',
        method: 'PATCH',
        body: {
            size, rooms, price, flats: flatsIdArr
        },
        onEnd: invalidateFlats
    })

    useEffect(() => {
        setErrors(orderErrors(error?.errors))
    }, [error])

    return (
        <>
            <td>
                <form onSubmit={e => {
                    e.preventDefault()
                    updateFlats()
                }}>
                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Площадь</label>
                        <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                            id="size" {...sizeControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rooms" className="form-label">Комнат</label>
                        <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                                                    id="rooms" {...roomsControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Цена</label>
                        <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                            id="price" {...priceControl} />
                    </div>
                    <button disabled={isLoading || !size || !rooms || !price} type="submit" className="btn btn-success btn-sm">Сохранить</button>
                </form>
            </td>
        </>
    );
}

export default FlatsForm;