import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";
import { useFetch } from "../../hooks/useFetch";
import { useMutate } from "../../hooks/useMutate";
import MapErrors from "../../MapErrors/MapErrors";
import { orderErrors } from "../../services/services";

const NewHouse = () => {
    const {projectId} = useParams()
    const navigate = useNavigate()

    const {data} = useFetch(`/project/${projectId}`)

    const [name, nameControl, setName] = useControl()
    const [address, addressControl, setAddress] = useControl()
    const [built_year, built_yearControl, setBuilt_year] = useControl()
    const [built_quarter, built_quarterControl, setBuilt_quarter] = useControl()

    const [createHouse, {isLoading, isSuccess, error}] = useMutate({
        path: '/house',
        body: {
            name, address, built_year, built_quarter, project_id: projectId
        },
    })

    

    useEffect(() => {
        if(isSuccess) navigate(`/projectEdit/${projectId}`)
    }, [isSuccess])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" to="/">Шахматки</Link>
                </div>
            </nav>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{data?.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Создание дома</li>
                        </ol>
                    </nav>
                    <h1>Создание дома</h1>
                </div>
                {!!error && <MapErrors errors={orderErrors(error.errors)} />}
                <form className="bd-example border p-4" onSubmit={e => {
                    e.preventDefault()
                    createHouse()
                }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название</label>
                        <input type="text" className="form-control" id="name" {...nameControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Адрес</label>
                        <input type="text" className="form-control" id="address" {...addressControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="built_year" className="form-label">Год сдачи</label>
                        <input type="number" className="form-control" id="built_year" {...built_yearControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="built_quarter" className="form-label">Квартал сдачи</label>
                        <input type="number" className="form-control" id="built_quarter" {...built_quarterControl} />
                    </div>
                    <button disabled={isLoading || !name || !address || !built_year || !built_quarter} type="submit" className="btn btn-success">Создать</button>
                </form>

            </main>
        </>
    );
}

export default NewHouse;