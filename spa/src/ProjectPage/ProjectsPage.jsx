import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AuthMixin, useAuth } from "../Providers/AuthContext/AuthContext";
import "./body-0.css"
import Project from "./Project/Project";

const ProjectPage = () => {

    const {data} = useFetch('/project')

    
    return (
        <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-md">
                        <Link className="navbar-brand" to="/">Шахматки</Link>
                    </div>
                </nav>
                <main className="container-md py-4">
                    <div className="pb-4">
                        <div className="d-flex justify-content-between">
                            <div>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">Мои объекты</li>
                                    </ol>
                                </nav>
                                <h1>Мои объекты</h1>
                            </div>
                            <div>
                                <Link to={'/createProject'} className="btn btn-primary">
                                    Создать объект
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-3 g-3">
                        {
                            data?.map((project, index) => <Project key={index} {...project} />)
                        }
                    </div>
                </main>
        </>
    )
}

export default ProjectPage;