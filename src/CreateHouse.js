import { useNavigate, useParams } from "react-router-dom"
import { HouseForm } from "./HouseForm"
import { ToProject } from "./Bread"

export const CreateHouse = () => {
    const {projectId} = useParams()
    const navi = useNavigate()

    return <>
        <main className="container-md py-4">
            <div className="pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="./projects.html">Мои объекты</a></li>
                        <li className="breadcrumb-item"><ToProject /></li>
                        <li className="breadcrumb-item active" aria-current="page">Создание дома</li>
                    </ol>
                </nav>
                <h1>Создание дома</h1>
            </div>
            <HouseForm path={'house'} success={() => navi(`/projectEdit/${projectId}`)} />
        </main>
    </>
}