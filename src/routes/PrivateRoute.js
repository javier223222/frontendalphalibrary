import { Navigate, Outlet} from "react-router-dom"


export const PrivateRoute = () => {
    
  let isLogged=localStorage.getItem("acessToken")
   return !isLogged?<Navigate to={"/iniciarSesion"}></Navigate>:<Outlet></Outlet>

}
