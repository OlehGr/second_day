import { useParams } from "react-router-dom"
import { useControl, useMutate } from "./hooks"
import { MapErrors } from "./MapErros"
import { useEffect } from "react"

export const HouseForm = ({def, method, path, success, btnText='Создать'}) => {
    const [name, namemode, setname] = useControl()
    const [address, addressmode, setaddress] = useControl()
    const [built_year, built_yearmode, setbuilt_year] = useControl()
    const [built_quarter, built_quartermode, setbuilt_quarter] = useControl()


    const {projectId} = useParams()

    const {mutate, isLoading, isSuccess, error} = useMutate({
        path, method,
        body: !!projectId ? {name, address, built_year, built_quarter, project_id: projectId} : {name, address, built_year, built_quarter}
    })

    useEffect(() => {
        if(!def) return
        setname(def.name)
        setaddress(def.address)
        setbuilt_year(def.built_year)
        setbuilt_quarter(def.built_quarter)
    }, [def])

    useEffect(() => {
        if(isSuccess) success()
    }, [isSuccess])

    return <>
        {!!error && <MapErrors errors={error.errors} />}

        <form className="bd-example border p-4" onSubmit={e => {
            e.preventDefault()
            mutate()
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Название</label>
                <input type="text" className="form-control" id="name" {...namemode} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Адрес</label>
                <input type="text" className="form-control" id="address" {...addressmode} />
            </div>
            <div className="mb-3">
                <label htmlFor="built_year" className="form-label">Год сдачи</label>
                <input type="number" className="form-control" id="built_year" {...built_yearmode} />
            </div>
            <div className="mb-3">
                <label htmlFor="built_quarter" className="form-label">Квартал сдачи</label>
                <input type="number" className="form-control" id="built_quarter" {...built_quartermode} />
            </div>
            <button disabled={isLoading} type="submit" className="btn btn-success">{btnText}</button>
        </form>
    </>
}