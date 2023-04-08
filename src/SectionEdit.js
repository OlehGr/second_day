import { useParams } from "react-router-dom"
import { ToHouse, ToProject } from "./Bread"
import { serializeSectionFlats, useFetch } from "./hooks"
import { FlatTypeForm } from "./FlatTypeForm"
import { useState } from "react"
import { MapErrors } from "./MapErros"

export const SectionEdit = () => {
    const {sectionId} = useParams()
    const section = useFetch(`section/${sectionId}`)


    const {floorTypes, FloorsFlats} = serializeSectionFlats(section.data?.flats)

    const [error, setError] = useState()
    return <>
        <main className="py-4">
            <div className="container-md pb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="./projects.html">Мои объекты</a></li>
                        <li className="breadcrumb-item"><ToProject /></li>
                        <li className="breadcrumb-item"><ToHouse /></li>
                        <li className="breadcrumb-item active" aria-current="page">Редактирование подъезда №{section.data?.number}</li>
                    </ol>
                </nav>
                <h1>Редактирование подъезда №{section.data?.number}</h1>
            </div>
            
            <div className="grid-flat">
                <div className="grid-flat__scroll">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan="7">Подъезд №{section.data?.number}</th>
                            </tr>
                            <tr>
                                <th scope="col">Этаж</th>
                                {
                                    floorTypes?.map((t, index) => <th key={index} scope="col">{t.rooms || 'С'}{!!t.rooms && 'к'}<br/>{t.size || 0} кв.м.<br/>{t.price || 0} р.</th>)
                                }
                            </tr>
                        </thead>
                    
                        <tbody>
                            {
                                FloorsFlats?.map(([flr, flats], index) => {


                                    return <tr key={index}>
                                        <th scope="row">{flr}</th>
                                        {
                                            flats.map(f => <td id={f.id}>Квартира №{f.flat_number}</td>)
                                        }
                                    </tr>
                                })
                            }
                            <tr>
                                <td colSpan="7"></td>
                            </tr>
                            <tr>
                                <td></td>
                                
                                    {
                                        floorTypes?.map((t, i) => {
                                            return <td key={i}><FlatTypeForm key={i} def={t} {...{setError}} success={section.invalidate} 
                                            flats={FloorsFlats.map(([flr, flts]) => flts[i].id)} /></td>
                                        })
                                    }
                                    
                                
                            </tr>
                        </tbody>

                    </table>

                </div>
                {!!error && <MapErrors errors={error.errors} />}
            </div>
        </main>
    </>
}