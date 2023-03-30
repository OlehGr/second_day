import { Link, useHref, useLocation, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProjectForm from "./ProjectForm/ProjectForm";

const CurrentProjectPage = () => {
    const {projectId} = useParams()
    
    const {data, invalidate} = useFetch(`/project/${projectId}`)

    console.log(data?.houses);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" to="./projects.html">Шахматки</Link>
                </div>
            </nav>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Редактирование – {data?.name}</li>
                        </ol>
                    </nav>
                    <h1>Редактирование – {data?.name}</h1>
                </div>
                <ProjectForm defaultValues={data} invalidate={invalidate} />
                <div className="bd-example border p-4 mb-5">
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
                            data?.houses.map((house, index) => (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{house.name}</h5>
                                            <Link to={`/houseEdit/${projectId}/${house.id}`} className="btn btn-primary btn-sm">
                                                <i className="bi bi-pencil-square"></i> Редактировать
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </main>
        </>
    );
}

export default CurrentProjectPage;