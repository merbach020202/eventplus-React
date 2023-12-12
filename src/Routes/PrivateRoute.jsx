import { Navigate } from "react-router-dom"

export const PrivateRoute = ( { children, redirectTo = "/" } ) => {
    // Verificar se está autenticando 
    const isAuthenticated = localStorage.getItem("token") !== null
    
    // retornar o componente ou navegar para a home(aqui em baixo é um If ternário diznedo que caso esteja 
    //autenticado vai direcionar a children, senão, vai parar no redirectTo)
    return isAuthenticated ? children : <Navigate to={redirectTo}/>
}

