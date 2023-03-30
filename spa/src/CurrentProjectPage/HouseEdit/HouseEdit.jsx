import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";
import { useFetch } from "../../hooks/useFetch";
import { useMutate } from "../../hooks/useMutate";
import MapErrors from "../../MapErrors/MapErrors";
import { orderErrors } from "../../services/services";

const HouseEdit = () => {
    const {houseId, projectId} = useParams()

    const project = useFetch(`/project/${projectId}`)
    const house = useFetch(`/house/${houseId}`)

    const [name, nameControl, setName] = useControl()
    const [address, addressControl, setAddress] = useControl()
    const [built_year, built_yearControl, setBuilt_year] = useControl()
    const [built_quarter, built_quarterControl, setBuilt_quarter] = useControl()


    useEffect(() => {
        if(!house.data) return

        setName(house.data.name)
        setAddress(house.data.address)
        setBuilt_year(house.data.built_year)
        setBuilt_quarter(house.data.built_quarter)
    }, [house.data])


    const [editHouse, {isLoading, error}] = useMutate({
        path: `/house/${houseId}`,
        method: 'PATCH',
        body: {
            name, address, built_year, built_quarter
        },
        onEnd: house.invalidate
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-md">
                    <Link className="navbar-brand" href="/">Шахматки</Link>
                </div>
            </nav>
            <main className="container-md py-4">
                <div className="pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/`}>Мои объекты</Link></li>
                            <li className="breadcrumb-item"><Link to={`/projectEdit/${projectId}`}>{project.data?.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Редактирование – {house.data?.name}</li>
                        </ol>
                    </nav>
                    <h1>Редактирование – {house.data?.name}</h1>
                </div>
                {!!error && <MapErrors errors={orderErrors(error.errors)}/>}
                <form className="bd-example border p-4 mb-4" onSubmit={e => {
                    e.preventDefault()
                    editHouse()
                }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название</label>
                        <input type="text" className="form-control" id="name" {...nameControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Адрес</label>
                        <input type="text" className="form-control" id="address" {...addressControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="built_year" className="form-label">Год сдачи</label>
                        <input type="number" className="form-control" id="built_year" {...built_yearControl} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="built_quarter" className="form-label">Квартал сдачи</label>
                        <input type="number" className="form-control" id="built_quarter" {...built_quarterControl} />
                    </div>
                    <button disabled={isLoading || !name || !address || !built_year || !built_quarter} type="submit" className="btn btn-success">Изменить</button>
                </form>
                <div className="bd-example border p-4 mb-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="mb-3">Подъезды</h3>
                        </div>
                        <div>
                            <Link to={`/houseEdit/${projectId}/${houseId}/sectionCreate`} className="btn btn-primary">
                                Создать подъезд
                            </Link>
                        </div>
                    </div>
                    
                    <div className="row row-cols-3 g-3">
                        {
                            house.data?.sections.map((section, index) => (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Подъезд №{section.number}</h5>
                                            <Link to={`/sectionEdit/${projectId}/${houseId}/${section.id}`} className="btn btn-primary btn-sm">
                                                <i className="bi bi-pencil-square"></i> Редактировать
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </main>
        </>
    );
}

export default HouseEdit;