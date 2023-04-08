import { useNavigate, useParams } from "react-router-dom"
import { useControl, useMutate } from "./hooks"
import { ToHouse, ToProject } from "./Bread"
import { MapErrors } from "./MapErros"
import { useEffect } from "react"

export const NewSection = () => {
    const [number, numbermode, setnumber] = useControl()
    const [floors, floorsmode, setfloors] = useControl()
    const [flats_on_floor, flats_on_floormode, setflats_on_floor] = useControl()
    const [starting_flat_number, starting_flat_numbermode, setstarting_flat_number] = useControl()

    const {houseId, projectId} = useParams()

    const {mutate, isLoading, isSuccess, error} = useMutate({
        path: 'section',
        body: {number, floors, flats_on_floor, starting_flat_number, house_id: houseId}
    })


    const n  = useNavigate()

    useEffect(() => {
        if(isSuccess) n(`/houseEdit/${projectId}/${houseId}`)
    }, [isSuccess]) 

    return <>
    <main class="container-md py-4">

        <div class="pb-4">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/l">Мои объекты</a></li>
                    <li class="breadcrumb-item"><ToProject /></li>
                    <li class="breadcrumb-item"><ToHouse /></li>
                    <li class="breadcrumb-item active" aria-current="page">Создание подъезда</li>
                </ol>
            </nav>
            <h1>Создание подъезда</h1>
        </div>
        {!!error && <MapErrors errors={error.errors} />}
        
        <form class="bd-example border p-4" onSubmit={e => {
            e.preventDefault()
            mutate()
        }}>
            <div class="mb-3">
                <label for="number" class="form-label">Номер подъезда</label>
                <input type="number" class="form-control" id="number" {...numbermode} />
            </div>
            <div class="mb-3">
                <label for="floors" class="form-label">Количество этажей</label>
                <input type="number" class="form-control" id="floors" {...floorsmode} />
            </div>
            <div class="mb-3">
                <label for="lats_on_floor" class="form-label">Количество квартир на этаже</label>
                <input type="number" class="form-control" id="lats_on_floor" {...flats_on_floormode} />
            </div>
            <div class="mb-3">
                <label for="starting_flat_number" class="form-label">Номер первой квартиры</label>
                <input type="number" class="form-control" id="starting_flat_number" {...starting_flat_numbermode} />
            </div>
            <button disabled={isLoading} type="submit" class="btn btn-success">Создать</button>
        </form>
        </main>
    </>
}