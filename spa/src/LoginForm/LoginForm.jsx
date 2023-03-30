import { useState } from "react";
import useControl from "../hooks/useControl";
import MapErrors from "../MapErrors/MapErrors";
import { useAuth } from "../Providers/AuthContext/AuthContext";
import { base_headers, BASE_URL, orderErrors } from "../services/services";

const LoginForm = () => {
    const [login, controlLogin] = useControl()
    const [password, controlPassword] = useControl()
    const {setAuth} = useAuth()
    const [errors, setErrors] = useState('')

    const submitLogin = async () => {
        const response = await fetch(`${BASE_URL}/login?login=${login}&password=${password}`, {
                                    method: 'POST',
                                    headers: base_headers,
                                })
        
        const result  = await response.json()


        switch (response.status) {
            case 200:
                localStorage.setItem('token', result.data.token)
                setAuth(true)
                break;
            case 401:
                const errors = orderErrors(result.error.errors)
                setErrors(errors)
                break;
            default:
                break;
        }

        
    }


    return (
        <>
            {!!errors && <MapErrors errors={errors} extraClass={'w-50'} />}
            <div className="container-sm border w-50 p-3">
                <form className="bd-example" onSubmit={e => {
                    e.preventDefault()
                    submitLogin()
                }}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...controlLogin} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" {...controlPassword} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!login || !password}>Войти</button>
                </form>
            </div>
        </>
    );
}

export default LoginForm;