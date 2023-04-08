import { useFetch } from "../hooks/useFetch"
import {Link} from "react-router-dom"

export const Project = () => {

    const {data} = useFetch('project')

    return <>

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
                            <Link to="/projectCreate" className="btn btn-primary">
                                Создать объект
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-3 g-3">
                    
                    {
                        data?.map((project, index) => {
                            const prstatus = project.flat_statuses
                            const full = prstatus.free + prstatus.sold + prstatus.reserved
                            const freePr = prstatus.free / full * 100
                            const soldPr = prstatus.sold / full * 100
                            const reservedPr = prstatus.reserved / full * 100

                            const oneornull = n => n > 0 ? Number(n).toFixed(1) : ''

                            return <div className="col" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">{project.name}</h5>
                                        <p className="text-muted mb-2">Статус продаж</p>
                                        <div className="progress mb-4">
                                            <div className="progress-bar bg-success" title="В продаже" role="progressbar" style={{width: `${freePr}%`}} aria-valuenow="10"
                                                aria-valuemin="0" aria-valuemax="100">{oneornull(freePr)}</div>
                                            <div className="progress-bar bg-warning" title="Забронировано" role="progressbar" style={{width: `${reservedPr}%`}}
                                                aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">{oneornull(reservedPr)}</div>
                                            <div className="progress-bar bg-danger" title="Продано" role="progressbar" style={{width: `${soldPr}%`}} aria-valuenow="70"
                                                aria-valuemin="0" aria-valuemax="100">{oneornull(soldPr)}</div>
                                        </div>
                                        <Link to={`/projectEdit/${project.id}`} className="btn btn-primary btn-sm" style={{marginRight: 4}}>
                                            <i className="bi bi-pencil-square"></i> Редактировать
                                        </Link>
                                        <Link to={`/table/${project.id}`} className="btn btn-primary btn-sm">
                                            <i className="bi bi-table"></i> Шахматка
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    
                </div>
            </main>
    </>
}