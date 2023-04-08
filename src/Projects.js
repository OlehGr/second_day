import { Link } from "react-router-dom"
import { useFetch } from "./hooks"

export const Projects = () => {
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
                        <Link to={'/projectCreate'} className="btn btn-primary">
                            Создать объект
                        </Link>
                    </div>
                </div>
            </div>


            <div className="row row-cols-3 g-3">

                {
                    data?.map(pr => {
                        const full = pr.flat_statuses.free + pr.flat_statuses.sold + pr.flat_statuses.reserved
                        const free = pr.flat_statuses.free / full * 100
                        const reserved = pr.flat_statuses.reserved / full * 100
                        const sold = pr.flat_statuses.sold / full * 100


                        const numorno = n => (!!n && +n > 0) ? Number(n).toFixed(1) : ''

                        return <div className="col" key={pr.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{pr.name}</h5>
                                    <p className="text-muted mb-2">Статус продаж</p>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-success" title="В продаже" role="progressbar" style={{width: `${free}%`}} aria-valuenow={free}
                                            aria-valuemin="0" aria-valuemax="100">{numorno(free)}</div>
                                        <div className="progress-bar bg-warning" title="Забронировано" role="progressbar" style={{width: `${reserved}%`}}
                                            aria-valuenow={reserved} aria-valuemin="0" aria-valuemax="100">{numorno(reserved)}</div>
                                        <div className="progress-bar bg-danger" title="Продано" role="progressbar" style={{width: `${sold}%`}} aria-valuenow={sold}
                                            aria-valuemin="0" aria-valuemax="100">{numorno(sold)}</div>
                                    </div>
                                    <Link to={"/projectEdit/"+pr.id} className="btn btn-primary btn-sm" style={{marginRight: 4}}>
                                        <i className="bi bi-pencil-square"></i> Редактировать
                                    </Link>
                                    <Link to={"/table/"+pr.id} className="btn btn-primary btn-sm">
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