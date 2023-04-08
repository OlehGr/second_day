import { useContext, createContext, useState, useEffect } from "react"
import { LoginForm } from "./LoginForm/LoginForm"


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
                </> : <LoginForm />
            }
        </AuthContext.Provider>
    </>
}

