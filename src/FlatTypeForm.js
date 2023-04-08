import { useEffect } from "react"
import { useControl, useMutate } from "./hooks"

export const FlatTypeForm = ({def, success, flats, setError}) => {
    const [size, sizemode, setsize] = useControl()
    const [rooms, roomsmode, setrooms] = useControl()
    const [price, pricemode, setprice] = useControl()



    const {mutate, isLoading, isSuccess,error} = useMutate({
        path: 'flat', method: 'PATCH',
        body: {size, rooms, price, flats},
        
    })

    useEffect(() => {
        if(!def) return
        setsize(def.size || '0')
        setrooms(def.rooms || '0')
        setprice(def.price || '0')
    }, [def])

    useEffect(() => {
        setError(error)
    }, [error])


    

    return <>
    <form onSubmit={async e => {
        e.preventDefault()
        await mutate()
        success()
    }}>
        <div className="mb-3">
            <label htmlFor="size" className="form-label">Площадь</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="size" {...sizemode} />
        </div>
        <div className="mb-3">
            <label htmlFor="rooms" className="form-label">Комнат</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="rooms" {...roomsmode} />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Цена</label>
            <input type="text" className="form-control form-control-sm" style={{maxWidth: 90}}
                id="price" {...pricemode} />
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-success btn-sm">Сохранить</button>
    </form>
    </>
}