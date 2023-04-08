import {useParams, useNavigate, Link} from "react-router-dom"
import { HouseForm } from "./HouseForm"
import { useFetch } from "../hooks/useFetch"
export const CreateHouse = () => {
    const {projectId} = useParams()

    const navigate = useNavigate()

    const {data, invalidate} = useFetch(`project/${projectId}`)

    return <>

        <main class="container-md py-4">
                <div class="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li class="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{data?.name}</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Создание дома</li>
                        </ol>
                    </nav>
                    <h1>Создание дома</h1>
                </div>
                
            <HouseForm path={'house'} onSuccess={() => navigate(`/projectEdit/${projectId}`)} />
        </main>
    </>
}