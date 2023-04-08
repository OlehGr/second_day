import { Link, useParams } from "react-router-dom"
import { useFetch } from "./hooks"
import { ProjectForm } from "./ProjectForm"

export const ProjectEdit = () => {
    const {projectId} = useParams()
    const {data, invalidate} = useFetch(`project/${projectId}`)

    return <>
        <main className="container-md py-4">
            <div className="pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Мои объекты</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Редактирование – {data?.name}</li>
                    </ol>
                </nav>
                <h1>Редактирование – {data?.name}</h1>
            </div>

            <ProjectForm def={data} path={`project/${projectId}`} success={invalidate} method={'PATCH'} btnText="Сохранить" />
            
            <div className="bd-example border p-4 mb-5 mt-4">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 className="mb-3">Дома</h3>
                    </div>
                    <div>
                        <Link to={`/projectEdit/${projectId}/newHouse`} className="btn btn-primary">
                            Создать дом
                        </Link>
                    </div>
                </div>
                
                <div className="row row-cols-3 g-3">
                    {
                        data?.houses.map(h => <div className="col" key={h.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">{h.name}</h5>
                                        <Link to={"/houseEdit/"+projectId+'/'+h.id} className="btn btn-primary btn-sm">
                                            <i className="bi bi-pencil-square"></i> Редактировать
                                        </Link>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </main>
    </>
}