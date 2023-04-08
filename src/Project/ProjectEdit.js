import { useFetch } from "../hooks/useFetch";
import { ProjectForm } from "./ProjectForm";
import {useParams, Link} from "react-router-dom"

const ProjectEdit = () => {
    const {projectId} = useParams()


    const {data, invalidate} = useFetch(`project/${projectId}`)
    

    return (
        <>
            <main class="container-md py-4">
        <div class="pb-4">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link href="/">Мои объекты</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Редактирование – {data?.name}</li>
                </ol>
            </nav>
            <h1>Редактирование – {data?.name}</h1>
        </div>
        <ProjectForm defaultValues={data} path={`project/${projectId}`} method={'PATCH'} onSuccess={invalidate} btntext={'Сохранить'} />

        <div class="bd-example border p-4 mb-5 mt-4">
            <div class="d-flex justify-content-between">
                <div>
                    <h3 class="mb-3">Дома</h3>
                </div>
                <div>
                    <Link to={`/projectEdit/${projectId}/newHouse`} class="btn btn-primary">
                        Создать дом
                    </Link>
                </div>
            </div>
        </div>
        <div class="row row-cols-3 g-3">
                {
                    data?.houses.map((house) => {
                        return <div class="col" key={house.id}>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">{house.name}</h5>
                                    <Link to={`/houseEdit/${projectId}/${house.id}`} class="btn btn-primary btn-sm">
                                        <i class="bi bi-pencil-square"></i> Редактировать
                                    </Link>
                                </div>
                            </div>
                        </div>
                    })
                }
                
            </div>
    </main>
        </>
    );
}

export default ProjectEdit;