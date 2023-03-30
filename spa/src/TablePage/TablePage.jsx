import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useControl from "../hooks/useControl";
import { useFetch } from "../hooks/useFetch";
import { serializeHouseFlats } from "../services/services";
import ChangeFlatStatus from "./ChangeFlatStatus";

const TablePage = () => {
    const {projectId} = useParams()
    const project = useFetch(`/project/${projectId}`)

    const [houseId, controlHouseId, setHouseId] = useControl()

    useEffect(() => {
        if(!!project.data) setHouseId(project.data.houses[0].id)
    }, [project.data])

    const {data, invalidate} = useFetch(`/house/${houseId}/flats`, [houseId])

    const houseFlats = serializeHouseFlats(data?.flats)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" to="/">Шахматки</Link>
                </div>
            </nav>
            <main className="py-4">
                <div className="container-md">
                    <div className="pb-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                                <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Шахматка</li>
                            </ol>
                        </nav>
                        <h1>{project.data?.name}</h1>
                    </div>

                    <ul className="list-group list-group-horizontal mb-4">
                        <li className="list-group-item">Район: {project.data?.district}</li>
                        <li className="list-group-item">Сайт: <a href={project.data?.website}
                                target="_blank">{project.data?.website}</a></li>
                    </ul>

                    <h3 className="mb-3">Квартиры</h3>

                    <form className="bd-example border p-4 mb-4">
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label">Дом</label>
                            </div>
                            <div className="col-auto">
                                <select className="form-select" {...controlHouseId}>
                                    {
                                        project.data?.houses.map(house => <option key={house.id} value={house.id}>{house.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="grid-flat border">
            <div className="grid-flat__scroll">
                {
                    houseFlats?.map(([section, floorWithFlats], index) => {
                        return <table className="table table-bordered" key={index}>
                        <thead>
                            <tr>
                                <th colSpan="7">Подъезд №{section.number}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                floorWithFlats.map(([floor, flats], index) => {

                                    return <tr key={index}>
                                                <th scope="row">Э{floor}</th>
                                                {
                                                    flats.map((flat) => {
                                                        return <td id={flat.id} key={flat.id}>
                                                                    <span className="" data-bs-toggle="tooltip" data-bs-html="true"
                                                                        title={`Площадь:<br>${flat.size} кв.м.<br>Стоимость:<br>${flat.price}р.`}>
                                                                        <b>{!!flat.rooms ? `${flat.rooms}к` : 'C'}</b> Квартира №{flat.flat_number}</span>
                                                                    <ChangeFlatStatus defaultStatus={flat.status} flatId={flat.id} invalidate={invalidate}  />
                                                                </td>
                                                    })
                                                }
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                    })
                }
                
                </div>
                </div>
            </main>
        </>
    );
}

export default TablePage;