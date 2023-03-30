import { Link } from "react-router-dom"

const Project = ({id, name, flat_statuses: {free, sold, reserved}}) => {
    const countFlats = free + sold + reserved

    const freeVal = free / countFlats * 100
    const soldVal = sold / countFlats * 100
    const reservedVal = reserved / countFlats * 100

    return (
        <>
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-3">{name}</h5>
                        <p className="text-muted mb-2">Статус продаж</p>
                        <div className="progress mb-4">
                            <div className="progress-bar bg-success" title="В продаже" role="progressbar" style={{width: `${freeVal}%`}} aria-valuenow={freeVal}
                                aria-valuemin="0" aria-valuemax="100">{freeVal > 0 ? freeVal.toFixed(1) : ''}</div>
                            <div className="progress-bar bg-warning" title="Забронировано" role="progressbar" style={{width: `${reservedVal}%`}}
                                aria-valuenow={reservedVal} aria-valuemin="0" aria-valuemax="100">{reservedVal > 0 ? reservedVal.toFixed(1) : ''}</div>
                            <div className="progress-bar bg-danger" title="Продано" role="progressbar" style={{width: `${soldVal}%`}} aria-valuenow={soldVal}
                                aria-valuemin="0" aria-valuemax="100">{soldVal > 0 ? soldVal.toFixed(1) : ''}</div>
                        </div>
                        <Link to={`/projectEdit/${id}`} className="btn btn-primary btn-sm" style={{marginRight: 4}}>
                            <i className="bi bi-pencil-square"></i> Редактировать
                        </Link>
                        <Link to={`/table/${id}`} className="btn btn-primary btn-sm">
                            <i className="bi bi-table"></i> Шахматка
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;