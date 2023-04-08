import { useEffect, useRef, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { useControl } from '../hooks/useControl'
import { useFetch } from '../hooks/useFetch'
import { serializeHouseFlats } from '../services'
import { FlatStatus } from './FlatStatus'


export const Table = () => {
    const [house, housecon, setHouse] = useControl()
    const {projectId} = useParams()
    const project = useFetch(`project/${projectId}`)

    const {data, invalidate} = useFetch(`house/${house}/flats`, [house])

    const serviceFlats = serializeHouseFlats(data?.flats)

    useEffect(() => {
        if(!!project.data) setHouse(project.data?.houses[0].id)
    }, [!!project.data])

    const script = useRef(null)

    useEffect(() => {
        if(!!script.current) document.querySelector('body').insertAdjacentHTML('afterend', `
            <script src="/js/popper.min.js"></script>
            <script>
                console.log('scripts working');
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl)
                })
            </script>
        `)
    }, [script])
   
    return <>
        <main className="py-4" ref={script}>
            <div className="container-md">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={"/projectEdit/"+projectId}>{project.data?.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Шахматка</li>
                        </ol>
                    </nav>
                    <h1>{project.data?.name}</h1>
                </div>

                <ul className="list-group list-group-horizontal mb-4">
                    <li className="list-group-item">Район: {project.data?.district}</li>
                    <li className="list-group-item">Сайт: <a href={project.data?.website}
                            target="_blank">{project.data?.website}/</a></li>
                </ul>

                <h3 className="mb-3">Квартиры</h3>

                <form className="bd-example border p-4 mb-4">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Дом</label>
                        </div>
                        <div className="col-auto">
                            <select className="form-select" {...housecon}>
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
                        serviceFlats?.map(([sec, flatFloors], i) => {

                            return <table key={i} className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colSpan="7">Подъезд №{sec.number}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        flatFloors.map(([flr, flats], i) => {

                                            return <tr key={i}>
                                                <th scope="row">Э{flr}</th>
                                                {
                                                    flats?.map(flat => <FlatStatus key={flat.id} {...flat} invalidate={invalidate} defstatus={flat.status} />)
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