import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import MapErrors from "../../../MapErrors/MapErrors";
import { serializeFlats } from "../../../services/services";
import FlatsForm from "./FlatsForm";

const SectionEdit = () => {
    const {sectionId, houseId, projectId} = useParams()

    const section = useFetch(`/section/${sectionId}`)
    const house = useFetch(`/house/${houseId}`)
    const project = useFetch(`/project/${projectId}`)

    const {flatsOnFloor, floorsWithFlats, flatTypes} = serializeFlats(section.data)

    const [errors, setErrors] = useState()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" to="/">Шахматки</Link>
                </div>
            </nav>
            <main className="py-4">
                <div className="container-md pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                            <li className="breadcrumb-item"><Link to={`/houseEdit/${projectId}/${houseId}`}>{house.data?.name}</Link></li>
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
                                    <th colSpan="7">Подъезд №1</th>
                                </tr>
                                <tr>
                                    <th scope="col">Этаж</th>
                                    {
                                        flatTypes?.map((flat, index) => {
                                            const rooms = +flat.rooms
                                            return <th key={index} scope="col">
                                                       { rooms !== 0 ? <>{rooms}к</> : 'C'}<br/>
                                                       {flat.size} кв.м.<br/>
                                                       {flat.price} р.
                                                    </th>
                                        }
                                            
                                        )
                                    }
                                </tr>
                            </thead>
                        
                            <tbody>
                                {
                                    floorsWithFlats?.map(floor_flats => {

                                        return <tr key={floor_flats[0]}>
                                            <th scope="row">{floor_flats[0]}</th>
                                            {
                                                floor_flats[1].map(flat => <td key={flat.id}>Квартира №{flat.flat_number}</td>)
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
                                        flatTypes?.map((flat, index) => <FlatsForm key={index} 
                                                                                    defualtValues={flat} 
                                                                                    flatsIdArr={
                                                                                        floorsWithFlats.map(([floor, flats]) => flats).map(flatArr => flatArr[index].id)
                                                                                    }
                                                                                    invalidateFlats={section.invalidate}
                                                                                    {...{setErrors}}
                                                                                    />)
                                    }
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    {errors && <MapErrors errors={errors} extraClass={'m-0'} style={{maxWidth: '100%'}} />}

                </div>
            </main>
        </>
    );
}

export default SectionEdit;