import {Link, useParams} from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { orderErrors, serializeSectionFlats } from "../services"
import { useControl } from "../hooks/useControl"
import { useEffect, useState } from "react"
import { useMutate } from "../hooks/useMutate"
import { FlatsUpdate } from "./FlatsUpdate"
import { MapErrors } from "../MapErrors"

export const SectionEdit = () => {
    const {houseId, projectId, sectionId} = useParams()

    const project = useFetch(`project/${projectId}`)
    const house = useFetch(`house/${houseId}`)
    const {data, invalidate} = useFetch(`section/${sectionId}`)

    const {flatTypes, flatsWithFloors, floors} = serializeSectionFlats(data)


    const [errors, setErrors] = useState()
    
    return <>
        <main className="py-4">
            <div className="container-md pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                        <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                        <li className="breadcrumb-item"><Link to={`/houseEdit/${projectId}/${houseId}`}>{house.data?.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Редактирование подъезда №{data?.number}</li>
                    </ol>
                </nav>
                <h1>Редактирование подъезда №{data?.number}</h1>
            </div>

            <div className="grid-flat">
                <div className="grid-flat__scroll">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan="7">Подъезд №{data?.number}</th>
                            </tr>
                            <tr>
                                <th scope="col">Этаж</th>
                                {
                                    flatTypes?.map(t => <th key={t.id} scope="col">{t.rooms || 'C'}{!!t.rooms && 'к'}<br/>{t.size||0} кв.м.<br/>{t.price||0} р.</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {
                                flatsWithFloors?.map(([floor, flats], index) => {
                                    return <tr key={index}>
                                        <th scope="row">{floor}</th>
                                        {
                                            flats.map(f => <td key={f.id} id={f.id}>Квартира №{f.flat_number}</td>)
                                        }
                                    </tr>
                                })
                            }

                        <tr>
                            <td></td>
                            {
                                flatTypes?.map((type, index) => <FlatsUpdate key={index} {...{type, index, flatsWithFloors, invalidate, setErrors}} />)
                            }
                            
                        </tr>
                            
                        </tbody>
                        {/* <tr>
                            <td colSpan="7"></td>
                        </tr> */}
                        
                    </table>

                    
                </div>
                
            </div>
            
        </main>

    </>
}