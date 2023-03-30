import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";
import { useMutate } from "../../hooks/useMutate";
import MapErrors from "../../MapErrors/MapErrors";
import { orderErrors } from "../../services/services";

const ProjectForm = ({defaultValues, invalidate}) => {
    const [name, nameControl, setName] = useControl()
    const [coords, coordsControl, setCoords] = useControl()
    const [district, districtControl, setDistrict] = useControl()
    const [website, websiteControl, setWebsite] = useControl()

    useEffect(() => {
        if(!defaultValues) return
        setName(defaultValues.name)
        setCoords(defaultValues.coords)
        setDistrict(defaultValues.district)
        setWebsite(defaultValues.website)
    }, [defaultValues])

    const {projectId} = useParams()

    const [changeProject, {data, isSuccess, isLoading, error}] = useMutate({
        path: `/project/${projectId}`,
        method: 'PATCH',
        body: {
            name, coords, district, website
        },
        onEnd: invalidate
    })

    return (
        <>
            {!!error && <MapErrors errors={orderErrors(error.errors)} />}
            <form className="bd-example border p-4 mb-4" onSubmit={e => {
                e.preventDefault()
                changeProject()
            }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название</label>
                        <input type="text" className="form-control" id="name" {...nameControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coords" className="form-label">Координаты</label>
                        <input type="text" className="form-control" id="coords" aria-describedby="coordsHelp" {...coordsControl} />
                        <div id="coordsHelp" className="form-text">Пр. 47.241768, 39.800856</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className="form-label">Район</label>
                        <input type="text" className="form-control" id="district" {...districtControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="website" className="form-label">Сайт</label>
                        <input type="text" className="form-control" id="website" {...websiteControl} />
                    </div>
                    <button disabled={isLoading || !name || !coords || !district || !website} type="submit" className="btn btn-success">Сохранить</button>
            </form>
        </>
    );
}

export default ProjectForm;