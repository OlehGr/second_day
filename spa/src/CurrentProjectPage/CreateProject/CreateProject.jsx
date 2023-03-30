import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useControl from "../../hooks/useControl"
import { useMutate } from "../../hooks/useMutate"
import MapErrors from "../../MapErrors/MapErrors"
import { orderErrors } from "../../services/services"

const CreateProject = () => {
    const [name, nameControl, setName] = useControl()
    const [coords, coordsControl, setCoords] = useControl()
    const [district, districtControl, setDistrict] = useControl()
    const [website, websiteControl, setWebsite] = useControl()

    const navigate = useNavigate()

    const [createProject, {data, isSuccess, isLoading, error}] = useMutate({
        path: `/project`,
        body: {
            name, coords, district, website
        },
    })

    useEffect(() => {
        if(isSuccess) navigate('/')
    }, [isSuccess])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" href="/">Шахматки</Link>
                </div>
            </nav>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Создание объекта</li>
                        </ol>
                    </nav>
                    <h1>Создание объекта</h1>
                </div>
                {!!error && <MapErrors errors={orderErrors(error.errors)} />}
                <form className="bd-example border p-4" onSubmit={e => {
                    e.preventDefault()
                    createProject()
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
                    <button disabled={isLoading || !name || !coords || !district || !website} type="submit" className="btn btn-success">Создать</button>
                </form>

            </main>
        </>
    );
}

export default CreateProject;