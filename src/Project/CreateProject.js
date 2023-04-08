import {Link ,useNavigate} from "react-router-dom"
import { ProjectForm } from "./ProjectForm"

export const CreateProject = () => {
    const navigate = useNavigate()

    return <>

    <main class="container-md py-4">
            <div class="pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Создание объекта</li>
                    </ol>
                </nav>
                <h1>Создание объекта</h1>
            </div>
        
        <ProjectForm onSuccess={() => navigate('/')} path={'project'} />
    </main>
    </>
}