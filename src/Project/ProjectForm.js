import { useEffect } from "react"
import { useControl } from "../hooks/useControl"
import { useMutate } from "../hooks/useMutate"
import { MapErrors } from "../MapErrors"
import { orderErrors } from "../services"

export const ProjectForm = ({defaultValues, method, path, onEnd, onSuccess, btntext='Создать'}) => {
    const [name, namecon, setname] = useControl()
    const [coords, coordscon, setcoords] = useControl()
    const [district, districtcon, setdistrict] = useControl()
    const [website, websitecon, setwebsite] = useControl()

    useEffect(() => {
        if(!defaultValues) return
        setname(defaultValues.name)
        setcoords(defaultValues.coords)
        setdistrict(defaultValues.district)
        setwebsite(defaultValues.website)
    }, [defaultValues])


    const [mutateProject, {error, isSuccess, isLoading}] = useMutate({
        path, method, onEnd,
        body: {name, coords, district, website}
    })

    useEffect(() => {
        if(isSuccess) onSuccess()
    }, [isSuccess])

    return <>
        {!!error && <MapErrors errors={orderErrors(error.errors)} />}
        <form className="bd-example border p-4" onSubmit={e => {
            e.preventDefault()
            mutateProject()
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Название</label>
                <input type="text" className="form-control" id="name" {...namecon} />
            </div>
            <div className="mb-3">
                <label htmlFor="coords" className="form-label">Координаты</label>
                <input type="text" className="form-control" id="coords" aria-describedby="coordsHelp" {...coordscon} />
                <div id="coordsHelp" className="form-text">Пр. 47.241768, 39.800856</div>
            </div>
            <div className="mb-3">
                <label htmlFor="district" className="form-label">Район</label>
                <input type="text" className="form-control" id="district" {...districtcon} />
            </div>
            <div className="mb-3">
                <label htmlFor="website" className="form-label">Сайт</label>
                <input type="text" className="form-control" id="website" {...websitecon} />
            </div>
            <button disabled={isLoading || !name || !coords || !district || !website} type="submit" className="btn btn-success">{btntext}</button>
        </form>
    </>
}