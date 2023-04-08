import { createContext, useContext, useEffect, useState } from "react"
import { BASE_URL, base_headers, useControl } from "../hooks"
import { MapErrors } from "../MapErros"

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        setAuth(!!localStorage.getItem('token'))
    }, [])

    return <>
        <AuthContext.Provider value={{isAuth, setAuth}}>
            {
                isAuth ? <>
                    {children}
                </> : <>
                    <LoginForm />
                </>
            }
        </AuthContext.Provider>
        
    </>
}


const LoginForm = () => {
    const {setAuth} = useContext(AuthContext)
    const [login, lmodel] = useControl()
    const [password, pmodel] = useControl()
    const [err, setErr] = useState()

    const submit = async e => {
        e.preventDefault()

        const res = await fetch(BASE_URL+`login?login=${login}&password=${password}`, {
            headers: base_headers,
            method: 'POST'
        })

        const result = await res.json()

        if(res.status === 200) {
            localStorage.setItem('token', result.data.token)
            setAuth(true)
        } else {
            setErr(result.error)
            setAuth(false)
        }

    }


    return <>
        
        <div className="container-sm border w-50 p-3">
            {!!err && <MapErrors errors={err.errors} />}
            <form className="bd-example" onSubmit={submit}>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...lmodel} />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <input type="password" className="form-control" id="exampleInputPassword1" {...pmodel} />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    </>
}



