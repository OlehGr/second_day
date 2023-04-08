import { useEffect } from "react"
import { useControl, useMutate } from "./hooks"
import { useParams } from "react-router-dom"
import { MapErrors } from "./MapErros"

export const ProjectForm = ({def, method, path, success, btnText='Создать'}) => {
    const [name, namemode, setname] = useControl()
    const [coords, coordsmode, setcoords] = useControl()
    const [district, districtmode, setdistrict] = useControl()
    const [website, websitemode, setwebsite] = useControl()


    const {mutate, isLoading, isSuccess,error} = useMutate({
        path, method,
        body: {name, district, coords, website}
    })

    useEffect(() => {
        if(!def) return
        setname(def.name)
        setcoords(def.coords)
        setdistrict(def.district)
        setwebsite(def.website)
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
                <label htmlFor="coords" className="form-label">Координаты</label>
                <input type="text" className="form-control" id="coords" aria-describedby="coordsHelp" {...coordsmode} />
                <div id="coordsHelp" className="form-text">Пр. 47.241768, 39.800856</div>
            </div>
            <div className="mb-3">
                <label htmlFor="district" className="form-label">Район</label>
                <input type="text" className="form-control" id="district" {...districtmode} />
            </div>
            <div className="mb-3">
                <label htmlFor="website" className="form-label">Сайт</label>
                <input type="text" className="form-control" id="website" {...websitemode} />
            </div>
            <button disabled={isLoading} type="submit" className="btn btn-success">{btnText}</button>
        </form>
    </>
}