import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useControl from "../../../hooks/useControl";
import { useFetch } from "../../../hooks/useFetch";
import { useMutate } from "../../../hooks/useMutate";
import MapErrors from "../../../MapErrors/MapErrors";
import { orderErrors } from "../../../services/services";

const CreateSection = () => {
    const {sectionId, houseId, projectId} = useParams()
    const navigate = useNavigate()

    const house = useFetch(`/house/${houseId}`)
    const project = useFetch(`/project/${projectId}`)


    const [number, numberControl, setNumber] = useControl()
    const [floors, floorsControl, setFloors] = useControl()
    const [flats_on_floor, flats_on_floorControl, setFlats_on_floor] = useControl()
    const [starting_flat_number, starting_flat_numberControl, setStarting_flat_number] = useControl()

    const [createSection, {isLoading, isSuccess, error}] = useMutate({
        path: '/section',
        body: {
            number, floors, flats_on_floor, starting_flat_number, house_id: houseId
        }
    })

    useEffect(() => {
        if(isSuccess) navigate(`/houseEdit/${projectId}/${houseId}`)
    }, [isSuccess])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" to="/">Шахматки</Link>
                </div>
            </nav>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                            <li className="breadcrumb-item"><Link to={`/houseEdit/${projectId}/${houseId}`}>{house.data?.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Создание подъезда</li>
                        </ol>
                    </nav>
                    <h1>Создание подъезда</h1>
                </div>
                <form className="bd-example border p-4" onSubmit={e => {
                    e.preventDefault()
                    createSection()
                }}>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Номер подъезда</label>
                        <input type="number" className="form-control" id="number" {...numberControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="floors" className="form-label">Количество этажей</label>
                        <input type="number" className="form-control" id="floors" {...floorsControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="flats_on_floor" className="form-label">Количество квартир на этаже</label>
                        <input type="number" className="form-control" id="flats_on_floor" {...flats_on_floorControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="starting_flat_number" className="form-label">Номер первой квартиры</label>
                        <input type="number" className="form-control" id="starting_flat_number" {...starting_flat_numberControl} />
                    </div>
                    <button disabled={isLoading || !number || !floors || !flats_on_floor || !starting_flat_number} type="submit" className="btn btn-success">Создать</button>
                </form>
                {!!error && <MapErrors errors={orderErrors(error.errors)} />}
            </main>
        </>
    );
}

export default CreateSection;