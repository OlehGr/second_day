import { Link, useParams } from "react-router-dom"
import { useFetch } from "./hooks"
import { ToProject } from "./Bread"
import { HouseForm } from "./HouseForm"

export const HouseEdit = () => {
    const {houseId, projectId} = useParams()

    const house = useFetch(`house/${houseId}`)
    // const project = useFetch(`house/${projectId}`)


    return <>
        <main className="container-md py-4">
        <div className="pb-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./projects.html">Мои объекты</a></li>
                    <li className="breadcrumb-item"><ToProject /></li>
                    <li className="breadcrumb-item active" aria-current="page">Редактирование – {house.data?.name}</li>
                </ol>
            </nav>
            <h1>Редактирование – {house.data?.name}</h1>
        </div>

        <HouseForm path={`house/${houseId}`} method={'PATCH'} def={house.data} success={house.invalidate} btnText="Сохранить" />

        
        <div className="bd-example border p-4 mb-5 mt-4">
            <div className="d-flex justify-content-between">
                <div>
                    <h3 className="mb-3">Подъезды</h3>
                </div>
                <div>
                    <Link to={`/houseEdit/${projectId}/${houseId}/newSection`} className="btn btn-primary">
                        Создать подъезд
                    </Link>
                </div>
            </div>
            <div className="row row-cols-3 g-3">

                {
                    house.data?.sections.map(s => <div className="col" key={s.id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Подъезд №{s.number}</h5>
                            <Link to={`/sectionEdit/${projectId}/${houseId}/${s.id}`} className="btn btn-primary btn-sm">
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