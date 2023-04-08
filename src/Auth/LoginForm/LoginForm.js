import { useContext, useState } from "react"
import { useControl } from "../../hooks/useControl"
import { AuthContext } from "../AuthProvider"
import { BASE_URL, base_headers, orderErrors } from "../../services"
import { MapErrors } from "../../MapErrors"


export const LoginForm = () => {
    const {setAuth} = useContext(AuthContext)
    const [login, logincon, setLogin] = useControl()
    const [password, passcon, setPAss] = useControl()
    const [errors , setErrors] = useState()


    const submit = async e => {
        e.preventDefault()

        const response = await fetch(`${BASE_URL}/login?login=${login}&password=${password}`, {
            method: 'POST',
            headers: base_headers
        })

        const result = await response.json()

        if(response.status === 200) {
            localStorage.setItem('token', result.data.token)
            setAuth(true)
            setErrors(null)

        } else {
            setErrors(orderErrors(result.error.errors))
        }
    }


    return <>
        <div className="container-sm border w-50 p-3">
            {!!errors && <MapErrors errors={errors} />}
            <form className="bd-example" onSubmit={submit}>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...logincon} />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <input type="password" className="form-control" id="exampleInputPassword1" {...passcon} />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    </>
}