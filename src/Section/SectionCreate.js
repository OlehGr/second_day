import {Link, useParams, useNavigate} from "react-router-dom"
import { MapErrors } from "../MapErrors"
import { useControl } from "../hooks/useControl"
import { useMutate } from "../hooks/useMutate"
import { useFetch } from "../hooks/useFetch"
import { useEffect } from "react"
import { orderErrors } from "../services"


export const SectionCreate = () => {
    const {houseId, projectId} = useParams()
    const navigate = useNavigate()

    const project = useFetch(`project/${projectId}`)
    const house = useFetch(`house/${houseId}`) 



    const [number, numbercon, setnumber] = useControl()
    const [floors, floorscon, setfloors] = useControl()
    const [flats_on_floor, flats_on_floorscon, setflats_on_floors] = useControl()
    const [starting_flat_number, starting_flat_numbercon, setstarting_flat_number] = useControl()

    const [createSection, {error, isSuccess, isLoading}] = useMutate({
        path: 'section',
        body: {number, floors, flats_on_floor, starting_flat_number, house_id: houseId}
    })

    useEffect(() => {
        if(isSuccess) navigate(`/houseEdit/${projectId}/${houseId}`)
    }, [isSuccess])

    return <>
        <main class="container-md py-4">
            <div class="pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Мои объекты</Link></li>
                        <li class="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                        <li class="breadcrumb-item"><Link to={`/houseEdit/${projectId}/${houseId}`}>{house.data?.name}</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Создание подъезда</li>
                    </ol>
                </nav>
                <h1>Создание подъезда</h1>
            </div>
            {!!error && <MapErrors errors={orderErrors(error.errors)} />}
            <form class="bd-example border p-4" onSubmit={e => {
                e.preventDefault()
                createSection()
            }}>
                <div class="mb-3">
                    <label for="number" class="form-label">Номер подъезда</label>
                    <input type="number" class="form-control" id="number" {...numbercon} />
                </div>
                <div class="mb-3">
                    <label for="floors" class="form-label">Количество этажей</label>
                    <input type="number" class="form-control" id="floors" {...floorscon} />
                </div>
                <div class="mb-3">
                    <label for="lats_on_floor" class="form-label">Количество квартир на этаже</label>
                    <input type="number" class="form-control" id="lats_on_floor" {...flats_on_floorscon} />
                </div>
                <div class="mb-3">
                    <label for="starting_flat_number" class="form-label">Номер первой квартиры</label>
                    <input type="number" class="form-control" id="starting_flat_number" {...starting_flat_numbercon} />
                </div>
                <button disabled={isLoading} type="submit" class="btn btn-success">Создать</button>
            </form>

        </main>
    </>
}