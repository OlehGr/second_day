import { createContext, useContext, useEffect, useState } from "react";
import LoginForm from "../../LoginForm/LoginForm";

const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false)


    useEffect(() => {
        setAuth(!!localStorage.getItem('token'))
    }, [localStorage.getItem('token')])

    return (
        <>
        <AuthContext.Provider value={{isAuth, setAuth}}>
            {children}
        </AuthContext.Provider>
        </>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}


export const AuthMixin = ({children}) => {
    const {isAuth} = useAuth()
    return (
        <>
            {
                isAuth ? <>
                    {children}
                </> : <>
                    <LoginForm />
                </>
            }
        </>
    )
}

export default AuthProvider;