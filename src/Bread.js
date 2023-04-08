import { Link, useParams } from "react-router-dom"
import { useFetch } from "./hooks"

export const Bread = () => {


    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="./projects.html">Мои объекты</a></li>
            <li className="breadcrumb-item"><a href="./projectEdit.html">Название объекта</a></li>
            <li className="breadcrumb-item active" aria-current="page">Шахматка</li>
        </ol>
    </nav>
}

export const ToProject = ({prId}) => {
    const {projectId} = useParams()

    const {data} = useFetch(`project/${prId || projectId}`)

    return <Link to={`/projectEdit/${prId || projectId}`}>
        {data?.name}
    </Link>
}

export const ToHouse = ({hId}) => {
    const {projectId, houseId} = useParams()

    const house = useFetch(`house/${hId ||houseId}`)


    return <Link to={`/houseEdit/${projectId}/${hId || houseId}`}>
        {house.data?.name}
    </Link>
}