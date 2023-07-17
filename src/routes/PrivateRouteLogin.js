import { Navigate, Outlet} from "react-router-dom"
const PrivateRouteLogin=()=>{
    let isLogged=localStorage.getItem("acessToken")
    return isLogged?<Navigate to={"/libros"}></Navigate>:<Outlet></Outlet>
}
export default PrivateRouteLogin