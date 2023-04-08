import { useParams } from "react-router-dom"
import { ToProject } from "./Bread"
import { serializeHouseFlats, useControl, useFetch } from "./hooks"
import { FlatStatus } from "./FlatStatus"
import { useEffect } from "react"

export const Table = () => {
    const {projectId} = useParams()
    const project = useFetch(`project/${projectId}`)

    const [house, hmod, setH] = useControl()

    const houseflats = useFetch(`house/${house}/flats`, [house])

    const secFlrFlts = serializeHouseFlats(houseflats.data?.flats)

    useEffect(() => {
        if(project.data) setH(project.data.houses[0].id)
    }, [project.data])
    return <>
        <main className="py-4">
        <div className="container-md">
            <div className="pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Мои объекты</a></li>
                        <li className="breadcrumb-item"><ToProject /></li>
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
                        <select className="form-select" {...hmod}>
                            {
                               project.data?.houses.map(h => <option key={h.id} value={h.id}>{h.name}</option>) 
                            }
                        </select>
                    </div>
                </div>

            </form>
        </div>
        <div className="grid-flat border">
            <div className="grid-flat__scroll">
                {
                    secFlrFlts?.map(([sec, flrflts]) => {


                        return <table className="table table-bordered" key={sec.id}>
                            <thead>
                                <tr>
                                    <th colSpan="7">Подъезд №{sec.number}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    flrflts.map(([flr, flats], i) => {

                                        return <tr key={i}>
                                            <th scope="row">Э{flr}</th>
                                            {
                                                flats.map(f => <FlatStatus key={f.id} {...f} invalidate={houseflats.invalidate} />)
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
}