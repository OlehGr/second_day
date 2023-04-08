import { useFetch } from "../hooks/useFetch";
import { HouseForm } from "./HouseForm";
import {useParams, Link} from "react-router-dom"

const HouseEdit = () => {
    const {houseId, projectId} = useParams()


    const project = useFetch(`project/${projectId}`)
    const {data, invalidate} = useFetch(`house/${houseId}`)


    return (
        <>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Редактирование – Название дома</li>
                        </ol>
                    </nav>
                    <h1>Редактирование – {data?.name}</h1>
                </div>
                <HouseForm defaultValues={data} path={`house/${houseId}`} method={'PATCH'} onSuccess={invalidate} btntext={'Сохранить'} />
                <div className="bd-example border p-4 mb-5 mt-4">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="mb-3">Подъезды</h3>
                        </div>
                        <div>
                            <Link to={`newSection`} className="btn btn-primary">
                                Создать подъезд
                            </Link>
                        </div>
                    </div>
                    
                    <div className="row row-cols-3 g-3">
                        {
                            data?.sections.map(section => {
                                return <div className="col" key={section.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Подъезд №{section.number}</h5>
                                            <Link to={`/sectionEdit/${projectId}/${houseId}/${section.id}`} className="btn btn-primary btn-sm">
                                                <i className="bi bi-pencil-square"></i> Редактировать
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        
                    </div>
                </div>
            </main>
        </>
    );
}

export default HouseEdit;