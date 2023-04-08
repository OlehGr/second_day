import {useParams} from "react-router-dom"
import { useControl } from "../hooks/useControl"
import { useEffect } from "react"
import { MapErrors } from "../MapErrors"
import { orderErrors } from "../services"
import { useMutate } from "../hooks/useMutate"


export const HouseForm = ({defaultValues, method, path, onEnd, onSuccess, btntext='Создать'}) => {
    const [name, namecon, setname] = useControl()
    const [address, addresscon, setaddress] = useControl()
    const [built_year, built_yearcon, setbuilt_year] = useControl()
    const [built_quarter, built_quartercon, setbuilt_quarter] = useControl()

    useEffect(() => {
        if(!defaultValues) return
        setname(defaultValues.name)
        setaddress(defaultValues.address)
        setbuilt_year(defaultValues.built_year)
        setbuilt_quarter(defaultValues.built_quarter)
    }, [defaultValues])


    const {projectId} = useParams()

    const [mutateHouse, {error, isSuccess, isLoading}] = useMutate({
        path, method, onEnd,
        body: !!projectId ? {name, address, built_year, built_quarter, project_id: projectId} : {name, address, built_year, built_quarter,}
    })

    useEffect(() => {
        if(isSuccess) onSuccess()
    }, [isSuccess])

    return <>
        {!!error && <MapErrors errors={orderErrors(error.errors)} />}

        <form className="bd-example border p-4" onSubmit={e => {
            e.preventDefault()
            mutateHouse()
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Название</label>
                <input type="text" className="form-control" id="name" {...namecon} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Адрес</label>
                <input type="text" className="form-control" id="address" {...addresscon} />
            </div>
            <div className="mb-3">
                <label htmlFor="built_year" className="form-label">Год сдачи</label>
                <input type="number" className="form-control" id="built_year" {...built_yearcon} />
            </div>
            <div className="mb-3">
                <label htmlFor="built_quarter" className="form-label">Квартал сдачи</label>
                <input type="number" className="form-control" id="built_quarter" {...built_quartercon} />
            </div>
            <button disabled={isLoading || !name || !address || !built_year || !built_quarter} type="submit" className="btn btn-success">{btntext}</button>
        </form>

    </>
}