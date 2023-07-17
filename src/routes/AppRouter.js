import { Routes,Route } from "react-router-dom"
import Homepage from "../pages/Homepage"
import Login from "../pages/Login"
import { PrivateRoute } from "./PrivateRoute"
import Libros from "../pages/Libros"
import AgregarLibro from "../pages/AgregraLibro"
import PrivateRouteLogin from "./PrivateRouteLogin"
import Prestamos from "../pages/Prestamos"
import Extraviados from "../pages/Extraviados"
import AgregarPrestamo from "../pages/AgregarPrestamo"
import AgregarExtraviado from "../pages/AgregarExtraviado"


const AppRouter=()=> {
  return (
   
     
      <Routes>
        <Route  element={<PrivateRouteLogin></PrivateRouteLogin>} >
          <Route index Component={Homepage}></Route>
         <Route path="/iniciarSesion" Component={Login}/>
         
         </Route>
       
     
       
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path= "/libros" Component={Libros}></Route>
          <Route path="/agregarLibros" Component={AgregarLibro}></Route>
          <Route path="/prestamos" Component={Prestamos}></Route>
          <Route path="/extraviados" Component={Extraviados}></Route>
          <Route path="/agregarprestamos/:components" Component={AgregarPrestamo}></Route>
          <Route path="/agregarExtraviado" Component={AgregarExtraviado}></Route>
        </Route>

        

    </Routes>
  )
}

export default AppRouter