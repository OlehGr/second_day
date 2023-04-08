import { useNavigate } from "react-router-dom"
import { ProjectForm } from "./ProjectForm"

export const CreateProject = () => {
    const navi = useNavigate()

    return <>
        <main className="container-md py-4">
            <div className="pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Мои объекты</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Создание объекта</li>
                    </ol>
                </nav>
                <h1>Создание объекта</h1>
            </div>
            
            <ProjectForm path={'project'} success={() => navi('/')} />
        </main>
    </>
}